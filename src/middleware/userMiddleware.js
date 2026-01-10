const jwt= require("jsonwebtoken");
const User = require('../Models/user');
const {redisClient}=require('../config/redis.js')
// to validate the token
const userMiddleware = async (req, res,next)=>{
    
    try{
        const {token} =req.cookies;
        if(!token) throw new Error ("Token is not present ");

        // Redis blocklist
        const IsBlocked = await redisClient.exists(`token:${token}`);
        if(IsBlocked) throw new Error ("Token invalid ");

        const payload=jwt.verify(token,process.env.JWT_KEY);
        const {_id}=payload;
        if(!_id) throw new Error ("Invalid token"); 
        
        const user= await User.findById(_id);
        if(!user) throw new Error ("User doesn't exist");

        req.user=user;
        next();
    } catch(err){
        res.send("Error : " +err.message);
    }
    
}
module.exports=userMiddleware;