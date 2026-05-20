const db = require('../utils/db');

exports.getMatches = async (req, res) => {
    const { item_id } = req.params;

    // 1. Get the lost item
    db.query('SELECT * FROM items WHERE id = ?', [item_id], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const lostItem = results[0];

        if (lostItem.item_type !== 'lost') {
            return res.status(400).json({ message: 'This item is not a lost item' });
        }

        // 2. Get all found items
        db.query("SELECT * FROM items WHERE item_type = 'found' AND status != 'resolved'", async (err2, foundItems) => {
            if (err2) {
                return res.status(500).json({ message: 'Database error' });
            }

            if (foundItems.length === 0) {
                return res.json({ matches: [], message: 'No found items available to match against.' });
            }

            // 3. Build prompt
            const foundItemsText = foundItems.map((item, i) =>
                `[${i + 1}] ID: ${item.id}, Name: ${item.item_name}, Category: ${item.category}, Description: ${item.description}`
            ).join('\n');

            const prompt = `You are a lost-and-found matching assistant for a college campus app called REFYND.

A student has reported a lost item:
- Name: ${lostItem.item_name}
- Category: ${lostItem.category}
- Description: ${lostItem.description}

Here are all currently reported found items:
${foundItemsText}

Your task: Find the top 3 best matches from the found items list. Respond ONLY with a valid JSON array, no extra text, no markdown, no backticks:
[
  {
    "item_id": <number>,
    "match_score": <number from 0 to 100>,
    "reason": "<one sentence explanation>"
  }
]

If there are no good matches, return an empty array: []`;

            try {
                // 4. Call Groq API
                const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
                    },
                    body: JSON.stringify({
                        model: 'llama3-8b-8192',
                        messages: [
                            {
                                role: 'system',
                                content: 'You are a helpful assistant that only responds in valid JSON arrays. Never include markdown or extra explanation.'
                            },
                            {
                                role: 'user',
                                content: prompt
                            }
                        ],
                        temperature: 0.2
                    })
                });

                const data = await response.json();
                const rawText = data.choices[0].message.content.trim();

                // 5. Parse the JSON response
                let matches = [];
                try {
                    matches = JSON.parse(rawText);
                } catch (e) {
                    const jsonMatch = rawText.match(/\[[\s\S]*\]/);
                    if (jsonMatch) matches = JSON.parse(jsonMatch[0]);
                }

                // 6. Attach full item details to each match
                const enrichedMatches = matches.map(match => {
                    const foundItem = foundItems.find(f => f.id === match.item_id);
                    return { ...match, item: foundItem || null };
                }).filter(m => m.item !== null);

                res.json({ lostItem, matches: enrichedMatches });

            } catch (error) {
                res.status(500).json({ message: 'AI matching failed: ' + error.message });
            }
        });
    });
};