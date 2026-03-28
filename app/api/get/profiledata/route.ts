import { authProvider } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import User from "@/lib/schemaUser";
import Project from "@/lib/schemaProjects";
import Idea from "@/lib/schemaIdeas";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("API is hitted.")
    const session = await getServerSession(authProvider);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const userId = session.user.id;
    console.log("step 2")
    
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
  console.log("returning the no profile data now");
  return NextResponse.json({
      message: "No profile data found!",
    },{
      status: 404,});
  }

  console.log("the user has found",);


await userData.populate([
  {
    path: "requests.requestedBy",
    select: "name email profileImage _id",
  },
  {
    path: "requests.stackId",
    select: "title _id",
  },
  ]);

  console.log("the user data",userData);

    console.log("step 3")
    const totalCollaborations =userData.collaborated.length;
    
    const created =
      userData.projects.created.length + userData.ideas.created.length;
    const profileImage=userData.profileImage;
    const requests=userData.requests
    
    
    console.log("the total collaborations at the backend are",totalCollaborations)



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
    
    console.log("the profile data",profileData)
    
    return NextResponse.json(
      { data: profileData },
      { status: 200 }
    );
  } catch (e) {
    console.log(e)
    return NextResponse.json({ message: e },{status:500});
  }
}
