"use client"
import Sidebar from "@/components/sidebar";
import { error } from "console";
import {
  HelpCircle,
  Layers,
  Plus,
  Rocket,
  Target,
  UploadCloud,
} from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

type Input = {
  title: string;
  description: string;
  uiuxProgress: number;
  backendProgress: number;
  requiredRoles: string;
  reasonForLeavingProject: string;
  image: FileList;
  catagories: string[];
  projectType: string;
  roles: string[];
};

export default function CreateProjectPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      uiuxProgress: 0,
      backendProgress: 0,
      catagories: [],
      roles: [],
    },
  });

  const acceptedTypes = ["image/png", "image/jpg", "image/jpeg"];
  const [PreviewImageUrl, setPreviewImageUrl] = useState<string>("");
  const [roleInput, setRoleInput] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [catagoryInput, setCatagoryInput] = useState("");
  const [catagories, setCatagories] = useState<string[]>([]);
  const uiuxProgress = watch("uiuxProgress");
  const backendProgress = watch("backendProgress");

  const { ref, onChange, ...rest } = register("image", {
    required: "Image is required",
    validate: {
      isFile: (files) =>
        (files.length > 0 && files.length < 2) ||
        "file is required or too many files",
      isJpgPng: (files) =>
        acceptedTypes.includes(files[0]?.type) ||
        "Only JPG/PNG images are allowed",
      maxSize: (files) =>
        files[0]?.size <= 3 * 1024 * 1024 || "Max file size is 3MB",
    },
  });

  function handleAddRole(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const newRole = roleInput.trim();
      if (newRole && !roles.includes(newRole)) {
        setRoles([...roles, newRole]);
        setRoleInput("");
      }
    }
  }

  function handleAddCatagory(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const newCat = catagoryInput.trim();
      if (newCat && !catagories.includes(newCat)) {
        setCatagories([...catagories, newCat]);
        setCatagoryInput("");
      }
    }
  }

  async function postProject(formData:Input){
    console.log("thjis is the form",formData)
    const form=new FormData();
    form.append("title",formData.title);
    form.append("description",formData.description);
    form.append("image",formData.image[0]);
    form.append("categories",JSON.stringify(formData.catagories));
    form.append("roles",JSON.stringify(formData.roles));
    form.append("uiuxProgress",formData.uiuxProgress.toString());
    form.append("backendProgress",formData.backendProgress.toString());
    form.append("projectType",formData.projectType);
    form.append("reasonForLeavingProject",formData.reasonForLeavingProject);
    console.log("this is the form at frontend before sending to backend",form);
    const req=await fetch("/api/create/project",{
      method:"POST",
      body:form
    })
    const response = await req.json();
    if(req.status==200){
      toast.success(response.message);
      console.log(response);
      return true;
    }else{
      console.log(response)
      toast.error(response.message);
      return false;
    }
  }

  const onSubmit: SubmitHandler<Input> = async (data) => {
    if (catagories.length < 1) {
      toast.error("Please add at least one category.");
      return;
    }
    if (roles.length < 1) {
      toast.error("Please add at least one role.");
      return;
    }if(uiuxProgress==0 || backendProgress==0){
      toast.error("Please fill the ui/ux & backend progress bar");
      return;
    }

    const formData = { ...data, roles, catagories };
    console.log("Form data at Project", formData);

    await postProject(formData)
      .then(() => {
        reset();
        setPreviewImageUrl("");
        setRoles([]);
        setCatagories([]);
        setRoleInput("");
        setCatagoryInput("");
      })
      .catch(() => toast.error("Failed to create project"));
  };

  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
