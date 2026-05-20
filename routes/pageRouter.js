const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/report-lost', (req,res) => {
    res.render('report-lost');
})

router.get('/report-found', (req,res) => {
    res.render('report-found');
})

router.get('/my-claims', (req, res) =>
     res.render('my-claims')
);

router.get('/matches/:itemId', verifyToken, (req, res) => {
    res.render('matches', { itemId: req.params.itemId });
});

router.get('/my-items', (req,res)=> {
    res.render("my-items")
});



module.exports = router;