const db = require('../utils/db');

exports.showAdminPage = (req, res) => {
    res.render('admin');
};

exports.getDashboardStats = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'Access denied'
            });
        }

        const [users] = await db.promise().query(
            'SELECT COUNT(*) AS totalUsers FROM users'
        );

        const [items] = await db.promise().query(
            'SELECT COUNT(*) AS totalItems FROM items'
        );

        const [claims] = await db.promise().query(
            'SELECT COUNT(*) AS totalClaims FROM claims'
        );

        const [messages] = await db.promise().query(
            'SELECT COUNT(*) AS totalMessages FROM messages'
        );

        res.json({
            totalUsers: users[0].totalUsers,
            totalItems: items[0].totalItems,
            totalClaims: claims[0].totalClaims,
            totalMessages: messages[0].totalMessages
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getAllItemsAdmin = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
        
        const [items] = await db.promise().query(`
            SELECT i.*, u.full_name as reporter_name 
            FROM Items i 
            LEFT JOIN Users u ON i.user_id = u.user_id 
            ORDER BY i.item_id DESC
        `);
        res.json({ items });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateItemStatusAdmin = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
        
        const { status } = req.body;
        const itemId = req.params.id;
        
        await db.promise().query('UPDATE Items SET status = ? WHERE item_id = ?', [status, itemId]);
        res.json({ message: 'Status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllClaimsAdmin = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
        
        const [claims] = await db.promise().query(`
            SELECT c.*, i.item_name, u.full_name as claimant_name
            FROM Claims c
            LEFT JOIN Items i ON c.item_id = i.item_id
            LEFT JOIN Users u ON c.claimant_id = u.user_id
            ORDER BY c.claim_id DESC
        `);
        res.json({ claims });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateClaimStatusAdmin = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
        
        const { status } = req.body;
        const claimId = req.params.id;
        
        await db.promise().query('UPDATE Claims SET claim_status = ? WHERE claim_id = ?', [status, claimId]);
        res.json({ message: 'Status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
