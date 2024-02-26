const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.get('/admin', roomController.getAllRooms);
router.get('/admin/:id', roomController.getRoom);
router.post('/admin', roomController.createRoom);
router.put('/admin/:id', roomController.updateRoom);
router.delete('/admin/:id', roomController.deleteRoom);

module.exports = router;