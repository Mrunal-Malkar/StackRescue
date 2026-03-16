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
        <div className="h-11/12 sm:w-10/12 w-full bg-amber-500 rounded-2xl p-2 flex flex-col md:flex-row justify-center items-center">
          <div className="w-full md:w-1/2 flex flex-col h-full bg-green-200  p-1 sm:p-2 md:p-4 overflow-y-auto no-scrollbar">
            <div className="w-full">
              <h1 className="text-3xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                Project Title goes here
              </h1>
            </div>
            <div className="w-full min-h-94 sm:min-h-[545px]">
              <div className="w-full h-full bg-purple-800 rounded-2xl"></div>
            </div>
            <div className="w-full text-sm md:text-lg">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est
                dicta nulla ipsam perspiciatis at consectetur asperiores
                eligendi accusantium nobis maiores excepturi odio, reprehenderit
                voluptate explicabo tenetur vitae officiis debitis. Molestiae.
                Culpa sunt autem alias magnam quidem quae explicabo, nobis
                accusamus, eius corporis cum fugiat tempore perspiciatis neque
                sapiente minima repellat ex officiis rem sequi facilis eos
                deserunt inventore. Obcaecati, cum? Quia, perspiciatis quaerat.
                Enim nulla soluta beatae dolorum. Doloribus atque cupiditate
                animi sequi molestiae, soluta ad iste doloremque totam numquam
                porro autem repellat cum nesciunt earum dolorum aperiam ipsam
                non? Possimus ipsam itaque, error earum impedit suscipit?
                Laboriosam, veniam eius perferendis deleniti assumenda nemo
                minima impedit consectetur dolor doloremque asperiores omnis
                quia saepe placeat, soluta, voluptas quibusdam ratione
                repellendus! Quas? Officia mollitia consequatur eum ratione vero
                distinctio nam fuga tempora voluptatibus commodi hic, blanditiis
                placeat voluptas? Exercitationem, delectus sapiente! Ducimus
                corrupti voluptas sapiente excepturi quam sunt doloremque atque
                id tempore. Perspiciatis assumenda quidem, ipsam pariatur culpa,
                dolorem aperiam eaque odio repellat unde quae ducimus.
                Doloremque blanditiis voluptatum facere, praesentium vitae
                consequuntur, culpa eligendi veniam necessitatibus, officia
                voluptas nihil laboriosam ex? Quos exercitationem unde,
                quibusdam, ipsam deleniti rerum eaque omnis fugit soluta iure
                quam dolorum, architecto voluptate atque officia eligendi nulla!
                Architecto eos rerum corporis, error dolorem pariatur ducimus
                incidunt vero? Aspernatur enim facere possimus numquam aperiam
                nisi rerum alias debitis, ad magni, sit tenetur sunt vel fugiat
                expedita deserunt perspiciatis porro, veniam eos officiis quas.
                Officia atque distinctio architecto alias? Nam veritatis, magni
                repudiandae adipisci ipsa id dolorum hic voluptas a. Officia
                laboriosam molestiae deleniti corrupti facilis reprehenderit.
                Reprehenderit iste earum, voluptatibus dolor tempore sequi quas
                est et fuga aliquam. Labore asperiores, id voluptatibus
                aspernatur architecto blanditiis impedit itaque obcaecati
                deserunt placeat vero reprehenderit molestias repudiandae,
                quidem porro sit sunt nisi, quo at? Id, quo ea fugiat
                accusantium iure dicta. Facere illum quia non repudiandae
                veritatis dolores eaque quas molestias, dolor est recusandae
                quae eligendi quos omnis dolorum perspiciatis repellendus
                eveniet, alias, tenetur architecto ad. Optio, neque vero.
                Veniam, aspernatur! Reiciendis fuga dolor quidem veniam animi
                aut nulla eveniet atque explicabo modi repudiandae magnam soluta
                maiores veritatis autem, facilis excepturi cupiditate? Saepe
                dolorem officia nam eos, nostrum sint ab rem! Qui aspernatur
                provident corporis quod deleniti magni eligendi nihil vel culpa
                minima, eius quo dolorum. Dolorum ex sapiente cumque ducimus,
                minima molestiae veritatis id deleniti quas quia temporibus quae
                alias. Odit, officiis! Voluptatem laboriosam non minima expedita
                perferendis id ullam, sequi dolorum repudiandae est nemo nihil
                consectetur? Beatae, commodi! Molestiae, non excepturi vel ab
                mollitia vero nihil porro pariatur? Itaque? Laudantium rem quo,
                odio temporibus autem dolor doloribus vero enim cumque repellat
                sed expedita sit quasi voluptatum ipsum molestias cum obcaecati
                est asperiores consectetur magnam, officiis unde quia. Dolor,
                eligendi.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-start h-full sm:p-3 md:p-6 bg-green-700 p-1 overflow-y-auto no-scrollbar">
            {/** about the author */}
            <div className="w-full flex flex-col">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
                About the stack author,[the name goes here].
              </h1>
              {/* details */}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
