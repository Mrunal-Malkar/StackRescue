import mongoose from "mongoose";

const IdeaSchema = new mongoose.Schema({
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
  requiredSkills: {
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

const Idea = mongoose.models.Idea || mongoose.model("Idea", IdeaSchema);
export default Idea;
