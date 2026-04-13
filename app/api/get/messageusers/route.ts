import { authProvider } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/lib/schemaUser";

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

    const users = await User.findById({ userId }).select("chats");

    if (users && users.length === 0) {
      return NextResponse.json({ message: "No Users Found" }, { status: 404 });
    } else if (!users) {
      return NextResponse.json(
        { message: "Error in getting users" },
        { status: 500 },
      );
    }

    return NextResponse.json({ users }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Error in getting users" },
      { status: 500 },
    );
  }
}
