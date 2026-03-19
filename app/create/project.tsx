import Sidebar from "@/components/sidebar";
import {
  HelpCircle,
  Layers,
  Plus,
  Rocket,
  Target,
  UploadCloud,
} from "lucide-react";
import { convertServerPatchToFullTree } from "next/dist/client/components/segment-cache/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Input = {
  title: string;
  description: string;
  range: number;
  requiredRoles: string[];
  reasonForLeavingProject: string;
  image: string;
};

export default function CreateProjectPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Input>();

  const [PreviewImageUrl, setPreviewImageUrl] = useState<string>("");

  const onSubmit: SubmitHandler<Input> = (data) => {};
  useEffect(() => {
    console.log("the preview image url is", PreviewImageUrl);
  }, [PreviewImageUrl]);

  return (
    <div className="h-screen w-screen flex">
      <Sidebar />

      <div className="w-full min-h-screen overflow-y-auto bg-[#050505] text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans">
        {/* BACKGROUND DECORATION */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative w-full max-w-[1400px] mx-auto px-6 py-12">
          {/* HEADER SECTION */}
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                Project Studio
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                Create New{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
                  Project
                </span>
              </h1>
              <p className="text-lg text-slate-400 max-w-xl">
                Turn your unfinished Projects into a collaborative opportunitya.
                Fill in the details to find the perfect partner.
              </p>
            </div>
            <div className="hidden md:block">
              <button className="group relative px-8 py-4 bg-linear-to-br from-blue-500 to-indigo-600 text-white/80 hover:cursor-pointer font-bold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                <span className="relative z-10 flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Publish Project
                </span>
              </button>
            </div>
          </header>

          <form
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* LEFT COLUMN: VISUALS & CORE INFO */}
            <div className="md:col-span-7 space-y-8">
              {/* IMAGE UPLOAD BOX */}
              <section className="group relative bg-neutral-900/50 border border-neutral-800 rounded-3xl p-2 transition-all hover:border-indigo-500/50">
                <label
                  className={`relative flex flex-col items-center justify-center w-full h-[400px] ${!PreviewImageUrl?"bg-neutral-950/50":null} rounded-[1.4rem] border-2 border-dashed border-neutral-800 group-hover:bg-indigo-500/5 transition-all cursor-pointer overflow-hidden`}
                  style={
                    PreviewImageUrl
                      ? {
                          backgroundImage: `url(${PreviewImageUrl})`,
                          backgroundSize:"contain",
                          backgroundRepeat:"no-repeat",
                          backgroundPosition: "center",
                        }
                      : {}
                  }
                >
                  <div className="z-10 flex flex-col items-center gap-4">
                    <div className="p-4 z-5 rounded-2xl bg-neutral-900 border border-neutral-800 group-hover:scale-110 group-hover:text-indigo-400 transition-all">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">
                        Drop your project preview
                      </p>
                      <p className="text-sm text-neutral-500">
                        PNG, JPG or WebP (Max 5MB)
                      </p>
                    </div>
                  </div>
                  <input
                    {...register("image")}
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      if (file) {
                        setPreviewImageUrl(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </section>

              {/* MAIN TEXT FIELDS */}
              <div className="grid grid-cols-1 gap-6 bg-neutral-900/30 p-8 rounded-3xl border border-neutral-800">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-neutral-500 ml-1">
                    Project Title
                  </label>
                  <input
                    {...register("title")}
                    type="text"
                    placeholder="e.g. Quantum Ledger AI"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-xl font-semibold focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-neutral-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-neutral-500 ml-1">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    rows={6}
                    placeholder="What is the problem? How does this solve it?"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-neutral-700 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: STATUS & DETAILS */}
            <div className="md:col-span-5 space-y-8">
              {/* PROGRESS SECTION */}
              <section className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold">Build Progress</h2>
                </div>

                <div className="space-y-6">
                  {[
                    { label: "UI / UX", color: "accent-indigo-500" },
                    { label: "Backend", color: "accent-emerald-500" },
                  ].map((item, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-neutral-400">{item.label}</span>
                        <span className="text-white">65%</span>
                      </div>
                      <input
                        {...register("range")}
                        type="range"
                        className={`w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer ${item.color}`}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* CATEGORY & SKILLS */}
              <section className="space-y-6">
                <div className="bg-neutral-900/30 border border-neutral-800 rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-lg font-bold">The Specs</h2>
                  </div>

                  <div className="space-y-4">
                    <select className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 font-medium appearance-none focus:ring-2 focus:ring-indigo-500 transition-all">
                      <option>SaaS Model</option>
                      <option>Open Source</option>
                      <option>Startup Prototype</option>
                    </select>

                    <div className="relative">
                      <input
                        {...register("requiredRoles")}
                        type="text"
                        placeholder="required role:frontend developer,backend developer"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 pr-12 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      />
                      <Plus className="absolute right-4 top-4 text-neutral-500 w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-900/30 border border-neutral-800 rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <HelpCircle className="w-5 h-5 text-amber-400" />
                    <h2 className="text-lg font-bold">
                      Why you left project in between?
                    </h2>
                  </div>
                  <textarea
                    {...register("reasonForLeavingProject")}
                    rows={3}
                    placeholder="e.g. Burnout, hit a technical wall, or moved to a new city..."
                    className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-neutral-700 italic"
                  />
                </div>
              </section>
            </div>

            {/* MOBILE ONLY SUBMIT */}
            <div className="md:hidden pt-8">
              <label htmlFor="submit">PUBLISH PROJECT</label>
              <input
                type="submit"
                name="submit"
                className="w-full py-5 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
