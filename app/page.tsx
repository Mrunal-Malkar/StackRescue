import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-zinc-500 font-sans dark:bg-black">
      <Navbar />
      <HeroSection />
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
      <div className="justify-between items-center flex pt-6 gap-x-12">
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
