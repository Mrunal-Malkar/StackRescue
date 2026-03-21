import Sidebar from "@/components/sidebar";
import { ToastProvider } from "@base-ui/react";
import {
  Image as ImageIcon,
  Hash,
  Cpu,
  Sparkles,
  Send,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const Idea = () => {
  type Input = {
    title: string;
    description: string;
    image: FileList;
    categories: string[];
    roles: string[];
  };

  const acceptedTypes=["image/png","image/jpeg","image/jpg"]
  const [roleInput, setRoleInput] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [PreviewImageUrl, setPreviewImageUrl] = useState<string>("");
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const{ref,onChange,...rest}=register("image",{
  validate:{
    isFile:(files)=>files.length>0 && files.length<2 || "file is required or too many files",
    isJpegPng:(files)=>acceptedTypes.includes(files[0]?.type) || "file type not accepted",
    maxSize:  (files)=>files[0]?.size<3_097_152 || "max size 3MB"
  }  
  })

  const onSubmit: SubmitHandler<Input> = (data) => {
    const allData = { ...data, categories, roles };
    postIdea(allData)  
};

  async function postIdea(data:Input){
    const formData=new FormData();
    formData.append("title",data.title);
    formData.append("description",data.description); 
    formData.append("image",data.image[0]);
    formData.append("categories",JSON.stringify(data.categories));
    formData.append("roles",JSON.stringify(data.roles));

    const req=await fetch("/api/create/idea",{
      method:"POST",
      body:formData
    })
    const response = await req.json();
    if(req.status==200){
      toast.success(response.message);
      console.log(response);
    }else{
      console.log(response)
      toast.error(response.message);
    }
  }

  function handleAddRole(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();

      if (roleInput.trim() && !roles.includes(roleInput.trim())) {
        setRoles([...roles, roleInput.trim()]);
        setRoleInput("");
      }
    }
  }

  function handleAddCategory(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (categoryInput.trim() && !categories.includes(categoryInput.trim())) {
        setCategories([...categories, categoryInput.trim()]);
        setCategoryInput("");
      }
    }
  }

  return (
    <div className="w-screen h-screen flex">
      <ToastContainer/>
      <Sidebar />
      <div className="w-full min-h-screen overflow-y-auto bg-[#020617] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans antialiased">
        {/* AMBIENT BACKGROUND ELEMENTS */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-cyan-600/10 blur-[140px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-purple-600/10 blur-[140px] rounded-full" />
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
        </div>

        <div className="relative w-full max-w-[1400px] mx-auto px-6 py-12">
          {/* HEADER AREA */}
          <header className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8 border-l-4 border-cyan-500 pl-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-[0.3em]">
                <Sparkles className="w-4 h-4" />
                Idea Lab
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                Pitch Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  Vision.
                </span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
                Don&apos;t let a great concept die in your notes. Share the
                blueprint, find your co-founders, and start building.
              </p>
            </div>
            <button
              type="submit"
              form="idea-form"
              className="hidden md:flex items-center gap-3 px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
            >
              LAUNCH CONCEPT <ArrowUpRight className="w-5 h-5" />
            </button>
          </header>

          <form
            id="idea-form"
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-12 gap-10"
          >
            <input type="hidden" {...register("categories", { validate: () => categories.length > 0 || "At least one category is required" })} />
            <input type="hidden" {...register("roles", { validate: () => roles.length > 0 || "At least one role is required" })} />
            {/* LEFT COLUMN: THE CONCEPTUAL CORE */}
            <div className="md:col-span-8 space-y-10">
              {/* LARGE TITLE INPUT */}
              <div className="relative group">
                <label className="absolute -top-3 left-6 px-2 bg-[#020617] text-cyan-500 text-xs font-bold tracking-widest z-10">
                  IDEA TITLE
                </label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  placeholder="The 'Uber' for Open Source Maintenance..."
                  className="w-full bg-transparent border-2 border-slate-800 rounded-3xl p-8 text-3xl md:text-4xl font-bold text-white focus:border-cyan-500 outline-none transition-all placeholder:text-slate-800"
                />
                {errors.title && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.title.message?.toString()}
                  </p>
                )}
              </div>

              {/* DESCRIPTION BOX */}
              <div className="relative group">
                <label className="absolute -top-3 left-6 px-2 bg-[#020617] text-purple-500 text-xs font-bold tracking-widest z-10">
                  THE MANIFESTO
                </label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  rows={10}
                  placeholder="Describe the spark, the problem, and the dream..."
                  className="w-full bg-slate-900/20 backdrop-blur-sm border-2 border-slate-800 rounded-[2rem] p-8 text-lg leading-relaxed focus:border-purple-500 outline-none transition-all placeholder:text-slate-800 resize-none"
                />
                {errors.description && (
                  <p className="text-sm text-red-400 mt-1">
                    {errors.description.message?.toString()}
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: ASSETS & STACK */}
            <div className="md:col-span-4 space-y-8">
              {/* VISUAL ASSET UPLOAD */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-6 space-y-4">
                <div className="flex items-center gap-3 text-slate-400 px-2">
                  <ImageIcon className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    Concept Art / UI
                  </span>
                </div>
                <label
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
                  className="flex flex-col items-center justify-center w-full h-64 bg-slate-950/50 rounded-[2rem] border-2 border-dashed border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all cursor-pointer group"
                >
                  <div className="p-4 rounded-full bg-slate-900 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6 text-cyan-500" />
                  </div>
                  <p className="mt-4 text-xs font-medium text-slate-500">
                    you can generate image from llm and upload it here.
                  </p>
                  <input
                    type="file"
                     accept=".png,.jpg,.jpeg"
                    ref={ref}
                    {...rest}
                    onChange={(e) => {
                      onChange(e);
                      const file = e.target.files ? e.target.files[0] : null;
                      if (file) {
                        setPreviewImageUrl(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden"
                  />
                  {errors.image && (
                    <p className="text-sm text-red-400 mt-1">
                      {errors.image.message?.toString()}
                    </p>
                  )}
                </label>
              </div>

              {/* TAGS SECTION */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 space-y-6">
                <div className="flex items-center gap-3 text-slate-400">
                  <Hash className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    Categories
                  </span>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex flex-wrap gap-2">
                  {categories.map((category, i) => (
                    <span
                      key={i}
                      className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-lg text-sm flex items-center gap-2"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() =>
                          setCategories(
                            categories.filter((_, idx) => idx !== i),
                          )
                        }
                        className="text-red-400"
                      >
                        ✕
                      </button>
                    </span>
                  ))}

                  <input
                    type="text"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    onKeyDown={handleAddCategory}
                    placeholder="Add category and press Enter"
                    className="flex-1 bg-transparent outline-none text-sm p-2"
                  />
                </div>
                <div className="flex flex-wrap gap-2 items-center justify-start">
                  ex:-
                  {["Fintech", "AI", "Social"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-bold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                {errors.categories && (
                  <p className="text-sm text-red-400 mt-2">
                    {errors.categories.message?.toString()}
                  </p>
                )}
              </div>

              {/* REQUIRED SKILLS */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-[2.5rem] p-8 space-y-6 shadow-2xl">
                <div className="flex items-center gap-3 text-purple-400">
                  <Cpu className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    Dream Team Skills
                  </span>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex flex-wrap gap-2">
                  {roles.map((role, i) => (
                    <span
                      key={i}
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
                    type="text"
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    onKeyDown={handleAddRole}
                    placeholder="Add roles and press Enter"
                    className="flex-1 bg-transparent outline-none text-sm p-2"
                  />
                </div>
                {errors.roles && (
                  <p className="text-sm text-red-400 mt-2">
                    {errors.roles.message?.toString()}
                  </p>
                )}
              </div>

              {/* MOBILE ONLY SUBMIT */}
              <button
                type="submit"
                className="md:hidden w-full py-6 bg-cyan-500 text-black font-black rounded-[2rem] flex items-center justify-center gap-3"
              >
                LAUNCH IDEA <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Idea;
