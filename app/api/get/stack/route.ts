import { authProvider } from "@/lib/auth";
import connectDB from "@/lib/connectDB"; 
import Idea from "@/lib/schemaIdeas";
import Project from "@/lib/schemaProjects";
import { RequestStackType } from "@/type/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
      console.log("The api hitted");
      const session = await getServerSession(authProvider);
      if (!session) {
          return NextResponse.json(
              { message: "Unauthorized request" },
              { status: 401 }
            );
        }
        
        const body: RequestStackType = await req.json();

        console.log("the body",body);

        if (!body) {
            return NextResponse.json(
                { message: "Data is required" },
                { status: 400 }
            );
    }

    const { stackType, stackId } = body;
    console.log("the stackType",stackType,"the stackId",stackId);
    if (!stackType || !stackId) {
        return NextResponse.json(
            { message: "stackType and stackId are required" },
            { status: 400 }
        );
    }
    
    let stack;
    
    await connectDB();
    // 🔥 Dynamic Model Selection
    if (stackType === "Project") {
      stack = await Project.findById(stackId);
    } else if (stackType === "Idea") {
      stack = await Idea.findById(stackId);
    } else {
        return NextResponse.json(
            { message: "Invalid stack type" },
            { status: 400 }
      );
    }

    if (!stack) {
      return NextResponse.json(
        { message: "Stack not found" },
        { status: 404 }
      );
    }


    return NextResponse.json(
      {
        message: "Stack fetched successfully",
        data: stack,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ERROR FETCHING STACK:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}