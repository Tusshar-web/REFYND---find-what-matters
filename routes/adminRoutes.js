
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const adminController = require('../controller/adminController');

router.get(
    '/admin',
    adminController.showAdminPage
);

router.get(
    '/admin/stats',
    verifyToken,
    adminController.getDashboardStats
);

router.get(
    '/admin/items',
    verifyToken,
    adminController.getAllItemsAdmin
);

router.patch(
    '/admin/items/:id/status',
    verifyToken,
    adminController.updateItemStatusAdmin
);

router.get(
    '/admin/claims',
    verifyToken,
    adminController.getAllClaimsAdmin
);

router.patch(
    '/admin/claims/:id/status',
    verifyToken,
    adminController.updateClaimStatusAdmin
);

module.exports = router;