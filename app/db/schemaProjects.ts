import mongoose from "mongoose";

const ProjectStackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  buildProgress: {
    frontend: {
      type: Number,
      default: 0,
    },
    backend: {
      type: Number,
      default: 0,
    },
  },

  type: String,

  requiredSkills: [String],
  toolsUsed: [String],

  reasonForLeaving: String,
  image: String,

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

module.exports = mongoose.model("Project", ProjectStackSchema);