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
        
        const token = await generateToken(user._id,user.role);
        
        res.cookie("token", token, {
            httpOnly: true
        });

        return res.status(200).json({message: "User registered successfully"});

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
       //console.log(typeof(password));
       //console.log(typeof(user.password));return false;
        const checkPassword = await comparePassword(password,user.password);
        if(!checkPassword){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const token = await generateToken(user._id,user.role);
        res.cookie("token",token,{
            httpOnly: true
        });

        return res.status(200).json({message: "User Logged In successfully"});

    } catch(err){
        return res.status(500).json({message: `Error occured while login ${err}`});
    }
}

exports.logout = (req,res) => {
    res.clearCookie('token').status(200).json({message: 'User Logged out successfully'});
}