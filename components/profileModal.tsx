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
    try {

      const tools = Data.tools.map((t) => t.trim());

      const formData = new FormData();
      formData.append("profileImage", Data.image[0]);
      formData.append("socialLink", Data.link);
      formData.append("tools", tools.toString());
      formData.append("about", Data.about);

      const request = await fetch("/api/create/profile", {
        method: "POST",
        body: formData,
      });

      const res = await request.json();

      if (!request.ok) {
        toast.error(res.message || "Error creating profile");
        return;
      }

      toast.success("Profile created successfully!");

      // optional delay so toast is visible
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error("ERROR:", error);
      toast.error("Something went wrong");
    }
  }

  const onSubmit = async (data: ProfileFormInputs) => {
    await AddProfileInfo(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-zinc-950 text-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-zinc-800">
        <ToastContainer/>
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

          {/* TOOLS */}
          <div>
            <label className="text-sm text-zinc-400 flex items-center gap-2">
              <Wrench size={14} /> Top 3 tools
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

            {(errors.tools?.[0] ||
              errors.tools?.[1] ||
              errors.tools?.[2]) && (
              <p className="text-red-400 text-xs mt-1">
                All three tools are required
              </p>
            )}
          </div>

          {/* ABOUT */}
          <div>
            <label className="text-sm text-zinc-400 flex items-center gap-2">
              <User size={14} /> About (min 20 words)
            </label>

            <textarea
              rows={4}
              {...register("about", {
                required: "About required",
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

          {/* LINK */}
          <div>
            <label className="text-sm text-zinc-400 flex items-center gap-2">
              <LinkIcon size={14} /> Social Link
            </label>

            <input
              type="url"
              {...register("link", {
                required: "Link required",
                pattern: {
                  value: /^(https?:\/\/).+/,
                  message: "Enter valid URL",
                },
              })}
              className="w-full mt-2 p-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />

            {errors.link && (
              <p className="text-red-400 text-xs mt-1">
                {errors.link.message}
              </p>
            )}
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-sm text-zinc-400 flex items-center gap-2 mb-2">
              <ImageIcon size={14} /> Profile Image
            </label>

            <label className="w-full h-32 flex items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900 cursor-pointer overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  className="w-full h-full object-cover"
                  alt="preview"
                />
              ) : (
                <span className="text-zinc-500 text-sm">
                  Click to upload
                </span>
              )}

              <input
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "Image required",
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) setPreview(URL.createObjectURL(file));
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

          {/* BUTTONS */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-zinc-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-blue-600"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}