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
    about:{
      type:String,
      default:""
    },
    socialLink:{
      type:String,
      default:""
    },
    toolsMostUsed:{
      type:Array,
      default: [],
    },
    projects: {
      created: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref:"Project"

      },
      collaborated: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref:"Project"
      },
    },
    ideas: {
      created:{
        type: [mongoose.Schema.Types.ObjectId],
        default: [],

        ref:"Idea"
      },
      collaborated:{
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref:"Idea"
      },
    },
    requests:{
      type:[mongoose.Schema.Types.ObjectId],
      ref:"User",
      default:[],
    }
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
