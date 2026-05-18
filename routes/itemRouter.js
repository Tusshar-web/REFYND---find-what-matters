const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController');
const { upload } = require('../middleware/uploadMiddleware');
const { verifyToken } = require('../middleware/authMiddleware');

// View Pages
router.get('/add-item', (req, res) => res.render('add-item'));
router.get('/items-page', (req, res) => res.render('items'));
router.get('/item-page/:id', (req, res) => res.render('item-detail', { itemId: req.params.id }));

// API Endpoints
// add item
router.post('/add-item', verifyToken,upload.single('image'), itemController.addItem);

// get all items
router.get('/items', itemController.getAllItems);

//get single items
router.get('/items/:id', itemController.getItem);

//search item 
router.get('/search', itemController.searchItem);


module.exports = router;