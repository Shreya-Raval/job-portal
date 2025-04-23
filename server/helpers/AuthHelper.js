const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const hashPassword = async(password) => {
    try {
        const hash = await bcrypt.hash(password,12);
        return hash;
    } catch(err) {
        console.log(`Hashing error ${err}`);
        throw err;
    }
}

const comparePassword = async(password,hashedPassword) => {
    try {
        const result = await bcrypt.compare(password,hashedPassword)
        return result;
    } catch(err){
        console.log(`Error occured while comparing password ${err}`);
        throw err;
    }
}

const generateToken = async(userId,role,userName) => {
    try {
        const token =  await jwt.sign({ userId,role,userName },process.env.JWT_SECRET_KEY,{
            expiresIn: '1d'
        });
        return token;
    } catch (err) {
        console.log(`Error occured while generating token ${err}`);
        throw err;
    }
}

module.exports = { hashPassword,comparePassword,generateToken }