import mongoose from "mongoose";

export default async function connectDB() {
  try {
    if (mongoose.connection.readyState===1){
      return {status:200,connected:true};
    } 
    const connect = await mongoose.connect(
      `mongodb+srv://mrunalpmalkar_db_user:${process.env.MONGODB_PASSWORD}@cluster0.1dlvqul.mongodb.net/${process.env.CLUSTER_NAME}`,
    );
    connect.connection.on("connected", () => {
      return { status: 200, connected: true };
    });
  } catch (e) {
    console.log("the error",e) 
       return {
      message: "some error occured while trying to connect with mongoDB",
      status: 500,
      connected: false,
    };
  }
}
