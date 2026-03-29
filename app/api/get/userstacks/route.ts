import { authProvider } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import Idea from "@/lib/schemaIdeas";
import Project from "@/lib/schemaProjects";
import User from "@/lib/schemaUser";
import { GeneralStackType, requestType, UnifiedStack } from "@/type/types";
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

    const id = session.user.id;
    const { currentView } = await req.json();

    if (!currentView) {
      return NextResponse.json(
        { message: "View is required" },
        { status: 400 }
      );
    }

    const result = await getStack(currentView, id);

    if (!result.success) {
      return NextResponse.json(
        { message: result.error },
        { status: result.status || 500 }
      );
    }

    return NextResponse.json({ data: result.data }, { status: 200 });

  } catch (e) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


async function getStack(View: string, userId: string) {
  if (!View || !userId) {
    return {
      success: false,
      error: "Missing required parameters",
      status: 400,
    };
  }

  await connectDB();

  try {
    const user = await User.findById(userId);

    if (!user) {
      return {
        success: false,
        error: "User not found. Please create a profile.",
        status: 404,
      };
    }

    switch (View.toLowerCase()) {

      case "all": {
        await user.populate([
          { path: "projects.created", model: Project },
          { path: "ideas.created", model: Idea }
        ]);

        const collab=user.collaborated;
        console.log("the collab",collab);
  
       const collabo= await user.populate({path:"collaborated.stackId",modelPath:"user.collaborated.stackType"});
        console.log("the collaborated after populating collab",collabo);

        const allItems = [
          ...(user.projects?.created || []),
          ...(user.ideas?.created || []),
          ...(user.collaborated?.map((c:requestType) => c.stackId) || []),
        ];

        const sorted = allItems.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        console.log("sorted array",sorted);

        return { success: true, data: sorted };
      }

      case "collaborated": {
        await user.populate([
          { path: "collaborated.stackId" }
        ]);

        const collaboratedItems =
          user.collaborated?.map((c:{requestedBy:string,stackId:UnifiedStack,stackType:"Project"|"Type"}) => c.stackId) || [];

        const sorted = collaboratedItems.sort(
          (a:UnifiedStack,b:UnifiedStack) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        return { success: true, data: sorted };
      }

      case "posted": {
        await user.populate([
          { path: "projects.created", model: Project },
          { path: "ideas.created", model: Idea },
        ]);

        const postedItems = [
          ...(user.projects?.created || []),
          ...(user.ideas?.created || []),
        ];

        const sorted = postedItems.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        return { success: true, data: sorted };
      }

      default:
        return {
          success: false,
          error: `Invalid view type: ${View}`,
          status: 400,
        };
    }

  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch stacks",
      status: 500,
    };
  }
}