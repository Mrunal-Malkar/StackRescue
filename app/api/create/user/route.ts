import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/lib/schemaUser";
import saveImage from "@/app/functions/CloudinaryUploadImage";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();
    if (!formData) {
      return NextResponse.json({ message: "Unable to parse form data" }, { status: 400 });
    }

    const name = (formData.get("name")?.toString() || "").trim();
    const email = (formData.get("email")?.toString() || "").trim().toLowerCase();
    const password = (formData.get("password")?.toString() || "").trim();
    const imageFile = formData.get("image") as File | null;

    if (!name || !email) {
      return NextResponse.json({ message: "Name and email are required" }, { status: 400 });
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    let imageUrl = "";
    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      const uploadResponse = await saveImage(imageFile, "users");
      imageUrl = uploadResponse.secure_url;
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password,
        profileImage: imageUrl,
      });
    } else {
      if (password) user.password = password;
      if (name) user.name = name;
      if (imageUrl) user.profileImage = imageUrl;
      await user.save();
    }

    return NextResponse.json({ message: "User created/updated successfully", user }, { status: 200 });
  } catch (error: unknown) {
    console.error("User route error:", error);
    return NextResponse.json({ message: "Some error occurred", error: error instanceof Error ? error.message : "unknown" }, { status: 500 });
  }
}
