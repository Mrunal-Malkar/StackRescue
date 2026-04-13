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

    about: {
      type: String,
      default: "",
    },

    socialLink: {
      type: String,
      default: "",
    },

    toolsMostUsed: {
      type: [String],
      default: [],
    },

    projects: {
      created: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
        },
      ],
    },

    // this is the primary collaborated key, which is to be used for both , projects and idea.
    collaborated: [
      {
        requestedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        stackId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "stackType",
        },
        stackType: {
          type: String,
          enum: ["Project", "Idea"],
        },
      },
    ],

    ideas: {
      created: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Idea",
        },
      ]
    },

    requests: [
      {
        requestedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        to: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        stackId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "stackType", 
          required: true,
        },

        stackType: {
          type: String,
          enum: ["Project", "Idea"],
          required: true,
        },

        status: {
          type: String,
          enum: ["pending", "rejected", "accepted"],
          default: "pending",
        },
      },
    ],
    chats:[{
      receiver:{type:[mongoose.Schema.Types.ObjectId],ref:"User"},
      receiverName:String,
      receiverProfileImage:String,
      chatId:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Chat",
      }
      }
    ]
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;