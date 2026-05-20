const messageModel = require('../models/message');

const sendMessage = (req,res) => {
    const user_id = req.user.id;
    const item_id = req.param.itemId;
    const {
        message_text
    } = req.body;

    const messageData = {
        user_id,
        item_id,
        message_text,
        sender_role : req.user.role
    }

    messageModel.createMessage(
        messageData,
        (err,result)=> {
            if(err) {
                return res.status(500).json({
                    message : "Database Error"
                })
            }
            res.json({
                message : "Message sent successfully",
                message : result
            })
        }
    )
}

const getMessages = (req,res) => {
    const item_id = req.params.itemId;

    messageModel.getMessgaesByItem(
        item_id,
        (err,result)=> {
            if(err) {
                return res.status(500).json({
                    message : "Database Error"
                })
            }
            res.json({
                messages : result
            })
        }
    )
}

const showMessagesPage = (req, res) => {
    res.render('messagesPage');
}

const getMyConversations = (req, res) => {
    const userId = req.user.id;
    const query = `
        SELECT DISTINCT m.item_id, i.item_name,
            (SELECT message_text FROM messages 
             WHERE item_id = m.item_id 
             ORDER BY created_at DESC LIMIT 1) as last_message
        FROM messages m
        JOIN items i ON m.item_id = i.item_id
        WHERE m.sender_id = ?
    `;
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ conversations: results });
    });
};

module.exports = {
    sendMessage,
    getMessages,
    showMessagesPage,
    getMyConversations
}