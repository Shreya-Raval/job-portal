const express = require("express");
const router = express.Router();
const {getProfile, updateProfile} = require("../controllers/UserController");
const {authentication} = require("../middleware/AuthMiddleware");

router.get('/profile',authentication,getProfile);
router.put('/update-profile', authentication, updateProfile);

module.exports = router;