const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 15,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      immutable: true,
    },
    age: {
      type: Number,
      min: 5,
      max: 70,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    problemSolved: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Problem",
        },
      ],
      unique:true
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  {
    timestamps: true,
  },
);
// find by id and delete internal impletation is like findOneAndDelete
userSchema.post("findOneAndDelete",async function(doc){
  if(doc){
    await mongoose.model('submission').deleteMany({userId:doc._id});
  }
})
const User = mongoose.model("user", userSchema);
module.exports = User;
