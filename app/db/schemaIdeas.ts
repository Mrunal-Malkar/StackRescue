import mongoose from "mongoose";

const IdeaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  image: String,
  category: String,

  requiredSkills: [String],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Idea", IdeaSchema);