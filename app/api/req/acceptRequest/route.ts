import { authProvider } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import Idea from "@/lib/schemaIdeas";
import Project from "@/lib/schemaProjects";
import User from "@/lib/schemaUser";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
          const session = await getServerSession(authProvider);
        
            if (!session) {
              return NextResponse.json(
                { message: "Unauthorized request" },
                { status: 401 }
              );
            }
        
        const userId = session.user.id;
        const data = await req.json();
        const { requestedBy, to, stackId, stackType } = data;

        if (!requestedBy || !to || !stackId || !stackType) {
          return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 }
          );
        }

        await connectDB();

        const updateUser = await User.findOneAndUpdate(
          {
            _id: userId,
            requests: {
              $elemMatch: { requestedBy, to, stackId, stackType },
            },
          },
          {
            $pull: { requests: { requestedBy, to, stackId, stackType } },
            $addToSet: { collaborated: { requestedBy, stackId, stackType } },
          },
          { new: true }
        );

        if (!updateUser) {
          return NextResponse.json(
            { message: "Request not found or already accepted" },
            { status: 404 }
          );
        }

        const requesterUpdate = await User.findOneAndUpdate(
          { _id: requestedBy },
          {
            $addToSet: { collaborated: { requestedBy: to, stackId, stackType } },
          },
          { new: true }
        );

        if (!requesterUpdate) {
          return NextResponse.json(
            { message: "Requester user not found" },
            { status: 404 }
          );
        }

        switch (stackType){
          case "Project":
            await Project.findByIdAndUpdate(stackId,
              {$addToSet:{collaborators:{requestedBy:to,author:requestedBy}}
        })

        case "Idea":
          await Idea.findByIdAndUpdate(stackId,
            {$addToSet:{collaborators:{requestedBy:to,author:requestedBy}}}
          )
        }

        return NextResponse.json(
          { message: "Request accepted successfully" },
          { status: 200 }
        );
    }catch(e){
      return NextResponse.json({message:"internal server error"},{status:500});
    }
}