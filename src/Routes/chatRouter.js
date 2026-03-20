const express=require("express");
const chatRouter=express.Router();
const userMiddleware=require("../middleware/userMiddleware");
const main=require("../utils/aiChatting")
let Allchat={};

chatRouter.post("/Ai",userMiddleware,async(req,res)=>{
    try {
    const { _id, msg,problemData,code } = req.body;
    if (!_id || !msg) {
      return res.status(400).send("Missing _id or msg");
    }
    // Initialize user history
    if (!Allchat[_id]) {
      Allchat[_id] = [];
    }
    const history = Allchat[_id];
    const messages = [
      ...history,
      {
        role: "user",
        content:
          msg +
          " Try to give response in less than 6 lines. For detailed problems, give proper explanation but don't mention anything about line limits.",
      },
    ];

    const answer = await main({messages,problemData,code});

    // Save updated chat
    Allchat[_id] = [
      ...history,
      {
        role: "user",
        content: msg,
      },
      {
        role: "assistant",
        content: answer,
      },
    ];

    res.send(answer);
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).send(err.message || "Something went wrong");
  }
})
module.exports=chatRouter;