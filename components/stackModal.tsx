import { GeneralStackType } from "@/type/types";
import { X } from "lucide-react";

const StackModal = ({
  stack,
  isOpen,
  onClose,
}: {
  stack?: GeneralStackType;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!stack || !isOpen) return null;

  return (
    <div className="backdrop-blur-xs bg-black/40 fixed inset-0 z-50 flex justify-center items-center p-2 sm:p-0">
      <div className="relative h-5/6 md:h-11/12 sm:w-10/12 w-full bg-neutral-900 rounded-2xl p-2 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">

        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition"
        >
          <X size={20} />
        </button>

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 flex flex-col h-full text-white p-3 md:p-5 md:overflow-y-auto no-scrollbar">

          {/* Title */}
          <div className="w-full flex flex-col gap-3 pb-4 border-b border-neutral-700">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {stack.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm">

              {/* categories */}
              {stack.categories.map((cat, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30"
                >
                  {cat}
                </span>
              ))}

              {/* project only */}
              {stack.type === "project" && (
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  {stack.projectType}
                </span>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="w-full mt-6">
            <div className="relative w-full min-h-[300px] md:min-h-[420px] rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-800">
              {stack.image?.secure_url ? (
                <img
                  src={stack.image.secure_url}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-neutral-500 text-sm">
                  No preview available
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="w-full mt-6 flex flex-col gap-3">
            <h2 className="text-lg font-semibold">About</h2>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              {stack.description}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex flex-col h-full p-3 md:p-6 bg-neutral-900 md:overflow-y-auto no-scrollbar text-white">

          {/* Creator */}
          <div className="w-full flex flex-col gap-4 border-b border-neutral-700 pb-6">
            <h1 className="text-xl md:text-2xl font-semibold">
              Created By
            </h1>

            <p className="text-sm text-neutral-400 break-all">
              {stack.createdBy}
            </p>
          </div>

          {/* Roles */}
          <div className="flex flex-col gap-3 pt-6 border-b border-neutral-700 pb-6">
            <h2 className="text-lg font-semibold">Roles Needed</h2>

            <div className="flex flex-wrap gap-2">
              {stack.roles.map((role, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-400 border border-green-500/30"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Required Skills */}
          <div className="flex flex-col gap-3 pt-6 border-b border-neutral-700 pb-6">
            <h2 className="text-lg font-semibold">Required Skills</h2>

            <div className="flex flex-wrap gap-2">
              {stack.requiredSkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full bg-neutral-800 border border-neutral-700"
                >
                  #{skill}
                </span>
              ))}
            </div>
          </div>

          {/* PROJECT ONLY SECTION */}
          {stack.type === "project" && (
            <>
              {/* Build Progress */}
              <div className="flex flex-col gap-3 pt-6 border-b border-neutral-700 pb-6">
                <h2 className="text-lg font-semibold">Build Progress</h2>

                <p className="text-sm text-neutral-300">
                  UI/UX: {stack.buildProgress.uiux}% • Backend:{" "}
                  {stack.buildProgress.backend}%
                </p>
              </div>

              {/* Reason */}
              <div className="flex flex-col gap-2 pt-6 border-b border-neutral-700 pb-6">
                <h2 className="text-lg font-semibold">
                  Why this project is incomplete
                </h2>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {stack.reasonForLeavingProject}
                </p>
              </div>

              {/* Tools */}
              <div className="flex flex-col gap-3 pt-6 border-b border-neutral-700 pb-6">
                <h2 className="text-lg font-semibold">Tools Used</h2>

                <div className="flex flex-wrap gap-2">
                  {stack.toolsUsed.map((tool, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-neutral-800 border border-neutral-700"
                    >
                      #{tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {(stack.liveLink || stack.repoLink) && (
                <div className="flex flex-col gap-3 pt-6">
                  <h2 className="text-lg font-semibold">Links</h2>

                  <div className="flex flex-col gap-2 text-sm">
                    {stack.liveLink && (
                      <a
                        href={stack.liveLink}
                        target="_blank"
                        className="text-sky-400 hover:underline"
                      >
                        Live Project
                      </a>
                    )}

                    {stack.repoLink && (
                      <a
                        href={stack.repoLink}
                        target="_blank"
                        className="text-purple-400 hover:underline"
                      >
                        Repository
                      </a>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StackModal;