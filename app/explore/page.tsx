import { ExploreStack } from "@/components/exploreStack";
import FilterComponent from "@/components/filtercomponent";
import SearchBar from "@/components/searchbar";
import Sidebar from "@/components/sidebar";

const Explore = () => {
  
  return (
    <div className="sm:w-screen h-screen flex overflow-hidden bg-black text-white">
      <Sidebar />
      <div className="w-full flex flex-col min-h-screen">
        <div className="flex-col w-full gap-y-1 flex items-center justify-center">
          <SearchBar />
          <FilterComponent />
          <div className="min-h-5 bg-gray-700 w-full text-gray-300 p-1">all the filters/sort feature will be added soon.</div>
        </div>
        <div className="w-full flex flex-col h-full">
           <ExploreStack />
        </div>
      </div>
    </div>
  );
};


export default Explore;
