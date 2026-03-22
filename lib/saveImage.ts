import Cloudinary from "@/lib/cloudinary.config";

export async function saveImage(imageFile: File): Promise<string> {
  if (!imageFile) {
    throw new Error("No image file provided");
  }
  if (!imageFile.type.startsWith("image/")) {
    throw new Error("Unsupported file type");
  }
  if (imageFile.size > 3 * 1024 * 1024) {
    throw new Error("File too large (max 3MB)");
  }

  const buffer = Buffer.from(await imageFile.arrayBuffer());

  const uploadResult = await new Promise<any>((resolve, reject) => {
    const stream = Cloudinary.v2.uploader.upload_stream(
      { folder: "Home/StackRescue/Projects" },
      (err, res) => {
        if (err) return reject(err);
        resolve(res);
      },
    );
    stream.end(buffer);
  });

  if (!uploadResult || !uploadResult.secure_url) {
    throw new Error("Image upload failed");
  }

  return uploadResult.secure_url;
}
