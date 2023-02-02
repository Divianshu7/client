import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { allHotels } from '../actions/hotel';
import SmallCard from '../component/cards/SmallCard';
import Search from '../component/forms/Search';
function Home() {
    const state = useSelector((state) => (state));
    const [hotels, setHotels] = useState([])
    useEffect(() => {
        lodaAllhotels()
    }, [])
    const lodaAllhotels = async () => {
        let res = await allHotels()
        setHotels(res.data)
    }
    return (
        <div className='container-fluid bg-secondary p-5 text-center'>
            <h1>All Hotels</h1>
            <Search />
            <div className='container fluid'>
                <br />
                {/* <p>{JSON.stringify(hotels, null, 4)}</p> */}
                {hotels.map((h) => <SmallCard h={h} key={h._id} />)}
            </div>
        </div>
    )
}

export default Home