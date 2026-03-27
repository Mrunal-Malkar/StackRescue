import { authProvider } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import User from "@/lib/schemaUser";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authProvider);
    if (!session) {
      return NextResponse.json({ status: 401, message: "Unauthorized" });
    }

    const userId = session.user.id;

    await connectDB();
    const userData = await User.findById(userId)
      .select(["toolsMostUsed", "about", "socialLink","profileImage", "projects", "ideas","requests"]).populate({path:"requests",select:"name email profileImage _id"})

if (!userData || (!userData.toolsMostUsed?.length && (!userData.about || userData.about.trim() === "") && (!userData.socialLink || userData.socialLink.trim() === ""))) {
    return NextResponse.json({
        status: 404,
        message: "No profile data found!",
      });
    }

    const collaboratedProjects = userData.projects.collaborated.length;
    const collaboratedIdeas = userData.ideas.collaborated.length;

    const totalCollaborations = collaboratedProjects + collaboratedIdeas;

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
      requests,
    };

    return NextResponse.json({status:200,data:profileData});
  } catch (e) {
    return NextResponse.json({ status: 500, error: e });
  }
}
