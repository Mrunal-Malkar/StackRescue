import mongoose from "mongoose";

const ProjectStackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
    default: [],
  },
  roles: {
    type: [String],
    required: true,
    default: [],
  },
  buildProgress: {
    uiux: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    backend: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  projectType: {
    type: String,
    required: true,
  },
  reasonForLeavingProject: {
    type: String,
    required: true,
  },
  requiredSkills: {
    type: [String],
    default: [],
  },
  toolsUsed: {
    type: [String],
    default: [],
  },
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

const Project = mongoose.models.Project || mongoose.model("Project", ProjectStackSchema);
export default Project;
