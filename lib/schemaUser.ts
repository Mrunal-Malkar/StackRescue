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
    toolsMostUsed:{
      type:Array,
    },
    numbers:{
      Collaborated:Number,
      Posted:Number,
    }
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
