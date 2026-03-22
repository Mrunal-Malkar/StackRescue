import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
import User from "@/app/db/schemaUser";
import Project from "@/app/db/schemaProjects";

async function saveImage(imageFile: File): Promise<string> {
  if (!imageFile) return "";
  
  return `/uploads/${fileName}`;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();
    if (!formData) {
      return NextResponse.json(
        { message: "Unable to parse form data" },
        { status: 400 },
      );
    }

    const title = (formData.get("title")?.toString() || "").trim();
    const description = (formData.get("description")?.toString() || "").trim();
    const projectType = (formData.get("projectType")?.toString() || "").trim();
    const reasonForLeavingProject = (
      formData.get("reasonForLeavingProject")?.toString() || ""
    ).trim();
    const uiuxProgress = Number(
      formData.get("uiuxProgress")?.toString() ?? NaN,
    );
    const backendProgress = Number(
      formData.get("backendProgress")?.toString() ?? NaN,
    );

    let categories: string[] = [];
    let roles: string[] = [];
    try {
      categories = JSON.parse(formData.get("categories")?.toString() || "[]");
      roles = JSON.parse(formData.get("roles")?.toString() || "[]");
    } catch (e) {
      return NextResponse.json(
        { message: "Categories and roles must be arrays" },
        { status: 400 },
      );
    }

    if (!title || !description || !projectType || !reasonForLeavingProject) {
      return NextResponse.json(
        { message: "All project fields are required" },
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
    if (
      !Number.isFinite(uiuxProgress) ||
      !Number.isFinite(backendProgress) ||
      uiuxProgress <= 0 ||
      backendProgress <= 0
    ) {
      return NextResponse.json(
        { message: "UI/UX and Backend progress must be greater than 0" },
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
    const imageUrl = await saveImage(imageFile);

    const userEmail =
      formData.get("userEmail")?.toString() || "guest@devgarage.local";
    const userName = formData.get("userName")?.toString() || "Guest User";

    let user = await User.findOne({ email: userEmail });
    if (!user) {
      user = await User.create({ email: userEmail, name: userName });
    }

    const project = await Project.create({
      title,
      description,
      image: imageUrl,
      categories,
      roles,
      buildProgress: {
        uiux: uiuxProgress,
        backend: backendProgress,
      },
      projectType,
      reasonForLeavingProject,
      createdBy: user._id,
    });

    user.stacks = user.stacks || { created: [], collaborated: [] };
    user.stacks.created = user.stacks.created || [];
    user.stacks.created.push(project._id);
    await user.save();

    return NextResponse.json(
      { message: "Project created successfully", project },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Project creation error:", error);
    return NextResponse.json(
      {
        message: "Some error occurred",
        error: error instanceof Error ? error.message : "unknown",
      },
      { status: 500 },
    );
  }
}
