const express = require('express');
const router = express.Router();
const guestController = require('../controller/guestController');
const isAdmin = require('../Middleware/isAdmin');
const methodOverride = require('method-override');

// method override middleware
router.use(methodOverride('_method'));

router.get('/admin/guest/add', isAdmin, guestController.addGuestForm);
router.post('/admin/guest/add', isAdmin, guestController.addGuest);
router.get('/admin/guest/update/:id', isAdmin, guestController.updateGuestForm);
router.put('/admin/guest/update/:id', isAdmin, guestController.updateGuest);
router.get('/admin/guest', isAdmin, guestController.listGuest);
router.get('/admin/guest/delete/:id', isAdmin, guestController.deleteGuestForm);
router.delete('/admin/guest/delete/:id', isAdmin, guestController.deleteGuest);

module.exports = router;
