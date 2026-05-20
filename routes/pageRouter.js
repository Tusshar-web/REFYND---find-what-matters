const express = require('express');
const router = express.Router();

router.get('/report-lost', (req,res) => {
    res.render('report-lost');
})

router.get('/report-found', (req,res) => {
    res.render('report-found');
})

router.get('/my-claims', (req, res) =>
     res.render('my-claims')
);

router.get('/my-items', (req,res)=> {
    res.render("my-items")
});



module.exports = router;