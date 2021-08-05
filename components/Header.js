import Image from 'next/image'
import { SearchIcon, GlobeAltIcon,MenuIcon,UserCircleIcon } from '@heroicons/react/solid'
function Header() {
    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-109">
            {/* left side of header */}
            <div className="relative flex items-center h-10 cursor-pointer my-auto">
             <Image src="https://links.papareact.com/qd3"
             layout="fill"
             objectFit="contain"
             objectPosition="left"/>
            </div>
            {/* middle search*/}
            <div className="flex items-center rounded-full md:border-2 py-2 md:shadow-sm text-sm text-gray-600 placeholder-gray-400">
                <input className=" flex-grow bg-transparent pl-5 outline-none "
                type="text" placeholder="Search your stay"/>
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full cursor-pointer p-2 md:mx-2"/>
            </div>

            {/* right side of header */}
            <div className="flex text-gray-500 space-x-4  items-center justify-end">
                <p className="hidden md:inline cursor-pointer"> Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer"/>
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6"/>
                    <UserCircleIcon className="h-6"/>
                </div>
            </div>
        </header>
    )
}

export default Header
