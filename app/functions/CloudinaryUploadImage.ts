import Cloudinary from "@/lib/cloudinary.config";
import { CloudinaryUploadResponse } from "@/type/types";
import { UploadApiResponse } from "cloudinary";

export default async function saveImage(
  imageFile: File,
  stackFolder: string,
): Promise<CloudinaryUploadResponse> {
  try {
    if (!imageFile) {
      throw new Error("No file provided");
    }

    if (!imageFile.type.startsWith("image/")) {
      throw new Error("Invalid file type");
    }

    if (imageFile.size > 3 * 1024 * 1024) {
      throw new Error("File too large (max 3MB)");
    }

    const buffer = await convertFileToBinary(imageFile);

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const stream = Cloudinary.uploader.upload_stream(
          { folder: `Home/StackRescue/${stackFolder}` },
          (err, res) => {
            if (err) return reject(err);
            if (!res) return reject(new Error("No response from Cloudinary"));
            resolve(res);
          },
        );
        stream.end(buffer);
      },
    );
    console.log("done with uploading image");

    if (!uploadResult || !uploadResult.secure_url) {
      throw new Error("Upload failed - no secure URL returned");
    }

    return {
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Upload Error:", error.message);
      if (error.message.includes("File too large")) {
        throw error;
      }
      throw new Error("Something went wrong while uploading image");
    } else {
      throw error;
    }
  }
}


async function convertFileToBinary(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  console.log("this is the arraybuffer",arrayBuffer);
  const buffer=Buffer.from(arrayBuffer);
  console.log("buffer",buffer);
  return buffer
}
