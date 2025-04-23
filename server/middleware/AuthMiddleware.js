const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authentication = (req,res,next) => {
    try{
        const token = req.cookies.portal_info;
        if(!token){
            return res.status(400).json({ message: "Unauthenticated request" });
        }
        req.user = jwt.verify(token,process.env.JWT_SECRET_KEY);
        next();

    } catch (err){
        res.status(500).json({message: `Unauthenticated request ${err}`})
    }
}


const authorization = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

module.exports = {authorization,authentication};