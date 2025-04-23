const User = require("../models/UserModel");

const getProfile = async(req,res) => {
    try {
        const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        const resData = {
            firstName: user.firstName,
            lastName: user.lastName,
        }
        res.status(200).json({data: resData});
    } catch (err) {
        res.status(500).json({message: `Error occurred while fetching user ${err}`});
    }
}

const getAllUsers = async(req,res) => {
    try{
        const users = await User.find( { role: {$ne:  'admin' } } ).select('-password');
        res.status(200).json({message: 'User details fetched successfully', users})
    } catch (err) {
        res.status(500).json({message: `Error occurred while fetching users ${err}`});
    }
}

const getUser =  (req, res) => {
    res.json( { data : {
        id: req.user.userId,
        name: req.user.userName,
        role: req.user.role,
    }
    });
};

const updateProfile = async(req,res) => {
    try{
        const { firstName, lastName } = req.body;

        const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        await user.save();

        res.status(200).json({message: "Profile Updated Successfully", user: { 
            userId: user._id,
            role: user.role,
            userName: `${user.firstName} ${user.lastName}`
          }});

    } catch (err){
        res.status(500).json({message: `Error occured while updating profile ${err}`});
    }
}

const deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      await User.findByIdAndDelete(userId);
      res.status(200).json({  message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({  message: 'Failed to delete user' });
    }
  };
  

module.exports = {getProfile,updateProfile,getUser,getAllUsers,deleteUser}