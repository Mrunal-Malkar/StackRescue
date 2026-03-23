"use client";

import React, { useState } from "react";
import Image from "next/image";
import Sidebar from "../../../components/sidebar";
import { InViewType } from "../../../type/types";
import { useSession } from "next-auth/react";
import SignInPage from "@/components/sign-in";
import Loader from "@/components/ui/Loader";

const Page = () => {
  const session=useSession();
  const [InView, setInView] = useState<InViewType>("Posted");
  
  if(session.status=="unauthenticated"){
    return <SignInPage/>;
  }else if (session.status=="loading"){
    return <div className="w-max h-screen flex justify-center items-center">
      <Loader/>
    </div>
  }

  return (
    <div className="w-full h-screen min-h-screen bg-neutral-950 text-white flex">
      <Sidebar />
      <div className="w-full h-screen min-h-screen bg-neutral-950 text-white flex flex-col sm:flex-row overflow-y-auto">
        {/* LEFT SIDE */}
        <div className="sm:w-[360px] w-full sm:h-full flex justify-center items-center p-6">
          {/* PROFILE CARD */}
          <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-5">
            {/* avatar + identity */}
            <div className="flex flex-col items-center text-center gap-3">
              <img
                src="/avatar.png"
                className="w-24 h-24 rounded-full object-cover border border-neutral-700"
              />

              <div>
                <h1 className="text-xl font-semibold tracking-tight">
                  Alex Carter
                </h1>

                <p className="text-sm text-neutral-400">Full-stack developer</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <span className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded-md">
                  React
                </span>
                <span className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded-md">
                  Node
                </span>
                <span className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded-md">
                  PostgreSQL
                </span>
              </div>
            </div>

            {/* short bio */}
            <p className="text-sm text-neutral-300 text-center leading-relaxed">
              I enjoy building small SaaS products and collaborating with
              developers who like shipping ideas quickly.
            </p>

            {/* actions */}
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-sm py-2 rounded-lg transition">
                Message
              </button>

              <button className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-sm py-2 rounded-lg border border-neutral-700 transition">
                View GitHub
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col gap-6 p-6 sm:justify-start">
          {/* about me */}
          <div className="flex flex-wrap gap-1 flex-col">
            <h1 className="text-2xl font-semibold text-gray-200 tracking-tight sm:text-3xl md:text-4xl">
              About{" "}
              <span className="text-blue-500 text-3xl md:text-5xl sm:text-4xl">
                ME
              </span>
            </h1>
            <p className="max-w-3xl sm:text-lg text-sm text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              debitis est fugit expedita dicta sed fugiat reiciendis accusamus
              cumque quasi blanditiis velit aspernatur neque magni asperiores,
              inventore reprehenderit. Officia, distinctio! Ad laborum dolorum
              soluta quisquam alias, vel ipsam recusandae, exercitationem quas
              explicabo corrupti et esse sunt reiciendis ea, molestias sint
              ducimus facere? Eos pariatur tempora harum expedita doloribus.
              Quo, hic.
            </p>
          </div>

          {/* STATS */}
          <div className="flex gap-6 flex-wrap">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 min-w-[150px]">
              <h2 className="text-xs text-neutral-400">Total Collaborations</h2>
              <p className="text-2xl font-semibold">4</p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 min-w-[150px]">
              <h2 className="text-xs text-neutral-400">Projects Posted</h2>
              <p className="text-2xl font-semibold">2</p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 min-w-[150px]">
              <h2 className="text-xs text-neutral-400">Projects Completed</h2>
              <p className="text-2xl font-semibold">1</p>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="flex gap-3 overflow-x-auto border-b border-neutral-800 pb-2 text-sm">
            <button
              onClick={() => setInView("Posted")}
              className={`${InView == "Posted" ? "text-blue-500" : "text-neutral-200"} hover:cursor-pointer`}
            >
              Projects Posted
            </button>

            <button
              onClick={() => setInView("Collaborated")}
              className={`${InView == "Collaborated" ? "text-blue-500" : "text-neutral-200"} hover:cursor-pointer`}
            >
              Projects Collaborated
            </button>

            <button
              onClick={() => setInView("Completed")}
              className={`${InView == "Completed" ? "text-blue-500" : "text-neutral-200"} hover:cursor-pointer`}
            >
              Completed
            </button>
          </div>

          {/* PROJECT LIST AREA */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {/* example project card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-blue-400">AI Resume Builder</h3>

              <p className="text-sm text-neutral-400 line-clamp-2">
                A tool that generates developer resumes using AI templates.
              </p>

              <div className="flex flex-wrap gap-1 text-xs mt-2">
                <span className="px-2 py-1 bg-neutral-800 rounded">
                  Next.js
                </span>
                <span className="px-2 py-1 bg-neutral-800 rounded">Prisma</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