<ToastContainer/>
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
              <button
                type="submit"
                form="project-form"
                className="group relative px-8 py-4 bg-linear-to-br from-blue-500 to-indigo-600 text-white/80 hover:cursor-pointer font-bold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Publish Project
                </span>
              </button>
            </div>
          </header>

          <form
            id="project-form"
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* LEFT COLUMN: VISUALS & CORE INFO */}
            <div className="md:col-span-7 space-y-8">
              {/* IMAGE UPLOAD BOX */}
              <section className="group relative bg-neutral-900/50 border border-neutral-800 rounded-3xl p-2 transition-all hover:border-indigo-500/50">
                <label
                  className={`relative flex flex-col items-center justify-center w-full h-[400px] ${!PreviewImageUrl ? "bg-neutral-950/50" : null} rounded-[1.4rem] border-2 border-dashed border-neutral-800 group-hover:bg-indigo-500/5 transition-all cursor-pointer overflow-hidden`}
                  style={
                    PreviewImageUrl
                      ? {
                          backgroundImage: `url(${PreviewImageUrl})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
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
                    ref={ref}
                    {...rest}
                    type="file"
                    accept=".png,.jpg,jpeg"
                    onChange={(e) => {
                      onChange(e);
                      const file = e.target.files ? e.target.files[0] : null;
                      console.log("selected file type", file?.type);
                      if (file) {
                        setPreviewImageUrl(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden"
                  />
                  {errors.image && (
                    <p className="text-sm text-red-400 mt-2">
                      {errors.image.message?.toString()}
                    </p>
                  )}
                </label>
              </section>

              {/* MAIN TEXT FIELDS */}
              <div className="grid grid-cols-1 gap-6 bg-neutral-900/30 p-8 rounded-3xl border border-neutral-800">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-neutral-500 ml-1">
                    Project Title
                  </label>
                  <input
                    {...register("title", { required: "Title is required" })}
                    type="text"
                    placeholder="e.g. Quantum Ledger AI"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-xl font-semibold focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-neutral-700"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-400 mt-1">
                      {errors.title.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-neutral-500 ml-1">
                    Description
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    rows={6}
                    placeholder="What is the problem? How does this solve it?"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-neutral-700 resize-none"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-400 mt-1">
                      {errors.description.message?.toString()}
                    </p>
                  )}
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
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-neutral-400">UI / UX</span>
                      <span className="text-white">{uiuxProgress}%</span>
                    </div>
                    <input
                      {...register("uiuxProgress", {
                        required: "UI/UX progress is required",
                        valueAsNumber: true
                      })}
                      type="range"
                      min={0}
                      max={100}
                      className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    {errors.uiuxProgress && (
                      <p className="text-sm text-red-400 mt-1">
                        {errors.uiuxProgress.message?.toString()}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-neutral-400">Backend</span>
                      <span className="text-white">{backendProgress}%</span>
                    </div>
                    <input
                      {...register("backendProgress", {
                        required: "Backend progress is required",
                        valueAsNumber: true
                      })}
                      type="range"
                      min={0}
                      max={100}
                      className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    {errors.backendProgress && (
                      <p className="text-sm text-red-400 mt-1">
                        {errors.backendProgress.message?.toString()}
                      </p>
                    )}
                  </div>
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
                    <select
                      {...register("projectType", {
                        required: "Project type is required",
                      })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 font-medium appearance-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    >
                      <option>SaaS Model</option>
                      <option>Open Source</option>
                      <option>Startup Prototype</option>
                    </select>
                    {errors.projectType && (
                      <p className="text-sm text-red-400 mt-1">
                        {errors.projectType.message?.toString()}
                      </p>
                    )}

                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex flex-wrap gap-2">
                      {catagories.map((cat, i) => (
                        <span
                          key={`cat-${i}`}
                          className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-lg text-sm flex items-center gap-2"
                        >
                          {cat}
                          <button
                            type="button"
                            onClick={() =>
                              setCatagories(
                                catagories.filter((_, idx) => idx !== i),
                              )
                            }
                            className="text-red-400"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                      <input
                        value={catagoryInput}
                        onChange={(e) => setCatagoryInput(e.target.value)}
                        onKeyDown={handleAddCatagory}
                        placeholder="Add category and press Enter"
                        className="flex-1 bg-transparent outline-none text-sm p-2"
                      />
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex flex-wrap gap-2">
                      {roles.map((role, i) => (
                        <span
                          key={`role-${i}`}
                          className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-lg text-sm flex items-center gap-2"
                        >
                          {role}
                          <button
                            type="button"
                            onClick={() =>
                              setRoles(roles.filter((_, idx) => idx !== i))
                            }
                            className="text-red-400"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                      <input
                        value={roleInput}
                        onChange={(e) => setRoleInput(e.target.value)}
                        onKeyDown={handleAddRole}
                        placeholder="Add role and press Enter"
                        className="flex-1 bg-transparent outline-none text-sm p-2"
                      />
                    </div>

                    {/* <div className="relative">
                      <input
                        {...register("requiredRoles", { required: "Required roles is required" })}
                        type="text"
                        placeholder="required role:frontend developer,backend developer"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 pr-12 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      />
                      <Plus className="absolute right-4 top-4 text-neutral-500 w-5 h-5" />
                      {errors.requiredRoles && (
                        <p className="text-sm text-red-400 mt-1">
                          {errors.requiredRoles.message?.toString()}
                        </p>
                      )}
                    </div> */}
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
                    {...register("reasonForLeavingProject", {
                      required: "Reason is required",
                    })}
                    rows={3}
                    placeholder="e.g. Burnout, hit a technical wall, or moved to a new city..."
                    className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-neutral-700 italic"
                  />
                  {errors.reasonForLeavingProject && (
                    <p className="text-sm text-red-400 mt-1">
                      {errors.reasonForLeavingProject.message?.toString()}
                    </p>
                  )}
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
