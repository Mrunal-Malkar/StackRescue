"use client";

import React, { useState } from "react";
import Sidebar from "../../../components/sidebar";
import { InViewType } from "../../../type/types";
import { useSession } from "next-auth/react";
import SignInPage from "@/components/sign-in";
import Loader from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
import {
  LucideChartNoAxesColumnDecreasing,
  Plus,
  ScanLine,
  Undo2,
} from "lucide-react";
import ProfileModal from "@/components/profileModal";
import { useRouter } from "next/navigation";

type ProfileData = {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  stats: {
    collaborations: number;
    posted: number;
    completed: number;
  };
};

async function fetchData(): Promise<ProfileData | 404> {
  const res = await fetch("/api/get/profiledata", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile data");
  }

  const data = await res.json();

  if (data.status === 404) {
    return 404;
  } else if (data.status === 200) {
    return data.data as ProfileData;
  }

  throw new Error("Unexpected response from server");
}

const Page = () => {
  const { data: session, status } = useSession();
  const [profileModal, setProfileModal] = useState(false);
  const [InView, setInView] = useState<InViewType>("Posted");
  const router = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: ["profileData"],
    queryFn: fetchData,
    enabled: status === "authenticated",
  });

  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <SignInPage />;
  }

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen relative h-screen flex flex-col justify-center items-center gap-2">
        <div
          className="absolute top-15 left-18 cursor-pointer"
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
            } else {
              router.push("/");
            }
          }}
        >
          <Undo2 className="text-white size-8 cursor-pointer" />
        </div>
        <div>
          <LucideChartNoAxesColumnDecreasing className="size-6" />
          <p className="text-gray-400 font-semibold">
            Some error occurred, please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (data === 404) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-3 bg-gray-950">
        <div
          className="absolute top-15 left-18 cursor-pointer"
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
            } else {
              router.push("/");
            }
          }}
        >
          <Undo2 className="text-white size-8 cursor-pointer" />
        </div>

        <div className="flex flex-col justify-center items-center gap-3">
          <ScanLine className="size-8 text-white" />
          <p className="text-gray-400 font-semibold">No profile found.</p>
          <button
            onClick={() => setProfileModal(true)}
            className="px-4 py-2 text-gray-200 rounded-md bg-gray-800 flex justify-center items-center gap-1"
          >
            <p>Create One.</p>
            <Plus className="size-4" />
          </button>
          <ProfileModal
            isOpen={profileModal}
            onClose={() => setProfileModal(false)}
          />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-gray-400">No data available.</p>
      </div>
    );
  }

  return (
    <div className="w-full relative h-screen min-h-screen bg-neutral-950 text-white flex">
      <Sidebar />
      <div className="w-full h-screen min-h-screen bg-neutral-950 text-white flex flex-col sm:flex-row overflow-y-auto">
        {/* LEFT SIDE */}
        <div className="sm:w-[360px] w-full sm:h-full flex justify-center items-center p-6">
          <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-5">
            <div className="flex flex-col items-center text-center gap-3">
              <img
                src="/avatar.png"
                className="w-24 h-24 rounded-full object-cover border border-neutral-700"
                alt="avatar"
              />
              <div>
                <h1 className="text-xl font-semibold tracking-tight">
                  {data.name}
                </h1>
                <p className="text-sm text-neutral-400">{data.role}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm text-neutral-300 text-center leading-relaxed">
              {data.bio}
            </p>

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
          <div className="flex flex-wrap gap-1 flex-col">
            <h1 className="text-2xl font-semibold text-gray-200 tracking-tight sm:text-3xl md:text-4xl">
              About{" "}
              <span className="text-blue-500 text-3xl md:text-5xl sm:text-4xl">
                ME
              </span>
            </h1>
            <p className="max-w-3xl sm:text-lg text-sm text-gray-300">
              {data.bio}
            </p>
          </div>

          {/* STATS */}
          <div className="flex gap-6 flex-wrap">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 min-w-[150px]">
              <h2 className="text-xs text-neutral-400">Total Collaborations</h2>
              <p className="text-2xl font-semibold">
                {data.stats.collaborations}
              </p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 min-w-[150px]">
              <h2 className="text-xs text-neutral-400">Projects Posted</h2>
              <p className="text-2xl font-semibold">{data.stats.posted}</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 min-w-[150px]">
              <h2 className="text-xs text-neutral-400">Projects Completed</h2>
              <p className="text-2xl font-semibold">{data.stats.completed}</p>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="flex gap-3 overflow-x-auto border-b border-neutral-800 pb-2 text-sm">
            {(["Posted", "Collaborated", "Completed"] as InViewType[]).map(
              (view) => (
                <button
                  key={view}
                  onClick={() => setInView(view)}
                  className={`${InView === view ? "text-blue-500" : "text-neutral-200"} hover:cursor-pointer`}
                >
                  {view === "Posted"
                    ? "Projects Posted"
                    : view === "Collaborated"
                      ? "Projects Collaborated"
                      : "Completed"}
                </button>
              ),
            )}
          </div>

          {/* PROJECT LIST AREA */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <ProfileModal
        isOpen={profileModal}
        onClose={() => setProfileModal(false)}
      />
    </div>
  );
};

export default Page;
