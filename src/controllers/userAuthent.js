const validate = require('..utils/validate.js');
const User = require('../Models/user');
const bcrypt=require("bcrypt"); 
const jwt=require("jsonwebtoken")

const register= async (req,res)=>{
    try{
        // validating
        validate(req.body);
        const {firstName, emailId , password }=req.body;
        
        //Password Hashing 
         req.body.password=await bcrypt.hash(password,10); 
        
         // adding to database 
         const user= await User.create(req.body);

         //  JWT(json web Token)
         const token= jwt.sign({_id:user._id,email:emailId},process.env.JWT_KEY, {expiresIn:"1h"})
         res.cookie('token',token,{maxAge:60*60*1000});
         res.status(201).send("User Registered successfully");

    }catch(err){
        res.status(400).send("Error : "+err)
    }
}

const login= async (req,res)=>{
    try{
        const {emailId,password}=req.body;
        if(!emailId) throw new Error ("Enter your email address");
        if(!password) throw new Error ("Enter the password");
        
        // finding user
        const user = await User.findOne({emailId})

        // Checking if password is correct or not
        const isCorrect= await bcrypt.compare(password,user.password);
        if(!isCorrect) throw new Error ("Invalid credentials");

         //  JWT(json web Token)
         const token= jwt.sign({_id:user._id,email:emailId},process.env.JWT_KEY, {expiresIn:"1h"})
         res.cookie('token',token,{maxAge:60*60*1000});
         res.status(200).send("User Logged in successfully");
        
    }catch(err){
        req.status(401).send("Error :  "+err)
    }
}

const logout = async (req,res)=>{
    
}