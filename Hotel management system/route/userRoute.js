const express = require('express');
const router = express.Router();
const guestController = require('../controller/guestController');
const methodOverride = require('method-override');

// method override middleware
router.use(methodOverride('_method'));

router.post('/userfeed', allReview);

module.exports = router;