import { HomeOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteHotel, sellerHotels } from '../actions/hotel'
import { createConnectAccount } from '../actions/stripe'
import SmallCard from '../component/cards/SmallCard'
import ConnectNav from '../component/ConnectNav'
import DashboardNav from '../component/DashboardNav'
// import {HomeOutlined} from '@ant'
function DashboardSeller() {
    const { user } = useSelector((state) => ({ ...state }))
    const [hotels, setHotels] = useState([])
    useEffect(() => {
        loadSellerHotels()
    }, [])
    const loadSellerHotels = async () => {
        let res = await sellerHotels(user.token)
        setHotels(res.data)
        console.log(res)
    }
    const handleHotelDelete = async (hotelId) => {
        if (!window.confirm('Are you sure?')) return;
        deleteHotel(user.token, hotelId).then((res) => {
            toast.success('Hotel deleted')
            loadSellerHotels()
        })
    }
    const connected = () => (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <h2>Your Hotels</h2>
                </div>
                <div className="col-md-2">
                    <Link to='/hotels/new' className="btn btn-primary">+ Add New</Link>
                </div>

            </div>
            <div className='row'>
                {hotels.map(h => <SmallCard handleHotelDelete={handleHotelDelete} key={h._id} h={h} owner={true} showViewMoreButton={false} />)}
            </div>

        </div>
    )
    const [loading, setLoading] = useState(false)
    const handleClick = async () => {
        setLoading(true)
        try {
            let res = await createConnectAccount(user.token)
            // console.log(res)
            window.location.href = res.data
        } catch (err) {
            console.log(err)
            toast.error('Stripe connect failed,try again')
            setLoading(false)
        }
    }
    const notConnected = () => (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <div className='p-5 pointer'>
                        <HomeOutlined className='h1' />
                        <h4>Setup payouts to post hotel rooms</h4>
                        <p className='lead'>MERN partners wuth stripe to transfer earnings to your accout</p>
                        <button disabled={loading} onClick={handleClick} className='btn btn-primary mb-3'>Setup Payout</button>
                        <p className='text-muted'>
                            <small>You'll be redirected to Stripe to complete the onboarding process.</small>
                        </p>
                    </div>
                </div>

            </div>

        </div>
    )
    // console.log(user.userExist.stripe_seller.charges_enabled)
    return (
        <>
            <div className='container-fluid bg-secondary p-5'>
                <ConnectNav />
            </div>
            <div className='container-fluid p-4'>
                <DashboardNav />
            </div>
            {user &&
                user.userExist &&
                user.userExist.stripe_seller &&
                user.userExist.stripe_seller.charges_enabled
                ? connected()
                : notConnected()}
        </>
    )
}

export default DashboardSeller