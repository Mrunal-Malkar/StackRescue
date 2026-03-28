import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/lib/schemaUser";
import Project from "@/lib/schemaProjects";
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

    const userId = session.user.id;

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
    const liveLink = (formData.get("liveLink")?.toString() || "").trim();
    const repoLink = (formData.get("repoLink")?.toString() || "").trim();

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
    let requiredSkills: string[] = [];
    let toolsUsed: string[] = [];
    try {
      categories = JSON.parse(formData.get("categories")?.toString() || "[]");
      roles = JSON.parse(formData.get("roles")?.toString() || "[]");
      requiredSkills = JSON.parse(
        formData.get("requiredSkills")?.toString() || "[]",
      );
      toolsUsed = JSON.parse(formData.get("toolsUsed")?.toString() || "[]");
    } catch (e) {
      return NextResponse.json(
        { message: "Categories, roles, skills and tools must be arrays" },
        { status: 400 },
      );
    }

    if (!title || !description || !reasonForLeavingProject) {
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
    const imageUrl = await saveImage(imageFile, "project");

    const project = await Project.create({
      title,
      description,
      image: imageUrl,
      categories,
      roles,
      requiredSkills,
      toolsUsed,
      liveLink,
      repoLink,
      buildProgress: {
        uiux: uiuxProgress,
        backend: backendProgress,
      },
      stackType:"Project",
      reasonForLeavingProject,
      createdBy: userId,
      collaborators:[]
    });
    console.log("project",project);

    await User.findByIdAndUpdate(userId, {
      $push: { "projects.created": project._id },
    });

    return NextResponse.json(
      { message: "Project created successfully", project },
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
