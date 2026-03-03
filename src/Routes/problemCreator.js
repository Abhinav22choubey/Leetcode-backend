const express= require("express");
const adminMiddleware=require('../middleware/adminMiddleware')
const {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem}=require("./../controllers/userProblems")
const problemRouter=express.Router();
const userMiddleware=require("../middleware/userMiddleware")

// Problem Create
problemRouter.post("/create",adminMiddleware,createProblem);
//update
problemRouter.put("/update/:id",adminMiddleware,updateProblem);
// delete
problemRouter.delete("/delete/:id",adminMiddleware,deleteProblem);
// view
problemRouter.get("/problemById/:id",userMiddleware,getProblemById);
// all view
problemRouter.get("/getAllProblem",userMiddleware,getAllProblem);
// // solved problem
// problemRouter.get("/problemSolvedByUser",userMiddleware,solvedAllProblemByUser);

module.exports=problemRouter;