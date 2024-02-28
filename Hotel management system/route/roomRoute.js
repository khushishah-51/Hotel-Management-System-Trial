const express = require('express');
const router = express.Router();
const roomController = require('../controller/roomController');
const isAdmin = require('../Middleware/isAdmin');
const methodOverride = require('method-override');

// method override middleware
router.use(methodOverride('_method'));

router.get('/admin/room/add', isAdmin, roomController.addRoomForm);
router.post('/admin/room/add', isAdmin, roomController.addRoom);
router.get('/admin/room/update/:id', isAdmin, roomController.updateRoomForm);
router.put('/admin/room/update/:id', isAdmin, roomController.updateRoom);
router.get('/admin/room', isAdmin, roomController.listRoom);
router.get('/admin/room/delete/:id', isAdmin, roomController.deleteRoomForm);
router.delete('/admin/room/delete/:id', isAdmin, roomController.deleteRoom);

module.exports = router;