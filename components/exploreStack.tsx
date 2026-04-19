"use client";
import { GeneralStackType } from "@/type/types";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Loader from "./ui/Loader";
import { toast, ToastContainer } from "react-toastify";
import StackModal from "./stackModal";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const ExploreStack = () => {
  const [currentStack, setCurrentStack] = useState<GeneralStackType>();
  const [ShowStackModal, setShowStackModal] = useState<boolean>(false);
  const router = useRouter();
  const {
    data: stacks,
    error,
    isLoading,
  } = useQuery<GeneralStackType[]>({
    queryKey: ["stack-card"],
    queryFn: async () => {
      const res = await fetch("api/get/stacks", { method: "GET" });
      const resJson = await res.json();
      if (!res.ok || !resJson) {
        toast.error("unable to fetch stacks");
        throw new Error(
          resJson.message ? resJson.message : "Unable to fetch stacks.",
        );
      }
      const stacks: GeneralStackType[] = resJson.stacks;
      return stacks;
    },
  });
  const session = useSession();

  function showStack(stack: GeneralStackType) {
    setCurrentStack(stack);
    setShowStackModal(true);
  }

  if (session.status == "loading" || isLoading) {
    return (
      <div className="min-w-full min-h-full bg-gray-800 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (session.status == "unauthenticated" || error) {
    if (session.status == "unauthenticated") {
      toast.info("login to see full stack details");
    } else if (error) {
      toast.error("error in getting stacks.");
    }
  }

  if (stacks && stacks.length < 1 && !error && !isLoading) {
    return (
      <div className="min-w-full min-h-full bg-gray-800 flex justify-center items-center">
        <p
          className="text-center text-gray-300 hover:cursor-pointer"
          onClick={() => router.push("/create/project")}
        >
          No Stacks, Create One!
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex juistify-center items-center">
        <p className="text-center flex justify-center items-center w-full h-full text-red-700">
          {error && error.message ? error.message : " Some error, occured."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto text-black p-2 sm:p-6 justify-around gap-6 gap-y-16  flex flex-wrap">
      {/* stack cards */}
      {stacks &&
        stacks.map((item, i) => {
          return (
            <div
              key={i}
              onClick={() => showStack(item)}
              className="group flex flex-col justify-between p-4 md:w-1/2 min-h-1/3 h-fit bg-neutral-900 hover:bg-neutral-950 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-200 cursor-pointer"
            >
              {/* Title */}
              <div className="flex flex-col gap-2">
                <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-blue-400 group-hover:text-blue-300 transition">
                  {item.title}
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base text-neutral-300 line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Attributes */}
              <div className="flex flex-wrap gap-2 mt-4">
              {item.categories.map((attribute, i) => {
                return (
                    <div key={i} className="flex items-center gap-1 px-2 py-1 text-xs sm:text-sm rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">
                      {" "}
                      <span className="text-neutral-400">category</span>
                      <span className="text-neutral-200">{attribute}</span>
                    </div>
                );
              })}
              </div>

              {/* Footer */}
              <div
                onClick={() => showStack(item)}
                className="flex justify-between items-center mt-4 pt-3 border-t border-neutral-800 text-xs text-neutral-500 group-hover:text-neutral-300 transition"
              >
                <span>View stack</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          );
        })}

      {/* stack modal */}
      <StackModal
        stack={currentStack}
        isOpen={ShowStackModal}
        onClose={() => setShowStackModal(false)}
      />

      {/* explore footer  */}
      <ExploreFooter />
    </div>
  );
};

const ExploreFooter = () => {
  const router=useRouter();
  return (
    <footer className="w-full py-4 from-gray-700 to-blue-800 mt-6 bg-linear-to-t pb-12 rounded-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="w-full flex-col my-6 flex items-center justify-center">
            <Image
      onClick={()=>router.push("/")}
              alt="halfstack logo"
              src="/StackRescue_trans_logo.png"
              className="self-center"
              height={80}
              width={210}
            />
            
          <div className="w-4xl text-white h-0.5 rounded-2xl bg-gray-300 my-2"></div>
          </div>
          {/* <ul className="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-14 mb-10 border-b border-gray-200">
            <li>
              <a href="#" className="text-white/70 hover:text-gray-900">
                Pagedone
              </a>
            </li>
            <li>
              <a href="#" className=" text-white/70 hover:text-gray-900">
                Products
              </a>
            </li>
            <li>
              <a href="#" className=" text-white/70 hover:text-gray-900">
                Resources
              </a>
            </li>
            <li>
              <a href="#" className=" text-white/70 hover:text-gray-900">
                Blogs
              </a>
            </li>
            <li>
              <a href="#" className=" text-white/70 hover:text-gray-900">
                Support
              </a>
            </li>
          </ul> */}
          <div className="flex space-x-10 justify-center items-center mb-14">
            <a
              href="https://x.com/Mrunal_Malkar"
              className="block  text-white transition-all duration-500 hover:text-indigo-600 "
            >
              <svg
                className="w-[1.688rem] h-[1.688rem]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M11.3214 8.93666L16.4919 3.05566H15.2667L10.7772 8.16205L7.1914 3.05566H3.05566L8.47803 10.7774L3.05566 16.9446H4.28097L9.022 11.552L12.8088 16.9446H16.9446L11.3211 8.93666H11.3214ZM9.64322 10.8455L9.09382 10.0765L4.72246 3.95821H6.60445L10.1322 8.8959L10.6816 9.66481L15.2672 16.083H13.3852L9.64322 10.8458V10.8455Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a href="https://github.com/Mrunal-Malkar/StackRescue" className="block text-white transition-all duration-500 hover:text-indigo-600 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github-icon lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4 " />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/mrunal-malkar/" className="block text-white transition-all duration-500 hover:text-indigo-600 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin-icon lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
          <span className="text-lg text-blue-100 text-center block">
            ©<a href="">StackRescue</a> 2026, All rights reserved.
          </span>
        </div>
      </div>
      <ToastContainer />
    </footer>
  );
};
