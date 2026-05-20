const express = require('express');
const router = express.Router();
const messageController = require('../controller/messageController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/messages/:itemId', verifyToken, messageController.sendMessage);
router.get('/messages/:itemId', verifyToken, messageController.getMessages);
router.get('/messages-page', messageController.showMessagesPage);
router.get('/my-messages', verifyToken, messageController.getMyConversations);

module.exports = router;