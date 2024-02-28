const express = require('express');
const router = express.Router();
const registerController = require('../controller/registerController');
const methodOverride = require('method-override');

// method override middleware
router.use(methodOverride('_method'));

router.post("/signup", registerController.signupForm);
router.post("/", registerController.loginForm);
router.post("/admin", registerController.adminForm);

module.exports = router;