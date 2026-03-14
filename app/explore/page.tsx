import SearchBar from "@/components/searchbar"
import Sidebar from "@/components/sidebar"

const Explore = () => {
  
    return (
        <div className='w-screen min-h-screen flex bg-black text-white'>
           <Sidebar/>
            <div className='w-full flex flex-col h-full'>
                <div className="w-full p-4 flex items-center justify-center">
                    <SearchBar/>
                </div>
            </div>
        </div>
  )
}

export default Explore