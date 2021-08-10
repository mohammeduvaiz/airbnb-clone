import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Maps from '../components/Maps'
import { useState } from "react";
function Search({ searchResults }) {
    const router = useRouter()
    const [filterResult, setFilterResult] = useState("")
    const { location, startDate, endDate, noOfGuests } = router.query;
    const formatedStartDate = format(new Date(startDate), "dd MMM yyyy")
    const formatedEndDate = format(new Date(endDate), "dd MMM yyyy")
    const range = `${formatedStartDate}-${formatedEndDate}`
    return (
        <div>
            <Header placeholder={`${location} | ${startDate} |${endDate} |${noOfGuests}`} />
            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ stays -{range} for {noOfGuests} number of guests</p>

                    <h1 className="text-3xl font-semibold mt-2 mb-6"> Stays in {location}</h1>
                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More filters</p>
                    </div>
                    <div className="flex items-center h-20 w-full px-2 rounded-md py-2 shadow-md">
                        <input
                            className="flex-grow outline-none ml-2 text-gray-500"
                            placeholder="Filter By Price"
                            type="text"
                            value={filterResult}
                            onChange={(e) => setFilterResult(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        {searchResults.filter((item) => {
                            if (filterResult === "") {
                                return item
                            }
                            else if (
                                item.price.toLowerCase().includes(filterResult.toLowerCase())
                            ) {
                                return item
                            }
                        })
                            .map(item => (
                                <InfoCard
                                    key={item.img}
                                    img={item.img}
                                    location={item.location}
                                    title={item.title}
                                    description={item.description}
                                    star={item.star}
                                    price={item.price}
                                    total={item.total} />
                            ))}
                    </div>
                </section>
                <section className=" relative hidden xl:inline-flex xl:min-w-[500px]">
                    <Maps searchResults={searchResults} filterResult={filterResult} />
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Search;

export async function getServerSideProps() {
    const searchResults = await fetch('https://links.papareact.com/isz')
        .then(res => res.json())
    return {
        props: {
            searchResults,
        }
    }
}