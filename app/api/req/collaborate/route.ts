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
        { status: 401 }
      );
    }
    const { authorId, stackId, stackType } = await req.json();
    const userId = session.user.id;

    if (!authorId || !stackId || !stackType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // if (userId === authorId) {
    //   return NextResponse.json(
    //     { message: "Cannot send request to yourself" },
    //     { status: 400 }
    //   );
    // }

    if (!["Project", "Idea"].includes(stackType)) {
      return NextResponse.json(
        { message: "Invalid stack type" },
        { status: 400 }
      );
    }

    await connectDB();
const updated = await User.findOneAndUpdate(
  {
    _id: authorId,
    requests: {
      $not: {
        $elemMatch: {
          requestedBy: userId,
          stackId: stackId,
        },
      },
    },
  },
  {
    $push: {
      requests: {
        requestedBy: userId,
        to: authorId,
        stackId,
        stackType,
        status: "pending",
      },
    },
  },
  { new: true }
);

   if (!updated) {
  return NextResponse.json(
    { message: "Request already sent" },
    { status: 409 }
  );
}

    // const author = await User.findByIdAndUpdate(
    //   authorId,
    //   {
    //     $push: {
    //       requests: {
    //         requestedBy: userId,
    //         to: authorId,
    //         stackId,
    //         stackType,
    //         status: "pending",
    //       },
    //     },
    //   },
    //   { new: true }
    // );

    return NextResponse.json(
      { message: "Request sent successfully" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}