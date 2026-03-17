import Sidebar from '@/components/sidebar';
import { Lightbulb, Image as ImageIcon, Hash, Cpu, Sparkles, Send, Plus, ArrowUpRight } from 'lucide-react';

const Idea=()=>{  return (
    <div className='w-screen h-screen flex'>
        <Sidebar/>
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
              Pitch Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Vision.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              Don&apos;t let a great concept die in your notes. Share the blueprint, find your co-founders, and start building.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-3 px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            LAUNCH CONCEPT <ArrowUpRight className="w-5 h-5" />
          </button>
        </header>

        <form className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: THE CONCEPTUAL CORE */}
          <div className="md:col-span-8 space-y-10">
            
            {/* LARGE TITLE INPUT */}
            <div className="relative group">
              <label className="absolute -top-3 left-6 px-2 bg-[#020617] text-cyan-500 text-xs font-bold tracking-widest z-10">IDEA TITLE</label>
              <input 
                type="text" 
                placeholder="The 'Uber' for Open Source Maintenance..."
                className="w-full bg-transparent border-2 border-slate-800 rounded-3xl p-8 text-3xl md:text-4xl font-bold text-white focus:border-cyan-500 outline-none transition-all placeholder:text-slate-800"
              />
            </div>

            {/* DESCRIPTION BOX */}
            <div className="relative group">
              <label className="absolute -top-3 left-6 px-2 bg-[#020617] text-purple-500 text-xs font-bold tracking-widest z-10">THE MANIFESTO</label>
              <textarea 
                rows={10} 
                placeholder="Describe the spark, the problem, and the dream..."
                className="w-full bg-slate-900/20 backdrop-blur-sm border-2 border-slate-800 rounded-[2rem] p-8 text-lg leading-relaxed focus:border-purple-500 outline-none transition-all placeholder:text-slate-800 resize-none"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: ASSETS & STACK */}
          <div className="md:col-span-4 space-y-8">
            
            {/* VISUAL ASSET UPLOAD */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-6 space-y-4">
               <div className="flex items-center gap-3 text-slate-400 px-2">
                <ImageIcon className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Concept Art / UI</span>
              </div>
              <label className="flex flex-col items-center justify-center w-full h-64 bg-slate-950/50 rounded-[2rem] border-2 border-dashed border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all cursor-pointer group">
                <div className="p-4 rounded-full bg-slate-900 group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6 text-cyan-500" />
                </div>
                <p className="mt-4 text-xs font-medium text-slate-500">Upload a moodboard or wireframe</p>
                <input type="file" className="hidden" />
              </label>
            </div>

            {/* TAGS SECTION */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 space-y-6">
              <div className="flex items-center gap-3 text-slate-400">
                <Hash className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Categories</span>
              </div>
              <input 
                type="text" 
                placeholder="Press enter to add..."
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-4 focus:border-cyan-500 outline-none transition-all"
              />
              <div className="flex flex-wrap gap-2">
                {['Fintech', 'AI', 'Social'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-bold">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* REQUIRED SKILLS */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-[2.5rem] p-8 space-y-6 shadow-2xl">
              <div className="flex items-center gap-3 text-purple-400">
                <Cpu className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Dream Team Skills</span>
              </div>
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Who do you need? (e.g. Three.js Wizard)"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-4 focus:border-purple-500 outline-none transition-all"
                />
                <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
                  <p className="text-xs text-slate-500 leading-relaxed italic">
                    Tip: Be specific about the technical challenges to attract the right contributors.
                  </p>
                </div>
              </div>
            </div>

            {/* MOBILE ONLY SUBMIT */}
            <button className="md:hidden w-full py-6 bg-cyan-500 text-black font-black rounded-[2rem] flex items-center justify-center gap-3">
              LAUNCH IDEA <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>

    </div>

)
}

export default Idea;