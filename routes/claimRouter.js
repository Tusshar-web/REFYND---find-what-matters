const express = require('express');
const router = express.Router();

const claimController = require('../controller/claimController');

const {verifyToken} = require('../middleware/authMiddleware');

router.post('/claim', verifyToken, claimController.submitClaim);
router.get('/claims', verifyToken, claimController.getAllClaims);
router.get('/api/my-claims', verifyToken, claimController.getUserClaims);

module.exports = router;