import { GeneralStackType } from "@/type/types";
import { X } from "lucide-react";
import Image from "next/image";

const StackModalForProfile = ({
  isOpen,
  onClose,
  stack,
}: {
  isOpen: boolean;
  onClose: () => void;
  stack:GeneralStackType;
}) => {
  


  if (!isOpen) return null;
    if(!stack)return null;

  return (
    <div className="backdrop-blur-xs bg-black/40 fixed inset-0 z-50 flex justify-center items-center p-2 sm:p-0">
      <div className="relative h-5/6 md:h-11/12 sm:w-10/12 w-full bg-neutral-900 rounded-2xl p-2 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition"
        >
          <X size={20} />
        </button>

        {/* LEFT */}
        <div className="w-full md:w-1/2 flex flex-col h-full text-white p-3 md:p-5 md:overflow-y-auto no-scrollbar">
          {/* TITLE */}
          <div className="w-full flex flex-col gap-3 pb-4 border-b border-neutral-700">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              { stack?.title}
            </h1>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
              {
                stack?.categories?.map((cat, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30"
                    >
                      {cat}
                    </span>
))}

              {stack?.type === "Project" && (
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  {stack.projectType}
                </span>
              )}
            </div>
          </div>

          {/* IMAGE */}
          <div className="w-full mt-6">
  <div className="w-full rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-800">
    
    {stack?.image?.secure_url ? (
      <Image
        src={stack.image.secure_url}
        alt="preview"
        width={800}
        height={500}
        className="w-full h-auto object-cover"
      />
    ) : (
      <div className="flex items-center justify-center py-16 text-neutral-500 text-sm">
        No preview available
      </div>
    )}

  </div>
</div>

          {/* DESCRIPTION */}
          <div className="w-full mt-6 flex flex-col gap-3">
            <h2 className="text-lg font-semibold">About</h2>
            <div className="text-sm md:text-base text-neutral-300 leading-relaxed">
              {
                stack?.description
              }
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 flex flex-col h-full p-3 md:p-6 bg-neutral-900 md:overflow-y-auto no-scrollbar text-white">
          {/* ROLES */}
          <div className="flex flex-col gap-3 border-b border-neutral-700 pb-6">
            <h2 className="text-lg font-semibold">Roles Needed</h2>

            <div className="flex flex-wrap gap-2">
              { stack?.roles?.map((role, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-400 border border-green-500/30"
                    >
                      {role}
                    </span>
                  ))}
            </div>
          </div>

          {/* SKILLS */}
          <div className="flex flex-col gap-3 pt-6 border-b border-neutral-700 pb-6">
            <h2 className="text-lg font-semibold">Required Skills</h2>

            <div className="flex flex-wrap gap-2">
              {stack?.requiredSkills?.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-neutral-800 border border-neutral-700"
                    >
                      #{skill}
                    </span>
                  ))}
            </div>
          </div>

          {/* PROJECT ONLY */}
          {stack?.type === "Project" && (
            <>
              <div className="flex flex-col gap-3 pt-6 border-b border-neutral-700 pb-6">
                <h2 className="text-lg font-semibold">Build Progress</h2>

                {(
                  <p className="text-sm text-neutral-300">
                    UI/UX: {stack.buildProgress?.uiux}% • Backend:{" "}
                    {stack.buildProgress?.backend}%
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 pt-6 border-b border-neutral-700 pb-6">
                <h2 className="text-lg font-semibold">
                  Why this project is incomplete
                </h2>

                {(
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {stack.reasonForLeavingProject}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 pt-6">
                <h2 className="text-lg font-semibold">Tools Used</h2>

                <div className="flex flex-wrap gap-2">
                  {stack.toolsUsed?.map((tool, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm rounded-full bg-neutral-800 border border-neutral-700"
                        >
                          #{tool}
                        </span>
                      ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StackModalForProfile;
