import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/../lib/connectDB";
import User from "@/lib/schemaUser";
import Idea from "@/lib/schemaIdeas";
import saveImage from "@/app/functions/CloudinaryUploadImage";
import { getServerSession } from "next-auth";
import { authProvider } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
      const session = await getServerSession(authProvider);
        if (!session) {
          return NextResponse.json(
            {
              message: "Unauthorized reequest",
            },
            { status: 401 },
          );
        }
    

    await connectDB();
    const formData = await req.formData();
    if (!formData) {
      return NextResponse.json(
        { message: "Unable to parse form data" },
        { status: 400 },
      );
    }

    const userId=session.user.id;
    const title = (formData.get("title")?.toString() || "").trim();
    const description = (formData.get("description")?.toString() || "").trim();
    let categories: string[] = [];
    let roles: string[] = [];
    let requiredSkills: string[] = [];

    try {
      categories = JSON.parse(formData.get("categories")?.toString() || "[]");
      roles = JSON.parse(formData.get("roles")?.toString() || "[]");
      requiredSkills = JSON.parse(formData.get("requiredSkills")?.toString() || "[]");
    } catch (e) {
      return NextResponse.json(
        { message: "Categories, roles and skills must be arrays" },
        { status: 400 },
      );
    }

    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required" },
        { status: 400 },
      );
    }

    if (!Array.isArray(categories) || categories.length < 1) {
      return NextResponse.json(
        { message: "At least one category is required" },
        { status: 400 },
      );
    }

    if (!Array.isArray(roles) || roles.length < 1) {
      return NextResponse.json(
        { message: "At least one role is required" },
        { status: 400 },
      );
    }

    const imageFile = formData.get("image") as File | null;
    if (!imageFile || !(imageFile instanceof File)) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 },
      );
    }

    const imageUrl = await saveImage(imageFile,"idea");

    const idea = await Idea.create({
      title,
      description,
      image: imageUrl,
      categories,
      roles,
      stackType:"idea",
      requiredSkills,
      createdBy: userId,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { "ideas.created": idea._id }
    });

    return NextResponse.json(
      { message: "Idea created successfully", idea },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: "Some error occurred",
        error: error instanceof Error ? error.message : "unknown",
      },
      { status: 500 },
    );
  }
}
