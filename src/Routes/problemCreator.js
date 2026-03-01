const express= require("express");
const adminMiddleware=require('../middleware/adminMiddleware')
const {createProblem,updateProblem,deleteProblem}=require("./../controllers/userProblems")
const problemRouter=express.Router();

// Problem Create
problemRouter.post("/create",adminMiddleware,createProblem);
//update
problemRouter.put("/update/:id",adminMiddleware,updateProblem);
// delete
problemRouter.delete("/delete/:id",adminMiddleware,deleteProblem);
// view
problemRouter.get("/problemById/:id",getProblemById);
// all view
problemRouter.get("/getAllProblem",getAllProblem);
// solved problem
problemRouter.get("/problemSolvedByUser",solvedAllProblemByUser);

module.exports=problemRouter;