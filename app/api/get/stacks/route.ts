import { authProvider } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import Idea from "@/lib/schemaIdeas";
import Project from "@/lib/schemaProjects";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authProvider);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized request" },
        { status: 401 }
      );
    }

    await connectDB();

    const projectsRaw = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const ideasRaw = await Idea.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const projects=projectsRaw.map((p)=>({...p,type:"project"}));
    const ideas=ideasRaw.map((i)=>({...i,type:"idea"}));

    const sortedStacks = [...projects, ...ideas].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ stacks: sortedStacks }, { status: 200 });

  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}