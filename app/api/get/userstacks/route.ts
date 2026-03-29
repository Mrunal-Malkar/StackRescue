import { authProvider } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import Idea from "@/lib/schemaIdeas";
import Project from "@/lib/schemaProjects";
import User from "@/lib/schemaUser";
import { CollaborateType, UnifiedStack } from "@/type/types";
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

    const userId = session.user.id;
    const { currentView } = await req.json();

    if (!currentView) {
      return NextResponse.json(
        { message: "View is required" },
        { status: 400 }
      );
    }

    const result = await getStack(currentView, userId);

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

async function getStack(view: string, userId: string) {
  if (!view || !userId) {
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

    const getCollaboratedStacks = async (): Promise<UnifiedStack[]> => {
      const map = new Map<string, UnifiedStack>();

      const results = await Promise.all(
        (user.collaborated || []).map(async (c:CollaborateType) => {
          let doc = null;

          if (c.stackType === "Project") {
            doc = await Project.findById(c.stackId);
          } else if (c.stackType === "Idea") {
            doc = await Idea.findById(c.stackId);
          }

          if (doc) {
            map.set(doc._id.toString(), doc);
          }
        })
      );

      return Array.from(map.values());
    };

    switch (view.toLowerCase()) {

      case "all": {
        await user.populate([
          { path: "projects.created" },
          { path: "ideas.created" },
        ]);

        const collaborated = await getCollaboratedStacks();

        const allItems: UnifiedStack[] = [
          ...(user.projects?.created || []),
          ...(user.ideas?.created || []),
          ...collaborated,
        ];

        const s=new Map();
        allItems.forEach(item=>s.set(item._id.toString(),item));
        const mapped=Array.from(s.values());

        const sorted = mapped.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        return { success: true, data: sorted };
      }

      case "collaborated": {
        const collaborated = await getCollaboratedStacks();

        const sorted = collaborated.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        return { success: true, data: sorted };
      }

      case "posted": {
        await user.populate([
          { path: "projects.created" },
          { path: "ideas.created" },
        ]);

        const postedItems: UnifiedStack[] = [
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
          error: `Invalid view type: ${view}`,
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