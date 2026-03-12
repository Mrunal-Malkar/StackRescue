import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/Navbar";
import { Globe, Handshake, LucideCircleArrowUp, User2 } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-zinc-500 font-sans dark:bg-black">
      <div className="h-screen flex flex-col ">
      <Navbar />
      <HeroSection />
      </div>
      <WhatIs/>
      <Explain/>
      <Footer/>
    </div>
  );
}

const HeroSection = () => {
  return (
    <div className="flex flex-col bg-yellow-80 justifiy-center items-center text-white w-full">
      <Image
        className="pt-20 pb-6 sm:pt-40 sm:pb-4"
        alt="HalfStack logo"
        src="/logo-transparent.png"
        width={334}
        height={158}
      />
      <div className="w-full flex flex-col justify-center text-center items-center gap-y-2.5">
        <h1 className="text-5xl font-semibold tracking-tighter">
          Where Half-Built Projects Find Their Team.
        </h1>
        <h2 className="text-xl">
          Explore abandoned ideas, join forces with builders, and finish what
          someone started.
        </h2>
        <h3 className="text-xl">Ready to Explore/Create a stack?</h3>
      </div>
      <div className="justify-between items-center flex pt-6 gap-x-6 lg:gap-x-12">
        <Button className="cursor-pointer hover:from-blue-400 p-4 hover:scale-105 hover:to-blue-600 hover:bg-linear-to-br rounded-2xl bg-white text-black">
          Explore
        </Button>
        <Button className="cursor-pointer hover:from-blue-400 p-4 hover:scale-105 hover:to-blue-600 hover:bg-linear-to-br rounded-2xl bg-white text-black">
          Create a Stack
        </Button>
      </div>
    </div>
  );
};

const WhatIs=()=>{
  return(
    <div className="text-white w-full h-[80%] sm:h-[90%] flex flex-col items-center justify-center">
        <div className="text-3xl sm:text-4xl m-4">
          What Is <span className="text-blue-500 font-semibold text-4xl sm:text-5xl tracking-tight underline decoration-blue-400 decoration-12">HalfStack</span> For?
        </div><br />
        <div className="text-xl max-w-2xl m-2">
          <p className="max-w-2xl text-gray-400">
            {`HalfStack is basically where your "abandoned" projects go to finally
  get finished. We’ve all been there—you start a killer SaaS idea, get
  the auth working, and then... life happens. Or maybe you just
  realize you're a backend wizard who really needs a frontend
  "stackmate" to make it look, well, not broken.`}
            <br /><br/>
            {`It’s the spot to find a co-owner for that half-built project you’re stuck on, or to just
  throw a wild idea out there and recruit a crew (designers, devs,
  whatever you need). If people vibe with the vision? Boom. You've got
  a team.`}
            <br /><br />
            {`Just one catch: everything here is open-source and
  community-driven. It’s not just "your" project anymore—it belongs to
  everyone who helped build it, and everyone gets to flex their role
  in it. Let's build something actually useful, together.`}
          </p>
        </div>
      </div>
  )
}

const Explain=()=>{
  const features = [
  {
    name: 'Explore page',
    description:
      'Here you can see all the projects/ideas posted and Apply search filter according to your need.',
    icon:Globe,
  },
  {
    name: 'Collaborate',
    description:
      'On clicking Collaborate the realtime chat with the initiator of that stack opens OR if that is a idea the along with chat the request to fulfill that particular role goes.',
    icon: Handshake,
  },
  {
    name: 'Upvote',
    description:
      'If you like any stack Upvote it. Upvoting increases the no. of eyeball that stack gets',
    icon: LucideCircleArrowUp,
  },
  {
    name: 'Profile',
    description:
      'This is where your info like, stacks uploaded, most upvoted stack, completed stack , collaborations,etc. is visible.',
    icon:User2,
  },
]
  return (
        <div className="bg-black py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-400">Quick start</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance">
            Everything you need to know to get-started with HalfStack
          </p>
          <p className="mt-6 text-lg/8 text-gray-300">
            Stack is a generic term in HalfStack which is used to describe any project/idea on HalfStack.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-white">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-500">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-400">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

const Footer=()=>{
  return (
                                                    <footer className="w-full py-4 from-blue-500 to-blue-600 bg-linear-to-br">
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
                        <li><a href="#" className="text-white/70 hover:text-gray-900">Pagedone</a></li>
                        <li><a href="#" className=" text-white/70 hover:text-gray-900">Products</a></li>
                        <li><a href="#" className=" text-white/70 hover:text-gray-900">Resources</a></li>
                        <li><a href="#" className=" text-white/70 hover:text-gray-900">Blogs</a></li>
                        <li><a href="#" className=" text-white/70 hover:text-gray-900">Support</a></li>
                    </ul>
                    <div className="flex space-x-10 justify-center items-center mb-14">
                        <a href="#" className="block  text-white transition-all duration-500 hover:text-indigo-600 ">
                          <svg className="w-[1.688rem] h-[1.688rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                            <path d="M11.3214 8.93666L16.4919 3.05566H15.2667L10.7772 8.16205L7.1914 3.05566H3.05566L8.47803 10.7774L3.05566 16.9446H4.28097L9.022 11.552L12.8088 16.9446H16.9446L11.3211 8.93666H11.3214ZM9.64322 10.8455L9.09382 10.0765L4.72246 3.95821H6.60445L10.1322 8.8959L10.6816 9.66481L15.2672 16.083H13.3852L9.64322 10.8458V10.8455Z" fill="currentColor"/>
                          </svg>
                        </a>
                        <a className="block text-white transition-all duration-500 hover:text-indigo-600 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4 "/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                        </a>
                        <a className="block text-white transition-all duration-500 hover:text-indigo-600 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                        </a>
                    </div>
                    <span className="text-lg text-blue-100 text-center block">©<a href="">HalfStack</a> 2026, All rights reserved.</span>
            </div>
        </div>
    </footer>
                                            
  )
}