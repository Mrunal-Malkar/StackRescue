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
        { message: "Unauthorized request" },
        { status: 401 },
      );
    }
    const userId = session.user.id;
    const body = await req.json();
    const authorId = body.authorId;

    if (userId == authorId) {
      return NextResponse.json(
        { message: "cannot send collaboration request to yourself" },
        { status: 400 },
      );
    }

    if (!authorId) {
      return NextResponse.json(
        { message: "data is required" },
        { status: 404 },
      );
    }

    await connectDB();

    const author = await User.findOneAndUpdate(
      {
        _id: authorId,
        requests: { $ne: userId },
      },
      {
        $push: { requests: userId },
      },
      { new: true },
    );

    if (!author) {
      return NextResponse.json({ message: "already sent!" }, { status: 201 });
    }
    
    return NextResponse.json({ message: "request sent" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
