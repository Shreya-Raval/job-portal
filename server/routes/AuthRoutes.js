const {register,login,logout} = require("../controllers/AuthController");
const express = require("express");

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);

module.exports = router;