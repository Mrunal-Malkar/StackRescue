import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
import User from "@/lib/schemaUser";
import Idea from "@/lib/schemaIdeas";

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

    const imageUrl = await saveImage(imageFile);

    const userEmail =
      formData.get("userEmail")?.toString() || "guest@devgarage.local";
    const userName = formData.get("userName")?.toString() || "Guest User";

    let user = await User.findOne({ email: userEmail });
    if (!user) {
      user = await User.create({ email: userEmail, name: userName });
    }

    const idea = await Idea.create({
      title,
      description,
      image: imageUrl,
      categories,
      roles,
      createdBy: user._id,
    });

    user.ideas = user.ideas || { created: [], collaborated: [] };
    user.ideas.created = user.ideas.created || [];
    user.ideas.created.push(idea._id);
    await user.save();

    return NextResponse.json(
      { message: "Idea created successfully", idea },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Idea creation error:", error);
    return NextResponse.json(
      {
        message: "Some error occurred",
        error: error instanceof Error ? error.message : "unknown",
      },
      { status: 500 },
    );
  }
}
