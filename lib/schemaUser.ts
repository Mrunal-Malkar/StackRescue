import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Guest",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },

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
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
