import { ExploreStack } from "@/components/exploreStack";
import FilterComponent from "@/components/filtercomponent";
import SearchBar from "@/components/searchbar";
import Sidebar from "@/components/sidebar";
import Image from "next/image";

const Explore = () => {
  
  return (
    <div className="sm:w-screen min-h-screen flex overflow-hidden bg-black text-white">
      <Sidebar />
      <div className="w-full flex flex-col h-screen">
        <div className="flex-col w-full gap-y-1 flex items-center justify-center">
          <SearchBar />
          <FilterComponent />
        </div>
        <div className="w-full flex flex-col h-full">
          <ExploreStack />
        </div>
      </div>
    </div>
  );
};


export default Explore;
