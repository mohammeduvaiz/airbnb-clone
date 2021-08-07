import Image from 'next/image'
import { SearchIcon, GlobeAltIcon, MenuIcon, UserIcon ,UserCircleIcon} from '@heroicons/react/solid'
import { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range'
import {useRouter} from 'next/dist/client/router'

function Header({placeholder}) {
    const [searchInput, setSearchInput] = useState("")
    const [startDate,setStartDate]=useState(new Date())
    const [endDate,setEndDate]=useState(new Date())
    const [noOfGuest,setNoOfGuest]=useState()
    const router =useRouter()
    const selectionRange={
        startDate: startDate,
        endDate:endDate,
        key:"selection"
    }
    const selectHandler=(ranges)=>{
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }
    const clearSearch=()=>{
        setSearchInput("")
    }
    const search=()=>{
        router.push({
            pathname:"/search",
            query:{
                location:searchInput,
                startDate:startDate.toISOString(),
                endDate:endDate.toISOString(),
                noOfGuest
            }
        })
    }
    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-109">
            {/* left side of header */}
            <div
            onClick={() => router.push("/")} 
            className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image src="https://links.papareact.com/qd3"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left" />
            </div>
            {/* middle search*/}
            <div className="flex items-center rounded-full md:border-2 py-2 md:shadow-sm text-sm text-gray-600 placeholder-gray-400">
                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className=" flex-grow bg-transparent pl-5 outline-none "
                    type="text"
                    placeholder= {placeholder ||"Start your search"}/>
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full cursor-pointer p-2 md:mx-2" />
            </div>

            {/* right side of header */}
            <div className="flex text-gray-500 space-x-4  items-center justify-end">
                <p className="hidden md:inline cursor-pointer"> Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer" />
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6" />
                    <UserCircleIcon className="h-6" />
                </div>
            </div>
            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["FD5B61"]}
                        onChange={selectHandler}
                    />
                    <div className="flex items-center border-b mb-5">
                        <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
                        <UserIcon className="h-5"/>
                        <input
                         value={noOfGuest}
                         onChange={e => setNoOfGuest(e.target.value)}
                         type="number"
                         min={1}
                         className="w-12 pl-2 text-lg outline-none text-red-400"/>
                    </div>
                    <div className="flex"> 
                        <button className="flex-grow text-gray-400" onClick={clearSearch}>Cancel</button>
                        <button
                         onClick={search}
                         className="flex-grow text-red-400">Search</button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
