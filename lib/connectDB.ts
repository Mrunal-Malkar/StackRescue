import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const connect = await mongoose.connect(
      `mongodb+srv://mrunalpmalkar_db_user:${process.env.MONGODB_PASSWORD}@cluster0.1dlvqul.mongodb.net/StackRescue`,
    );
    connect.connection.on("connected", () => {
      return { status: 200, connected: true };
    });
  } catch (e) {
    return {
      message: "some error occured while trying to connect with mongoDB",
      status: 500,
      connected: false,
    };
  }
}
