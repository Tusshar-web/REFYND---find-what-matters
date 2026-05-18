const express = require('express');
const router = express.Router();

const claimController = require('../controller/claimController');

const {verifyToken} = require('../middleware/authMiddleware');

router.post('/claim', verifyToken, claimController.submitClaim);
router.get('/claims', verifyToken, claimController.getAllClaims);
router.get('/my-claims-page', (req, res) => res.render('my-claims'));
router.get('/my-claims', verifyToken, claimController.getUserClaims);

module.exports = router;