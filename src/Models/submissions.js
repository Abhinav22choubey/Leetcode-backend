const mongoose = require("mongoose");
const { Schema } = mongoose;

const submissionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    problemId: {
      type: Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      enum: ["javascript", "c++", "java", "python", "typescript"],
    },
    status: {
      type: String,
      enum: [
        "pending",
        "Accepted",
        "Wrong Answer",
        "Compilation Error",
        "Runtime Error",
        "Time Limit Exceeded",
      ],
      default: "pending",
    },
    runtime: {
      type: Number, //milliSecond
      default: 0,
    },
    memory: {
      type: Number, //mb
      default: 0,
    },
    errorMessage: {
      type: String,
      default: "",
    },
    testCasePassed: {
      type: Number,
      default: 0,
    },
    testCasesTotal: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
const Submission = mongoose.model("submission", submissionSchema);
module.exports = Submission;
