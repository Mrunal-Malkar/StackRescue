import { authProvider } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import User from "@/lib/schemaUser";
import Project from "@/lib/schemaProjects";
import Idea from "@/lib/schemaIdeas";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authProvider);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    
    await connectDB();
   const userData = await User.findById(userId)
  .select([
    "toolsMostUsed",
    "about",
    "socialLink",
    "profileImage",
    "projects",
    "ideas",
    "requests",
    "collaborated",
  ]);

  if (!userData) {
    throw new Error("User not found");
  }

  if (!userData || (!userData.toolsMostUsed?.length && (!userData.about || userData.about.trim() === "") && (!userData.socialLink || userData.socialLink.trim() === ""))) {
  return NextResponse.json({
      message: "No profile data found!",
    },{
      status: 404,});
  }

await userData.populate([
  {
    path: "requests.requestedBy",
    select: "name email profileImage _id",
  },
  {
    path: "requests.to",
    select: "name email profileImage _id",
  },
  {
    path: "requests.stackId",
    select: "title _id",
  },
  ]);

    const totalCollaborations =userData.collaborated.length;
    
    const created =
      userData.projects.created.length + userData.ideas.created.length;
    const profileImage=userData.profileImage;
    const requests=userData.requests

    const profileData = {
      about: userData.about,
      socialLink: userData.socialLink,
      tools: userData.toolsMostUsed,
      totalCollaborations,      
      createdTotal: created,
      projects: userData.projects,
      ideas: userData.ideas,
      profileImage,
      collaborated:userData.collaborated,
      requests,
    };
    
    return NextResponse.json(
      { data: profileData },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: e },{status:500});
  }
}
