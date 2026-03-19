import mongoose from "mongoose";

export default async function connectDB(){
    try{
        const connect=await mongoose.connect(`mongodb+srv://mrunalpmalkar_db_user:${process.env.MONGODB_PASSWORD}@cluster0.1dlvqul.mongodb.net/`)
        connect.connection.on("connected",()=>{console.log("connected");return {status:200,connected:true}})
    }catch(e){
        console.log("yo");
        return {status:500,connected:false}
    }
}