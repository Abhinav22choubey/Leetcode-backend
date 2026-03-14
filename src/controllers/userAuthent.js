const validate = require("../utils/validate.js");
const User = require("../Models/user");
const Problem = require("../Models/problem.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { redisClient } = require("../config/redis.js");
const Submission = require("../Models/submissions.js");

const register = async (req, res) => {
  try {
    // validating
    validate(req.body);
    const { firstName, emailId, password } = req.body;

    //Password Hashing
    req.body.password = await bcrypt.hash(password, 10);
    req.body.role = "user";
    // adding to database
    const user = await User.create(req.body);
    //  JWT(json web Token)
    const token = jwt.sign(
      { _id: user._id, email: emailId, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "1h" },
    );
    const result = {
      userId: user._id,
      firstName: firstName,
      emailId: emailId,
      role:user.role
    };
    console.log(result);
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(201).json({
      data: result,
      message: "User registered Sucessfully",
    });
  } catch (err) {
    res.status(400).send("Error : " + err);
  }
};
const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId) throw new Error("Enter your email address");
    if (!password) throw new Error("Enter the password");

    // finding user
    const user = await User.findOne({ emailId });
    if (!user) throw new Error("User not found");

    // Checking if password is correct or not
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) throw new Error("Invalid credentials");

    //  JWT(json web Token)
    const token = jwt.sign(
      { _id: user._id, email: emailId, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "1h" },
    );
    const result = {
      userId: user._id,
      firstName: user.firstName,
      emailId: emailId,
      role:user.role
    };
    // console.log(result);
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(200).json({
      data: result,
      message: "User Logged in Sucessfully",
    });
  } catch (err) {
    res.status(401).send("Error :  " + err);
  }
};

const logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    const payload = jwt.decode(token);
    // set the value
    await redisClient.set(`token:${token}`, "blocked");
    await redisClient.expireAt(`token:${token}`, payload.exp);
    // clear the token
    console.log("userLogout succeessfully");
    res.clearCookie("token");
    res.status(200).send("Logout Successfully");
  } catch (err) {
    res.status(401).send("Error : " + err);
  }
};
const adminRegister = async (req, res) => {
  try {
    validate(req.body);
    const { firstName, emailId, password } = req.body;

    //Password Hashing
    req.body.password = await bcrypt.hash(password, 10);
    req.body.role = "admin";
    // adding to database
    const user = await User.create(req.body);
    //  JWT(json web Token)
    const token = jwt.sign(
      { _id: user._id, email: emailId },
      process.env.JWT_KEY,
      { expiresIn: "1h" },
    );
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(201).send("User Registered successfully");
  } catch (err) {
    res.status(400).send("Error : " + err);
  }
};

const deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndDelete(userId);
    // await Submission.deleteMany({userId});
    res.status(200).send("User Deleted Successfully");
  } catch (err) {
    res.status(500).send("Error" + err.message);
  }
};
const getAuth = (req, res) => {
  const {_id,firstName,emailId}= req.user;
  const result = {
    userId: _id,
    firstName: firstName,
    emailId: emailId,
    role:user.role
  };
  res.status(200).json({
    data:result,
    message:"User Authenticated"
  })
};
module.exports = {
  register,
  login,
  logout,
  adminRegister,
  deleteProfile,
  getAuth,
};
