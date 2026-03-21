const express=require('express');
const adminMiddleware=require("../middleware/adminMiddleware");
const videoRouter=express.Router();
const {generateUploadSignature,saveVideoMetadata,deleteVideo,getVideo}=require("../controllers/videoUploader.js");

videoRouter.get("/create/:problemId",adminMiddleware,generateUploadSignature);
videoRouter.get("/getVideo/:problemId",adminMiddleware,getVideo)
videoRouter.post("/save",adminMiddleware,saveVideoMetadata);
videoRouter.get("/delete/:problemId",adminMiddleware,deleteVideo);

module.exports=videoRouter;