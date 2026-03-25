import { authProvider } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import User from "@/lib/schemaUser";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authProvider);
    console.log("got the session",session);
    if (!session) {
      return NextResponse.json({ status: 401, message: "Unauthorized" });
    }

    const userId = session.user.id;
    console.log("got the user id",userId);

    await connectDB();
console.log("connected to mongodb from profile");

    const userData = await User.findById(userId)
      .select(["toolsMostUsed", "about", "socialLink","profileImage", "projects", "ideas"])

console.log("dont know but the userData is",userData);

if (!userData || (!userData.toolsMostUsed?.length && (!userData.about || userData.about.trim() === "") && (!userData.socialLink || userData.socialLink.trim() === ""))) {
console.log("returning the no profile data now");
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

  console.log("the about me backend",userData.about)

    const profileData = {
      about: userData.about,
      socialLink: userData.socialLink,
      tools: userData.toolsMostUsed,
      totalCollaborations,      
      createdTotal: created,
      projects: userData.projects,
      ideas: userData.ideas,
      profileImage,
    };

    console.log("return the userData checked now",profileData);

    return NextResponse.json({status:200,data:profileData});
  } catch (e) {
    return NextResponse.json({ status: 500, error: e });
  }
}
