import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { diffDays, isAlreadyBooked, read } from '../actions/hotel'
import { getSessionId } from '../actions/stripe'
import { loadStripe } from '@stripe/stripe-js'
function ViewHotel() {
    const history = useNavigate()
    const [alreadyBooked, setAlreadyBooked] = useState(false)
    const params = useParams()
    const [hotel, setHotel] = useState({})
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state) => ({ ...state }))
    useEffect(() => {
        loadHotel()
    }, [])
    useEffect(() => {
        if (user && user.token) {
            isAlreadyBooked(user.token, params.hotelId).then((res) => {
                // console.log(res)
                if (res.data.ok) setAlreadyBooked(true)
            })
        }
    }, [])
    const loadHotel = async () => {
        let res = await read(params.hotelId)
        setHotel(res.data)
        setImage(`${process.env.REACT_APP_API}/hotel/image/${params.hotelId}`)
    }
    const handleClick = async (e) => {
        e.preventDefault()
        if (!user || !user.token) {
            history('/login')
            return
        }
        setLoading(true)
        if (!user) history('/login')
        else {
            let res = await getSessionId(user.token, params.hotelId)
            // console.log('get sessionid response', res.data.sessionId)
            const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY)
            stripe.redirectToCheckout({
                sessionId: res.data.sessionId,

            }).then((result) => console.log(result))
        }
    }
    return (
        <>
            <div className='container-fluid bg-secondary text-center p-5'>
                <h1>{hotel.title}</h1>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-6'>
                        <br />
                        <img src={image} className='img img-fluid m-2'></img>
                    </div>
                    <div className='col-md-6'>
                        <br />
                        <b className=''>{hotel.content}</b>
                        <p className='alert alert-info mt-3'>INR {hotel.price}</p>
                        <p className='card-text'>
                            <span className='float-right text-primary' >
                                for {diffDays(hotel.from, hotel.to)} {diffDays(hotel.from, hotel.to) <= 1 ? 'day' : 'days'}
                            </span></p>
                        <p>From <br /> {moment(new Date(hotel.from)).format('MMMM Do YYYY,h:mm:ss a ')}</p>
                        <i>Posted By {hotel.postedBy && hotel.postedBy.name}</i><br />
                        <button disabled={loading || alreadyBooked} onClick={handleClick} className='btn btn-block btn-lg btn-primary mt-3'>
                            {alreadyBooked ? 'Already Booked' : user && user.token ? 'Book Now ' : 'Login to book'}</button>
                    </div>
                </div></div>
        </>
    )
}

export default ViewHotel