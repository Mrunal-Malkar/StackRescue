import { authProvider } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import User from "@/lib/schemaUser";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authProvider);
    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized request",
        },
        { status: 401 },
      );
    }

    const data = await req.json();
    const authorId = data.userId;

    console.log("this is the data",data,"and author id",authorId);
    if (!data || !authorId) {
      return NextResponse.json(
        { message: "data is required" },
        { status: 404 },
      );
    }

    await connectDB();

    const authorDetails = await User.findById(authorId).select([
      "name",
      "about",
      "email",
      "profileImage"
    ]);

    console.log("the author detail",authorDetails);

    return NextResponse.json({ data: authorDetails }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message:e||"something went wrong",
      },
      { status: 500 },
    );
  }
}
