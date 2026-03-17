"use client";
import { StackCardType } from "@/lib/types";
import { X } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";

export const ExploreStack = () => {
  const [currentStack, setCurrentStack] = useState<StackCardType>();
  const [ShowStackModal, setShowStackModal] = useState<boolean>(false);

  const stacks: Array<StackCardType> = [
    {
      title: "Project Title goes here",
      description:
        "lskdjfaldkfjal;dskfjasldkfja dslfjkasdfkdsfl adlkjasf kadfkjasldf kasaldkfj saldkfj asladkf jasdfhjasldek; ajsdfaj sdalfjk asldf ajkdsf jkadsfkasdf jal;sdf jkalsdjf l;sakdjf l;asdkjf a;lsdfj als;dkjf a;lsdj fal;sdkfjalsd falsdf jkasdf jalsdkfj asl",
      attributes: [
        {
          label: "stack type",
          value: "idea",
        },
        {
          label: "role",
          value: "frontend dev",
        },
        {
          label: "stage",
          value: "pre-production",
        },
      ],
    },
    {
      title: "Project Title goes here",
      description:
        "lskdjfaldkfjal;dskfjasldkfja dslfjkasdfkdsfl adlkjasf kadfkjasldf kasaldkfj saldkfj asladkf jasdfhjasldek; ajsdfaj sdalfjk asldf ajkdsf jkadsfkasdf jal;sdf jkalsdjf l;sakdjf l;asdkjf a;lsdfj als;dkjf a;lsdj fal;sdkfjalsd falsdf jkasdf jalsdkfj asl",
      attributes: [
        {
          label: "stack type",
          value: "idea",
        },
        {
          label: "role",
          value: "frontend dev",
        },
        {
          label: "stage",
          value: "pre-production",
        },
      ],
    },
    {
      title: "Project Title goes here",
      description:
        "lskdjfaldkfjal;dskfjasldkfja dslfjkasdfkdsfl adlkjasf kadfkjasldf kasaldkfj saldkfj asladkf jasdfhjasldek; ajsdfaj sdalfjk asldf ajkdsf jkadsfkasdf jal;sdf jkalsdjf l;sakdjf l;asdkjf a;lsdfj als;dkjf a;lsdj fal;sdkfjalsd falsdf jkasdf jalsdkfj asl",
      attributes: [
        {
          label: "stack type",
          value: "idea",
        },
        {
          label: "role",
          value: "frontend dev",
        },
        {
          label: "stage",
          value: "pre-production",
        },
      ],
    },
    {
      title: "Project Title goes here",
      description:
        "lskdjfaldkfjal;dskfjasldkfja dslfjkasdfkdsfl adlkjasf kadfkjasldf kasaldkfj saldkfj asladkf jasdfhjasldek; ajsdfaj sdalfjk asldf ajkdsf jkadsfkasdf jal;sdf jkalsdjf l;sakdjf l;asdkjf a;lsdfj als;dkjf a;lsdj fal;sdkfjalsd falsdf jkasdf jalsdkfj asl",
      attributes: [
        {
          label: "stack type",
          value: "idea",
        },
        {
          label: "role",
          value: "frontend dev",
        },
        {
          label: "stage",
          value: "pre-production",
        },
      ],
    },
    {
      title: "Project Title goes here",
      description:
        "lskdjfaldkfjal;dskfjasldkfja dslfjkasdfkdsfl adlkjasf kadfkjasldf kasaldkfj saldkfj asladkf jasdfhjasldek; ajsdfaj sdalfjk asldf ajkdsf jkadsfkasdf jal;sdf jkalsdjf l;sakdjf l;asdkjf a;lsdfj als;dkjf a;lsdj fal;sdkfjalsd falsdf jkasdf jalsdkfj asl",
      attributes: [
        {
          label: "stack type",
          value: "idea",
        },
        {
          label: "role",
          value: "frontend dev",
        },
        {
          label: "stage",
          value: "pre-production",
        },
      ],
    },
    {
      title: "Project Title goes here",
      description:
        "lskdjfaldkfjal;dskfjasldkfja dslfjkasdfkdsfl adlkjasf kadfkjasldf kasaldkfj saldkfj asladkf jasdfhjasldek; ajsdfaj sdalfjk asldf ajkdsf jkadsfkasdf jal;sdf jkalsdjf l;sakdjf l;asdkjf a;lsdfj als;dkjf a;lsdj fal;sdkfjalsd falsdf jkasdf jalsdkfj asl",
      attributes: [
        {
          label: "stack type",
          value: "idea",
        },
        {
          label: "role",
          value: "frontend dev",
        },
        {
          label: "stage",
          value: "pre-production",
        },
      ],
    },
    {
      title: "Project Title goes here",
      description:
        "lskdjfaldkfjal;dskfjasldkfja dslfjkasdfkdsfl adlkjasf kadfkjasldf kasaldkfj saldkfj asladkf jasdfhjasldek; ajsdfaj sdalfjk asldf ajkdsf jkadsfkasdf jal;sdf jkalsdjf l;sakdjf l;asdkjf a;lsdfj als;dkjf a;lsdj fal;sdkfjalsd falsdf jkasdf jalsdkfj asl",
      attributes: [
        {
          label: "stack type",
          value: "idea",
        },
        {
          label: "role",
          value: "frontend dev",
        },
        {
          label: "stage",
          value: "pre-production",
        },
      ],
    },
    {
      title: "Project Title goes here",
      description:
        "lskdjfaldkfjal;dskfjasldkfja dslfjkasdfkdsfl adlkjasf kadfkjasldf kasaldkfj saldkfj asladkf jasdfhjasldek; ajsdfaj sdalfjk asldf ajkdsf jkadsfkasdf jal;sdf jkalsdjf l;sakdjf l;asdkjf a;lsdfj als;dkjf a;lsdj fal;sdkfjalsd falsdf jkasdf jalsdkfj asl",
      attributes: [
        {
          label: "stack type",
          value: "idea",
        },
        {
          label: "role",
          value: "frontend dev",
        },
        {
          label: "stage",
          value: "pre-production",
        },
      ],
    },
    {
      title: "Project Title goes here",
      description:
        "lskdjfaldkfjal;dskfjasldkfja dslfjkasdfkdsfl adlkjasf kadfkjasldf kasaldkfj saldkfj asladkf jasdfhjasldek; ajsdfaj sdalfjk asldf ajkdsf jkadsfkasdf jal;sdf jkalsdjf l;sakdjf l;asdkjf a;lsdfj als;dkjf a;lsdj fal;sdkfjalsd falsdf jkasdf jalsdkfj asl",
      attributes: [
        {
          label: "stack type",
          value: "idea",
        },
        {
          label: "role",
          value: "frontend dev",
        },
        {
          label: "stage",
          value: "pre-production",
        },
      ],
    },
    {
      title: "Project Title goes here",
      description:
        "lskdjfaldkfjal;dskfjasldkfja dslfjkasdfkdsfl adlkjasf kadfkjasldf kasaldkfj saldkfj asladkf jasdfhjasldek; ajsdfaj sdalfjk asldf ajkdsf jkadsfkasdf jal;sdf jkalsdjf l;sakdjf l;asdkjf a;lsdfj als;dkjf a;lsdj fal;sdkfjalsd falsdf jkasdf jalsdkfj asl",
      attributes: [
        {
          label: "stack type",
          value: "idea",
        },
        {
          label: "role",
          value: "frontend dev",
        },
        {
          label: "stage",
          value: "pre-production",
        },
      ],
    },
    {
      title: "Project Title goes here",
      description:
        "lskdjfaldkfjal;dskfjasldkfja dslfjkasdfkdsfl adlkjasf kadfkjasldf kasaldkfj saldkfj asladkf jasdfhjasldek; ajsdfaj sdalfjk asldf ajkdsf jkadsfkasdf jal;sdf jkalsdjf l;sakdjf l;asdkjf a;lsdfj als;dkjf a;lsdj fal;sdkfjalsd falsdf jkasdf jalsdkfj asl",
      attributes: [
        {
          label: "stack type",
          value: "idea",
        },
        {
          label: "role",
          value: "frontend dev",
        },
        {
          label: "stage",
          value: "pre-production",
        },
      ],
    },
    {
      title: "Project Title goes here",
      description:
        "lskdjfaldkfjal;dskfjasldkfja dslfjkasdfkdsfl adlkjasf kadfkjasldf kasaldkfj saldkfj asladkf jasdfhjasldek; ajsdfaj sdalfjk asldf ajkdsf jkadsfkasdf jal;sdf jkalsdjf l;sakdjf l;asdkjf a;lsdfj als;dkjf a;lsdj fal;sdkfjalsd falsdf jkasdf jalsdkfj asl",
      attributes: [
        {
          label: "stack type",
          value: "idea",
        },
        {
          label: "role",
          value: "frontend dev",
        },
        {
          label: "stage",
          value: "pre-production",
        },
      ],
    },
    {
      title: "Project Title goes here",
      description:
        "lskdjfaldkfjal;dskfjasldkfja dslfjkasdfkdsfl adlkjasf kadfkjasldf kasaldkfj saldkfj asladkf jasdfhjasldek; ajsdfaj sdalfjk asldf ajkdsf jkadsfkasdf jal;sdf jkalsdjf l;sakdjf l;asdkjf a;lsdfj als;dkjf a;lsdj fal;sdkfjalsd falsdf jkasdf jalsdkfj asl",
      attributes: [
        {
          label: "stack type",
          value: "idea",
        },
        {
          label: "role",
          value: "frontend dev",
        },
        {
          label: "stage",
          value: "pre-production",
        },
      ],
    },
    {
      title: "project title 2 here",
      description:
        "lorem asldfkjalsdkfjlashfdjkpsaojhagnl;akfjdsf asdkhjfnlaskajdnf ahdisjkflaksf lsadikhfjaalsofnjl;ask.df jaoisldhfjupsaldkfnmal;isfd jaoplisdkhfjuasldkfnml;isadkfj saodifjalsdkfjm asdoifhjaosdifhjaldskfjn asdifuhjalsed",
      attributes: [
        {
          label: "stack type",
          value: "project",
        },
        {
          label: "role req",
          value: "backend dev",
        },
        {
          label: "stage",
          value: "pre deployment",
        },
      ],
    },
    {
      title: "project title 2 here",
      description:
        "lorem asldfkjalsdkfjlashfdjkpsaojhagnl;akfjdsf asdkhjfnlaskajdnf ahdisjkflaksf lsadikhfjaalsofnjl;ask.df jaoisldhfjupsaldkfnmal;isfd jaoplisdkhfjuasldkfnml;isadkfj saodifjalsdkfjm asdoifhjaosdifhjaldskfjn asdifuhjalsed",
      attributes: [
        {
          label: "stack type",
          value: "project",
        },
        {
          label: "role req",
          value: "backend dev",
        },
        {
          label: "stage",
          value: "pre deployment",
        },
      ],
    },
  ];

  function showStack(stack: StackCardType) {
    setCurrentStack(stack);
    setShowStackModal(true);
  }

  return (
    <div className="w-full h-full overflow-y-auto text-black p-2 sm:p-6 justify-start gap-6  flex flex-wrap">
      {/* stack cards */}
      {stacks.map((item, i) => {
        return (
          <div
            key={i}
            onClick={() => showStack(item)}
            className="group flex flex-col justify-between p-4 md:w-96 bg-neutral-900 hover:bg-neutral-950 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-200 cursor-pointer"
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
              {item.attributes.map((attribute, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center gap-1 px-2 py-1 text-xs sm:text-sm rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700"
                  >
                    <span className="text-neutral-400">{attribute.label}</span>
                    <span className="text-neutral-200">{attribute.value}</span>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-neutral-800 text-xs text-neutral-500 group-hover:text-neutral-300 transition">
              <span>View stack</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </div>
        );
      })}

      {/* stack modal */}
      <div
        className={`backdrop-blur-xs bg-transparent p-2 sm:p-0 right-0 w-screen h-full bottom-0 flex justify-center items-center ${ShowStackModal ? "absolute" : "hidden"}`}
      >
        <div className="relative h-5/6 md:h-11/12 sm:w-10/12 w-full bg-neutral-900 rounded-2xl p-2 flex flex-col md:flex-row overflow-y-auto md:overflow-y-hidden justify-center items-center">
          {/* close button */}
          <button
            onClick={() => setShowStackModal(false)}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition"
          >
            <X size={20} />
          </button>
          <div className="w-full  mt-[1200px] sm:m-0  md:w-1/2 flex flex-col h-fit md:h-full bg-neutral-900 text-white p-2 sm:p-3 md:p-5 md:overflow-y-auto no-scrollbar">
            {/* Title + quick metadata */}
            <div className="w-full flex flex-col gap-3 pb-4 border-b border-neutral-700">
              <h1 className="text-3xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                Project Title Goes Here
              </h1>

              {/* quick info tags */}
              <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  SaaS
                </span>

                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  70% Complete
                </span>

                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                  Looking for collaborators
                </span>
              </div>
            </div>

            {/* Project preview image */}
            <div className="w-full mt-6">
              <div className="relative w-full min-h-[300px] sm:min-h-[420px] md:min-h-[520px] rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-800">
                {/* Replace this div with <Image /> later */}
                <div className="absolute inset-0 flex items-center justify-center text-neutral-500 text-sm">
                  Project Screenshot Preview
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="w-full mt-6 flex flex-col gap-3">
              <h2 className="text-lg font-semibold">About this project</h2>

              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                This project is a SaaS analytics dashboard designed for indie
                builders who want a simple way to monitor product usage, user
                growth, and revenue. The authentication system and core UI are
                complete, while advanced analytics modules and payment
                integration are still under development. The goal is to ship a
                lightweight platform that helps small teams track the health of
                their products without the complexity of enterprise tools.
              </p>

              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                The foundation is already stable, and the architecture supports
                scaling. What remains is refining backend data pipelines, adding
                billing logic, and polishing the user experience for production
                readiness.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col h-fit justify-start md:h-full sm:p-3 md:p-6 bg-neutral-900 p-3 md:overflow-y-auto no-scrollbar text-white">
            {/* About the author */}
            <div className="w-full flex flex-col gap-4 border-b border-neutral-700 pb-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
                About the stack author,{" "}
                <span className="text-sky-400">Alex Carter</span>
              </h1>

              <div className="flex items-center gap-4">
                <img
                  src="/avatar.png"
                  alt="author"
                  className="w-14 h-14 rounded-full object-cover border border-neutral-700"
                />

                <div className="flex flex-col">
                  <p className="text-sm text-neutral-300">
                    Full-stack developer who started building this SaaS
                    dashboard for indie founders.
                  </p>
                  <span className="text-xs text-neutral-500">
                    4 years experience • React / Node
                  </span>
                </div>
              </div>
            </div>

            {/* Why the project is incomplete */}
            <div className="flex flex-col gap-2 pt-6 border-b border-neutral-700 pb-6">
              <h2 className="text-lg font-semibold">
                Why this project is incomplete
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                I started building this analytics SaaS but had to pause due to a
                new job and lack of backend scaling experience. The UI and
                authentication flow are complete, but advanced analytics and
                payment integration are pending.
              </p>
            </div>

            {/* What he is looking for */}
            <div className="flex flex-col gap-3 pt-6 border-b border-neutral-700 pb-6">
              <h2 className="text-lg font-semibold">Looking for</h2>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  Frontend Developer
                </span>

                <span className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  Backend Developer
                </span>

                <span className="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                  Co-builder
                </span>
              </div>
            </div>

            {/* Expectations */}
            <div className="flex flex-col gap-3 pt-6 border-b border-neutral-700 pb-6">
              <h2 className="text-lg font-semibold">
                Expectations from collaborators
              </h2>

              <ul className="text-sm text-neutral-300 list-disc list-inside space-y-1">
                <li>Good communication and collaboration</li>
                <li>Experience with modern web stacks</li>
                <li>Ability to ship features independently</li>
                <li>Interest in finishing and launching the product</li>
              </ul>
            </div>

            {/* Tools used */}
            <div className="flex flex-col gap-3 pt-6">
              <h2 className="text-lg font-semibold">
                Tools used in the project
              </h2>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm rounded-full bg-neutral-800 border border-neutral-700">
                  #nextjs
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-neutral-800 border border-neutral-700">
                  #mongodb
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-neutral-800 border border-neutral-700">
                  #tailwind
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-neutral-800 border border-neutral-700">
                  #figma
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

{/* explore footer  */}
<ExploreFooter/>
    </div>
  );
};



const ExploreFooter = () => {
  return (
    <footer className="w-full py-4 from-gray-700 to-blue-800 mt-6 bg-linear-to-t pb-12 rounded-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="w-full flex items-center justify-center">
            <Image
              alt="halfstack logo"
              src="/logo-transparent.png"
              className="self-center"
              height={80}
              width={210}
            />
          </div>
          <ul className="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-14 mb-10 border-b border-gray-200">
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
          </ul>
          <div className="flex space-x-10 justify-center items-center mb-14">
            <a
              href="#"
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
            <a className="block text-white transition-all duration-500 hover:text-indigo-600 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-github-icon lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4 " />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a className="block text-white transition-all duration-500 hover:text-indigo-600 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-linkedin-icon lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
          <span className="text-lg text-blue-100 text-center block">
            ©<a href="">HalfStack</a> 2026, All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
