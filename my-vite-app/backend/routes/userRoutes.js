const express=require("express");
const {getUsers,createUser}=require("../controllers/userController");


const router=express.Router();

router.post("/users",createUser);
router.get("/users", getUsers);

module.exports=router;