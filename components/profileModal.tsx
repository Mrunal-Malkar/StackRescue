"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  X,
  User,
  Link as LinkIcon,
  Image as ImageIcon,
  Wrench,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ProfileFormInputs } from "@/type/types";

export default function ProfileModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormInputs>({
    defaultValues: {
      tools: ["", "", ""],
    },
  });

  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  const session = useSession();

  async function AddProfileInfo(Data: ProfileFormInputs) {
    const tools = Data.tools.map((t) => t.trim());
    const formData = new FormData();
    formData.append("profileImage", Data.image[0]);
    formData.append("socialLink", Data.link);
    formData.append("tools", tools.toString());
    formData.append("about",Data.about);

    const request = await fetch("/api/create/profile", {
      method: "POST",
      body: formData,
    });
    const res = await request.json();

    if (!res || res.status != 200) {
      return toast.error(
        res.message ? res.message : "error creating a profile, try again later",
      );
    } else if (res.status == 200) {
      onClose();
        return router.push(
            session.data?.user.email
              ? `/profile/${session.data?.user.email}`
              : "/explore",
          );
      toast.success("profile created!, redirecting...");
  }
  }
  const onSubmit = async (data: ProfileFormInputs) => {
    // Trim tools
    await AddProfileInfo(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
      <ToastContainer />
      <div className="bg-zinc-950 text-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-zinc-800">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <User size={18} /> Create Profile
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Tools (3 inputs) */}
          <div>
            <label className="text-sm text-zinc-400 flex items-center gap-2">
              <Wrench size={14} /> Top 3 tools/software/language anything.You
              use.
            </label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[0, 1, 2].map((i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Tool ${i + 1}`}
                  {...register(`tools.${i}` as const, {
                    required: "Required",
                    validate: (value: string) =>
                      value.trim().length > 0 || "Required",
                  })}
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              ))}
            </div>

            {/* Aggregate error display */}
            {(errors.tools?.[0] || errors.tools?.[1] || errors.tools?.[2]) && (
              <p className="text-red-400 text-xs mt-1">
                All three tools are required
              </p>
            )}
          </div>

          {/* About */}
          <div>
            <label className="text-sm text-zinc-400 flex items-center gap-2">
              <User size={14} /> About (min 20 words)
            </label>
            <textarea
              rows={4}
              {...register("about", {
                required: "About section required",
                validate: (value: string) =>
                  value.trim().split(/\s+/).length >= 20 ||
                  "Minimum 20 words required",
              })}
              className="w-full mt-2 p-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.about && (
              <p className="text-red-400 text-xs mt-1">
                {errors.about.message}
              </p>
            )}
          </div>

          {/* Profile Link */}
          <div>
            <label className="text-sm text-zinc-400 flex items-center gap-2">
              <LinkIcon size={14} /> Profile Link of any social platform
            </label>
            <input
              type="url"
              placeholder="https://your-profile.com"
              {...register("link", {
                required: "Profile link required",
                pattern: {
                  value: /^(https?:\/\/).+/,
                  message: "Enter a valid URL",
                },
              })}
              className="w-full mt-2 p-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.link && (
              <p className="text-red-400 text-xs mt-1">{errors.link.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm text-zinc-400 flex items-center gap-2 mb-2">
              <ImageIcon size={14} /> Profile Image
            </label>

            <label className="w-full h-32 flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900 hover:bg-zinc-800 cursor-pointer overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-zinc-500 text-sm flex flex-col items-center">
                  <ImageIcon size={20} />
                  <span>Click to upload</span>
                  <span className="text-xs">PNG, JPG under 3MB</span>
                </div>
              )}

              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                {...register("image", {
                  required: "Image is required",
                  validate: {
                    fileType: (files: FileList) => {
                      const file = files?.[0];
                      if (!file) return true;
                      return (
                        ["image/jpeg", "image/png", "image/jpg"].includes(
                          file.type,
                        ) || "Only JPG, JPEG, PNG allowed"
                      );
                    },
                    fileSize: (files: FileList) => {
                      const file = files?.[0];
                      if (!file) return true;
                      return (
                        file.size <= 3 * 1024 * 1024 ||
                        "File must be less than 3MB"
                      );
                    },
                  },
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  },
                })}
                className="hidden"
              />
            </label>

            {errors.image && (
              <p className="text-red-400 text-xs mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
