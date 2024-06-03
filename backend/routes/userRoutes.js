const express = require ("express");
const router = express.Router()

const {userPost,register,login} = require("../controllers/userController");

router.post("/post",userPost);
router.post("/")
router.post("/register",register);
router.post("/login",login);

module.exports=router;