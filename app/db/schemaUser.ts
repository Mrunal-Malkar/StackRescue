import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,

  stacks: {
    created: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    collaborated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },

  ideas: {
    created: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Idea",
      },
    ],
    collaborated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Idea",
      },
    ],
  },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);