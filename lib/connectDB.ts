import mongoose from "mongoose";

export default async function connectDB() {
  try {
    console.log("this is the mongoDB passs", process.env.MONGODB_PASSWORD);
    const connect = await mongoose.connect(
      `mongodb+srv://mrunalpmalkar_db_user:${process.env.MONGODB_PASSWORD}@cluster0.1dlvqul.mongodb.net/`,
    );
    connect.connection.on("connected", () => {
      console.log("connected");
      return { status: 200, connected: true };
    });
  } catch (e) {
    console.log("some error occured while trying to connect with mongoDB");
    return {
      message: "some error occured while trying to connect with mongoDB",
      status: 500,
      connected: false,
    };
  }
}
