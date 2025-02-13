const User= require('../models/User');


const createUser=async(req,res)=>{
    try{
        const {name,id,department,phone,address,institute,profileImage}=req.body;
        const existingUser=await User.findOne({id});
        if(existingUser)
        {
            return res.status(400).json({message:"User already exists"});
        }

        const newUser=new User({
            name,
            id,
            department,
            phone,
            address,
            institute,
            profileImage,
        });

        await newUser.save();

        res.status(201).json({message:"User Created Succesfully",user:newUser});
    }catch(error){
        console.log("error creating user",error);
        res.status(500).json({message:"server error",error:error.message});
    }

};



const getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
//   // @desc    Get a single user by ID
//   // @route   GET /api/users/:id
//   // @access  Public
//   const getUserById = async (req, res) => {
//     try {
//       const user = await User.findOne({ id: req.params.id });
  
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       res.status(200).json(user);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
//   };
  
//   // @desc    Update user data
//   // @route   PUT /api/users/:id
//   // @access  Public
//   const updateUser = async (req, res) => {
//     try {
//       const { name, department, phone, address, institute, profileImage } = req.body;
  
//       const user = await User.findOneAndUpdate(
//         { id: req.params.id },
//         { name, department, phone, address, institute, profileImage },
//         { new: true }
//       );
  
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       res.status(200).json({ message: "User updated successfully", user });
//     } catch (error) {
//       console.error("Error updating user:", error);
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
//   };
  
//   // @desc    Delete a user
//   // @route   DELETE /api/users/:id
//   // @access  Public
//   const deleteUser = async (req, res) => {
//     try {
//       const user = await User.findOneAndDelete({ id: req.params.id });
  
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
//   };
  
  module.exports = {createUser,getUsers}