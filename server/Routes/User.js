const express = require ("express");
const usercontroller = require ("../Controllers/User.Controller");
const router = express.Router();
router.post("/register",usercontroller.Register);
router.post("/login",usercontroller.Login);
module.exports=router;