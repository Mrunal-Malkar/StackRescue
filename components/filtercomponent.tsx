"use client";

import {
  ArrowUpNarrowWide,
  Code,
  Filter,
  LayoutDashboard,
  Lightbulb,
  X,
} from "lucide-react";
import { useState } from "react";

const FilterComponent = () => {
  const [Show, setShow] = useState(false);
  const [ShowFilter, setShowFilter] = useState(false);

  function handleClick() {
    setShow(false);
    // logic..
  }

  function handleFilterSubmit() {
    setShowFilter(false);
    // logic...
  }

  return (
    <div className="bg-gray-900 text-gray-600 p-3 flex flex-2 items-center justify-around w-full overflow-x-auto">
      {/* bg-blue-500 rounded-2xl p-1 px-2 */}
      <div className="flex items-center md:gap-x-2 xl:gap-x-6">
        <div onClick={()=>setShowFilter(!ShowFilter)} className="text-gray flex px-1 gap-x-0.5 cursor-pointer">
          <Filter
            onClick={() => setShowFilter(!ShowFilter)}
            className="text-gray-200"
          />
          <h3 className="text-gray-200  text-xl sm:inline-block hidden">
            2Filter
          </h3>
        </div>
        <div className="hidden justify-center items-center text-gray-300 bg-linear-to-tl gap-x-0.5 cursor-pointer from-gray-700 to-gray-900 rounded-xl p-1 px-2 sm:flex">
          <i>
            <X size={20} />
          </i>
          <h3 className="hidden md:inline-block"> clear all filters</h3>
        </div>
      </div>
      <div className="text-gray-200 flex text-md items-center md:w-sm xl:w-xl justify-around">
        <div className="hidden  bg-linear-to-br gap-x-0.5 from-blue-500 to-blue-800 shadow-2xl cursor-pointer rounded-2xl p-1 px-3 sm:flex">
          <Lightbulb />
          <i></i> <h3>ideas</h3>
        </div>
        <div className="hidden bg-linear-to-br from-blue-500 gap-x-0.5 to-blue-800 shadow-2xl rounded-2xl cursor-pointer p-1 px-3 sm:flex">
          <i className="inline-block">
            <LayoutDashboard />
          </i>{" "}
          <h3 className="hidden sm:inline-block">All</h3>
        </div>
        <div className="hidden bg-linear-to-br from-blue-500 gap-x-0.5 to-blue-800 shadow-2xl rounded-2xl p-1 px-3 cursor-pointer sm:flex">
          <Code />
          <i></i> <h3>projects</h3>
        </div>

        {/* for mobile */}
        {/* loyaout model */}
        <div
          onClick={() => {
            setShow(!Show);
          }}
          className=" bg-linear-to-br from-blue-500 to-blue-800 shadow-2xl rounded-2xl p-1 px-3 sm:hidden flex cursor-pointer"
        >
          <i className="inline-block">
            <LayoutDashboard />
          </i>{" "}
          <h3 className="hidden sm:inline-block">All</h3>
        </div>
        <div
          className={`${Show ? "flex" : "hidden"} absolute top-35 bg-linear-to-br from-gray-700 to-gray-800 rounded-xl w-fit z-10 text-gray-300 gap-x-1 justifiy-center items-center`}
        >
          <button onClick={() => handleClick()} className="p-2 cursor-pointer">
            ideas
          </button>
          <button onClick={() => handleClick()} className="p-2 cursor-pointer">
            project
          </button>
        </div>

        {/* filter modal */}
        <div
          className={`backdrop-blur-xs bg-transparent right-0 w-screen h-full bottom-0 flex justify-center items-center ${ShowFilter ? "absolute" : "hidden"}`}
        >
          <div className="bg-linear-to-br to-gray-900 from-gray-800 rounded-2xl w-[90%] sm:w-xl xl:w-md text-gray-300 flex flex-col">
            <div className="w-full pr-4 pl-4 pt-4">
              <div className="w-full flex justify-between items-center">
                <h2 className="text-xl">Filters</h2>
                <X onClick={() => setShowFilter(false)} className="hover:cursor-pointer" size={28} />
              </div>
              <div className="border-b-2 p-1 border-gray-700 h-2/6 rounded-2xl"></div>
            </div>
            <div className="flex flex-wrap w-full pr-4 pl-4 pt-4 pb-4 max-h-64 overflow-y-auto">
              <button className="rounded-2xl from-gray-800 to-gray-950 bg-linear-to-br text-gray-300 p-2 text-center px-2.5">
                +5 votes
              </button>
              <button className="rounded-2xl from-gray-800 to-gray-950 bg-linear-to-br text-gray-300 p-2 text-center px-2.5">
                looking for collaboration
              </button>
              <button className="rounded-2xl from-gray-800 to-gray-950 bg-linear-to-br text-gray-300 p-2 text-center px-2.5">
                +50 views
              </button>
              <button className="rounded-2xl from-gray-800 to-gray-950 bg-linear-to-br text-gray-300 p-2 text-center px-2.5">
                development phase
              </button>
              <button className="rounded-2xl from-gray-800 to-gray-950 bg-linear-to-br text-gray-300 p-2 text-center px-2.5">
                UI
              </button>
              <button className="rounded-2xl from-gray-800 to-gray-950 bg-linear-to-br text-gray-300 p-2 text-center px-2.5">
                product idea
              </button>
              <button className="rounded-2xl from-gray-800 to-gray-950 bg-linear-to-br text-gray-300 p-2 text-center px-2.5">
                veried user
              </button>
              <button className="rounded-2xl from-gray-800 to-gray-950 bg-linear-to-br text-gray-300 p-2 text-center px-2.5">
                posted less than month ago
              </button>
              <button className="rounded-2xl from-gray-800 to-gray-950 bg-linear-to-br text-gray-300 p-2 text-center px-2.5">
                looking for co-founder
              </button>
            </div>
            <div 
                onClick={() => handleFilterSubmit()}
            className="hover:to-blue-700 cursor-pointer w-full flex justify-center p-3 rounded-b-2xl items-center from-blue-500 to-blue-600 bg-linear-to-br">
              <button
                className="text-lg text-gray-200"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* end */}
      </div>

      <div className="text-md flex bg-linear-to-tl cursor-pointer from-gray-700 to-gray-900 rounded-xl p-1 px-2 text-gray-200 ">
        <ArrowUpNarrowWide />
        <h3 className="">Sort</h3>
      </div>
    </div>
  );
};

export default FilterComponent;
