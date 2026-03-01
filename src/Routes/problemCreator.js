const express= require("express");
const adminMiddleware=require('../middleware/adminMiddleware')

const problemRouter=express.Router();

// Problem Create
problemRouter.post("/create",adminMiddleware,createProblem);
// update
problemRouter.patch("/:id",adminMiddleware,updateProblem);
// delte
problemRouter.delete("/:id",adminMiddleware,deleteProblem);
// view
problemRouter.get("/:id",getProblemById);
// all view
problemRouter.get("/",getAllProblem);
// solved problem
problemRouter.get("/user",solvedAllProblemByUser);
