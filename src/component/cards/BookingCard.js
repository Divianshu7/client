// import hotel from "../../../../server/models/hotel"
import { Link, useNavigate } from "react-router-dom"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { diffDays } from "../../actions/hotel"
import { currencyFormatter } from "../../actions/stripe"
import { useState } from "react"
import OrderModal from "../Modals/OrderModal"
// const history = useNavigate();
const BookingCard = ({ h, session, orderedBy }) => {
    const history = useNavigate()
    const [showModel, setShowModel] = useState(false)
    return <>
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-4">
                    {h.image && h.image.contentType ? (<img className="img card-img img-fluid" src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`} alt="default hotel image" />) : (<img className="img card-img img-fluid" src="https://via.placeholder.com/900x500.png?text=MERN+Booking" alt="default hotel image" />)
                    }
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title">
                            {h.title}{" "}
                            <span className="text-primary">
                                {currencyFormatter({
                                    amount: h.price * 100,
                                    currency: 'INR'
                                })}
                            </span>{" "}
                        </h3>
                        <p className="alert alert-info">{h.location}</p>
                        <p className="card-text">{`${h.content.substring(0, 200)}...`}</p>
                        <p className="card-text">
                            <span className="float-right text-primary">
                                for {diffDays(h.from, h.to)} {diffDays(h.from, h.to) <= 1 ? 'day' : 'days'}
                            </span>
                        </p>
                        <p className="card-text">{h.bed} bed</p>
                        <p className="card-text">Available from {new Date(h.from).toLocaleDateString()}</p>
                        {showModel && <OrderModal showModel={showModel} setShowModel={setShowModel} session={session} orderedBy={orderedBy} />}
                        <div className="d-flex justify-content-between h4">
                            <button className="btn btn-primary" onClick={() => setShowModel(!showModel)}>Show Payment Info</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default BookingCard