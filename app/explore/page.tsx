import SearchBar from "@/components/searchbar"
import Sidebar from "@/components/sidebar"
import { ArrowUpNarrowWide, Filter } from "lucide-react"

const Explore = () => {
  
    return (
        <div className='w-screen min-h-screen flex bg-black text-white'>
           <Sidebar/>
            <div className='w-full flex flex-col h-full'>
                <div className="w-full p-4 flex items-center justify-center">
                    <SearchBar/>
                </div>
            <div className="bg-gray-900 text-gray-600 w-full p-3 flex items-center justify-between overflow-x-auto">
                 {/* bg-blue-500 rounded-2xl p-1 px-2 */}
                 <div className="flex items-center">
                <div className="text-gray flex px-1 gap-x-0.5">
                    <Filter className="text-gray-200"/>
                    <h3 className="text-gray-200  text-xl">2Filter</h3>
                </div>
                <div className="text-gray-300 bg-linear-to-tl from-gray-700 to-gray-900 rounded-xl p-1 px-2">clear all filters</div>
                 </div>
                <div className="text-gray-200 flex text-md items-center xl:w-4xl justify-around">
                    <div className=" bg-linear-to-br from-blue-500 to-blue-800 shadow-2xl rounded-2xl p-1 px-3">ideas</div>
                    <div className=" bg-linear-to-br from-blue-500 to-blue-800 shadow-2xl rounded-2xl p-1 px-3">All</div>
                    <div className=" bg-linear-to-br from-blue-500 to-blue-800 shadow-2xl rounded-2xl p-1 px-3">projects</div>
                </div>
                <div className="text-md flex bg-linear-to-tl from-gray-700 to-gray-900 rounded-xl p-1 px-2 text-gray-200">
                    <ArrowUpNarrowWide/>
                    <h3 className="">Sort</h3>
                </div>
            </div>
            </div>
        </div>
  )
}

export default Explore