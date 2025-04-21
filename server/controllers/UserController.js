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
            email: user.email,
        }
        res.status(200).json({data: resData});
    } catch (err) {
        res.status(500).json({message: `Error occurred while fetching user ${err}`});
    }
}

const updateProfile = async(req,res) => {
    try{
        const { firstName, lastName, email } = req.body;

        const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;

        await user.save();
        res.status(200).json({message: "Profile Updated Successfully"});

    } catch (err){
        res.status(500).json({message: `Error occured while updating profile ${err}`});
    }
}

module.exports = {getProfile,updateProfile}