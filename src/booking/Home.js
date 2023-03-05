import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { allHotels } from '../actions/hotel';
import SmallCard from '../component/cards/SmallCard';
import Search from '../component/forms/Search';
import axios from 'axios'
function Home() {
    const [loading, setLoading] = useState(true)
    const state = useSelector((state) => (state));
    const [hotels, setHotels] = useState([])
    useEffect(() => {
        lodaAllhotels()
    }, [])
    const lodaAllhotels = async () => {
        let res = await allHotels()
        setHotels(res.data)
    }
    const welcome = () => {
        return (
            <>
                <div style={{
                    position: "relative",
                    top: "-40px",
                    backgroundColor: "black",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <img src='https://i.giphy.com/media/W22b2eea2XxB6DiTWg/giphy.webp' />
                </div>
            </>
        )
    }
    console.log(`${process.env.REACT_APP_API}/connect`)
    const load = async () => {
        await axios.get(`${process.env.REACT_APP_API}/connect`)
        setLoading(false)
    }
    load()
    return (<>
        {loading ? welcome() :
            <div className='container-fluid bg-secondary p-5 text-center'>
                <h1>All Hotels</h1>
                <Search />
                <div className='container fluid'>
                    <br />
                    {/* <p>{JSON.stringify(hotels, null, 4)}</p> */}
                    {hotels.map((h) => <SmallCard h={h} key={h._id} />)}
                </div>
            </div>}
    </>
    )
}

export default Home
