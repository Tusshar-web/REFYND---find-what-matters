const express = require('express');
const router = express.Router();
const { getMatches } = require('../controller/matchController');
const { verifyToken } = require('../middleware/authMiddleware');

// GET /match/:item_id  — get AI matches for a lost item
router.get('/:item_id', verifyToken, getMatches);

module.exports = router;