import { authProvider } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import User from "@/lib/schemaUser";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import saveImage from "@/app/functions/CloudinaryUploadImage";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authProvider);
    if (!session) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized request!",
      });
    }

    const formData = await req.formData();
    if (!formData) {
      return NextResponse.json(
        { message: "Unable to parse form data" },
        { status: 400 },
      );
    }

    const about = (formData.get("about")?.toString() || "").trim();
    const socialLink = (formData.get("socialLink")?.toString() || "").trim();
    const toolsStr = (formData.get("tools")?.toString() || "").trim();
    const tools = toolsStr
      ? toolsStr
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t)
      : [];
    const imageFile = formData.get("profileImage") as File | null;

    const userId = session.user.id;
    await connectDB();

    let imageUrl = "";
    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      const uploadResponse = await saveImage(imageFile, "profile");
      imageUrl = uploadResponse.secure_url;
    }

    if (!imageUrl) {
      return NextResponse.json({
        status: 400,
        message: "unable to upload image",
      });
    }

    const updateData = {
      about,
      profileImage: imageUrl,
      socialLink,
      toolsMostUsed: tools,
    };

    const user = await User.findOneAndUpdate({ _id: userId }, updateData, {
      new: true,
    });

    if (!user) {
      return NextResponse.json({ status: 404, message: "User not found!" });
    }

    return NextResponse.json({
      status: 200,
      message: "Profile updated successfully!",
    });
  } catch (error: unknown) {
    console.error("Profile update error:", error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
