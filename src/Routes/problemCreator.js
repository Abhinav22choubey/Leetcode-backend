const express= require("express");

const problemRouter=express.Router();

// Problem Create
problemRouter.post("/create",problemCreate);
// view
problemRouter.get("/:id",problemFetch);
// all view
problemRouter.get("/",problemFetchAll);
// update
problemRouter.patch("/:id",problemUpdate);
// delte
problemRouter.delete("/:id",problemDelete);
// solved problem
problemRouter.get("/user",solvedProblem);
