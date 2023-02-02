import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import { searchListings } from '../actions/hotel';
// import SmallCard from '../component/cards/SmallCards';
import Search from '../component/forms/Search';
import SmallCard from '../component/cards/SmallCard';
function SearchResult() {
    const [searchLocation, setSearchLocation] = useState('')
    const [searchDate, setSearchDate] = useState('')
    const [searchBed, setSearchBed] = useState('')
    const [hotels, setHotels] = useState([])
    const path = window.location.search
    console.log(path)
    useEffect(() => {
        const { location, date, bed } = queryString.parse(window.location.search)
        // console.table({ location, date, bed })
        searchListings({ location, date, bed }).then((res) => {
            // console.log('Search results==> ', res.data)
            setHotels(res.data)
        })
    }, [path])
    return (
        <>
            <div className='col'>
                <br />
                <Search />
            </div>
            <div className='container-fluid'>
                <div className='row m-3'>
                    {hotels.map(h => <SmallCard key={h._id} h={h} />)}
                </div>
            </div>
        </>
    )
}

export default SearchResult