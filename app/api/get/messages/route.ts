import { replaceLast } from "@/app/functions/general";
import { authProvider } from "@/lib/auth";
import Chat from "@/lib/schemaChats";
import User from "@/lib/schemaUser";
import { error } from "console";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const session = await getServerSession(authProvider);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const emailParam = searchParams.get("email");
    const theId = searchParams.get("id")
      ? searchParams.get("id")
      : emailParam
        ? await User.findOne({
            email: replaceLast(emailParam, "%40", "@"),
          }).select("_id")
        : null;

    if (!theId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }
    const messages = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(session.user.id) } },
      { $unwind: "$chats" },
      {
        $match: {
          "chats.receiver": new mongoose.Types.ObjectId(theId),
        },
      },
      {
        $lookup: {
          from: "chats",
          localField: "chats.chatId",
          foreignField: "_id",
          as: "chatData",
        },
      },
      {
        $unwind: "$chatData",
      },
    ]);

    console.log("the messages at the backend", messages);

    if (!messages) {
      return NextResponse.json({ error: "No messages found" }, { status: 404 });
    }
    return NextResponse.json({ messages }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Failed to fetch messages",
        error: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
