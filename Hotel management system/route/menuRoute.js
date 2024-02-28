const express = require('express');
const router = express.Router();
const menuController = require('../controller/menuController');
const isAdmin = require('../Middleware/isAdmin');

router.get('/admin/menu/add', isAdmin, menuController.addMenuForm);
router.post('/admin/menu/add', isAdmin, menuController.addMenu);
router.get('/admin/menu/update/:id', isAdmin, menuController.updateMenuForm);
router.put('/admin/menu/update/:id', isAdmin, menuController.updateMenu);
router.get('/admin/menu', isAdmin, menuController.listMenu);
router.get('/admin/menu/delete/:id', isAdmin, menuController.deleteMenuForm);
router.delete('/admin/menu/delete/:id', isAdmin, menuController.deleteMenu);

module.exports = router;