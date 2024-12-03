const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Admin routes
router.post('/admin/register', adminController.registerAdmin);
router.post('/admin/login', adminController.loginAdmin);

// Manager routes (with admin token validation)
router.use(authMiddleware);

router.post('/manager', userController.createManager);
router.get('/manager', userController.getManagers);
router.delete('/manager/:id', userController.deleteManager);
router.put('/manager/:id', userController.updateManager);
router.get('/manager/search', userController.searchManager);

module.exports = router;
