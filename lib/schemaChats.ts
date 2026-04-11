import mongoose from "mongoose";

const ChatSchema=new mongoose.Schema(
{    messages:[{
        sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        message:{type:String,required:false},
        imageUrl:{type:String,required:false},
    }]
})