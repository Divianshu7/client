import { Link } from "react-router-dom"
import ConnectNav from "../component/ConnectNav"
import DashboardNav from "../component/DashboardNav"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { userHotelBookings } from "../actions/hotel"
import BookingCard from "../component/cards/BookingCard"
const Dashboard = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const { token } = user
    const [booking, setBooking] = useState([])
    useEffect(() => {
        loadUserBookings()
    }, [])
    const loadUserBookings = async () => {
        const res = await userHotelBookings(token)
        // console.log(res)
        setBooking(res.data)
    }
    return (
        <>

            <div className="bg-secondary container-fluid p-5">
                <ConnectNav />
            </div>
            <div className="container-fluid p-4"><DashboardNav /></div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Your Bookings</h2>
                    </div>
                    <div className="col-md-2">
                        <Link to='/' className="btn btn-primary">Browse Hotels</Link>
                    </div>
                </div>
                <div className="row">
                    {booking.map(b => (
                        <BookingCard key={b._id} h={b.hotel} session={b.session} orderedBy={b.orderedBy} />
                    ))}
                </div>
            </div>
        </>
    )
}
export default Dashboard