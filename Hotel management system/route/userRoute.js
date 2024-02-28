const express = require('express');
const router = express.Router();
const guestController = require('../controller/guestController');

router.post('/userfeed', allReview);

module.exports = router;