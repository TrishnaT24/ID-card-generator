const express=require("express");
const {getUsers,createUser}=require("../controllers/userController");


const router=express.Router();

router.post("/users",createUser);
router.get("/users", getUsers);

module.exports=router;


// const express = require("express");
// const { getUsers, createUser } = require("../controllers/userController");
// const router = express.Router();

// // Define routes
// router.route("/users")
//   .get(getUsers)
//   .post(createUser);

// module.exports = router;