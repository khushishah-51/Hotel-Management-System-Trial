const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const methodOverride = require('method-override');

// method override middleware
router.use(methodOverride('_method'));

router.post('/userfeed', userController.allReview);

module.exports = router;