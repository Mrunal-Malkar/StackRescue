"use client";
import { StackCardType } from "@/lib/types";
import React, { useState } from "react";

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
            onClick={() => showStack(item)}
            key={i}
            className="flex flex-col p-2  md:w-100 bg-gray-900 hover:bg-gray-950 hover:cursor-pointer rounded-xl border-2 border-gray-800"
          >
            <div className="w-full">
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl text-blue-500/70">
                {item.title}
              </h1>
            </div>
            <div className="flex w-full text-sm sm:text-lg flex-wrap text-gray-300">
              <p>{item.description}</p>
            </div>
            <div className="w-full justify-start gap-0.5 sm:gap-2 flex flex-wrap">
              {item.attributes.map((attribute, i) => {
                return (
                  <div
                    key={i}
                    className="flex bg-linear-to-t from-gray-800 to-gray-900 rounded-xl p-2 text-gray-300/95 m-0.5 text-sm"
                  >
                    <h1>{attribute.label}:</h1>
                    <p>{attribute.value}</p>
                  </div>
                );
              })}
            </div>
            <div className=""></div>
          </div>
        );
      })}

      {/* stack modal */}
      <div
        className={`backdrop-blur-xs bg-transparent p-2 sm:p-0 right-0 w-screen h-full bottom-0 flex justify-center items-center ${ShowStackModal ? "absolute" : "hidden"}`}
      >
        <div className="h-5/6 md:h-11/12 sm:w-10/12 w-full bg-amber-500 rounded-2xl p-2 flex flex-col md:flex-row overflow-y-auto md:overflow-y-hidden justify-center items-center">
        <div className="w-full md:w-1/2 flex flex-col h-fit md:h-full bg-neutral-900 text-white p-2 sm:p-3 md:p-5 md:overflow-y-auto no-scrollbar">

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

    <h2 className="text-lg font-semibold">
      About this project
    </h2>

    <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
      This project is a SaaS analytics dashboard designed for indie builders
      who want a simple way to monitor product usage, user growth, and revenue.
      The authentication system and core UI are complete, while advanced
      analytics modules and payment integration are still under development.
      The goal is to ship a lightweight platform that helps small teams track
      the health of their products without the complexity of enterprise tools.
    </p>

    <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
      The foundation is already stable, and the architecture supports scaling.
      What remains is refining backend data pipelines, adding billing logic,
      and polishing the user experience for production readiness.
    </p>

  </div>

</div>
          <div className="w-full md:w-1/2 flex flex-col h-fit justify-start md:h-full sm:p-3 md:p-6 bg-neutral-900 p-3 md:overflow-y-auto no-scrollbar text-white">

  {/* About the author */}
  <div className="w-full flex flex-col gap-4 border-b border-neutral-700 pb-6">

    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
      About the stack author, <span className="text-sky-400">Alex Carter</span>
    </h1>

    <div className="flex items-center gap-4">
      <img
        src="/avatar.png"
        alt="author"
        className="w-14 h-14 rounded-full object-cover border border-neutral-700"
      />

      <div className="flex flex-col">
        <p className="text-sm text-neutral-300">
          Full-stack developer who started building this SaaS dashboard for indie founders.
        </p>
        <span className="text-xs text-neutral-500">
          4 years experience • React / Node
        </span>
      </div>
    </div>

  </div>

  {/* Why the project is incomplete */}
  <div className="flex flex-col gap-2 pt-6 border-b border-neutral-700 pb-6">
    <h2 className="text-lg font-semibold">Why this project is incomplete</h2>
    <p className="text-sm text-neutral-300 leading-relaxed">
      I started building this analytics SaaS but had to pause due to a new job
      and lack of backend scaling experience. The UI and authentication flow
      are complete, but advanced analytics and payment integration are pending.
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
    <h2 className="text-lg font-semibold">Expectations from collaborators</h2>

    <ul className="text-sm text-neutral-300 list-disc list-inside space-y-1">
      <li>Good communication and collaboration</li>
      <li>Experience with modern web stacks</li>
      <li>Ability to ship features independently</li>
      <li>Interest in finishing and launching the product</li>
    </ul>
  </div>

  {/* Tools used */}
  <div className="flex flex-col gap-3 pt-6">
    <h2 className="text-lg font-semibold">Tools used in the project</h2>

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
    </div>
  );
};
