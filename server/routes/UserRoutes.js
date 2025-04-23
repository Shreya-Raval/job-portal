const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, getUser, deleteUser,getAllUsers } = require("../controllers/UserController");
const {authentication, authorization} = require("../middleware/AuthMiddleware");

router.get('/profile',authentication,getProfile);
router.put('/update-profile', authentication, updateProfile);
router.get('/get-user', authentication, getUser);
router.get('/get-all-users',authentication,authorization(['admin']),getAllUsers);
router.delete('/delete/:id',authentication,authorization(['admin']),deleteUser);

module.exports = router;