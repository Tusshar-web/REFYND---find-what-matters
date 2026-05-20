const messageModel = require('../models/message');

const getConversations = (req, res) => {
    const role = req.user.role;
    const userId = req.user.id;

    if (role === 'admin') {
        messageModel.getAdminConversations((err, results) => {
            if (err) return res.status(500).json({ message: err.message });
            res.json({ conversations: results });
        });
    } else {
        messageModel.getConversationsByUser(userId, (err, results) => {
            if (err) return res.status(500).json({ message: err.message });
            res.json({ conversations: results });
        });
    }
};

const getMessages = (req, res) => {
    const itemId = req.params.itemId;
    
    messageModel.getMessagesByItem(itemId, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ messages: results });
    });
};

const sendMessage = (req, res) => {
    const itemId = req.params.itemId;
    const { message_text } = req.body;
    
    if (!message_text || message_text.trim() === '') {
        return res.status(400).json({ message: 'Message text is required' });
    }

    const messageData = {
        user_id: req.user.id,
        item_id: itemId,
        message_text: message_text,
        sender_role: req.user.role
    };

    messageModel.createMessage(messageData, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Message sent successfully' });
    });
};

const showMessagesPage = (req, res) => {
    res.render('messagesPage');
}

module.exports = {
    getConversations,
    getMessages,
    sendMessage,
    showMessagesPage
}