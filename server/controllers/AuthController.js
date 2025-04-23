const { hashPassword,comparePassword,generateToken } = require("../helpers/AuthHelper");
const User = require("../models/UserModel");

exports.register = async(req,res) => {
    try{
        const { email, password, firstName, lastName, role } = req.body;

        if( !email || !password || !firstName || !lastName || !role ){
            return res.status(400).json({message: "Please fill out all fields"});
        }

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "Email already taken"});
        }

        const hashedPassword = await hashPassword(password);

        const user = new User({
            email,
            password : hashedPassword,
            firstName,
            lastName,
            role
        });

        await user.save();
        
        const userName = `${user.firstName} ${user.lastName}`;
        const token = await generateToken(user._id,user.role,userName);
        
        res.cookie("portal_info", token, {
            httpOnly: true
        });

        return res.status(200).json({message: "User registered successfully", user: { 
            userId: user._id,
            role: user.role,
            userName: `${user.firstName} ${user.lastName}`
          }});

    } catch(err){
        return res.status(500).json({message: `Error occured while registration ${err}`});
    }
}

exports.login = async(req,res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password ){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        
        const checkPassword = await comparePassword(password,user.password);
        if(!checkPassword){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        const userName = `${user.firstName} ${user.lastName}`;
        const token = await generateToken(user._id,user.role,userName); 
        res.cookie("portal_info",token,{
            httpOnly: true
        });

        return res.status(200).json({message: "User Logged In successfully",user: { 
            userId: user._id,
            role: user.role,
            userName: `${user.firstName} ${user.lastName}`
          }});

    } catch(err){
        return res.status(500).json({message: `Error occured while login ${err}`});
    }
}

exports.logout = (req,res) => {
    res.clearCookie('portal_info').status(200).json({message: 'User Logged out successfully'});
}