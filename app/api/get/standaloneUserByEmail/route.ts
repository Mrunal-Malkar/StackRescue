import { authProvider } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/lib/schemaUser";
import connectDB from "@/lib/connectDB";
import { replaceLast } from "@/app/functions/general";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authProvider);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const emailParam = searchParams.get("email")?.toString();
    const email = replaceLast(emailParam!, "%40", "@");

    if (!emailParam) {
      return NextResponse.json(
        { message: "Email parameter is required" },
        { status: 400 },
      );
    }

    await connectDB();
    const user = await User.findOne({ email }).select(
      "name email profileImage _id",
    );
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("the data user",user)
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Error in getting standAloneUser", e },
      { status: 500 },
    );
  }
}
