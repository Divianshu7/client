import { DatePicker, Select } from 'antd'
import React, { useEffect, useState } from 'react'
// import 'tom-select'
import { useSelector } from 'react-redux'
// import { createHotel } from '../actions/hotel'
import { toast } from 'react-toastify'
import { createHotel } from '../actions/hotel'
import HotelCreateForm from '../component/forms/NewHotel'

function NewHotel() {
    const { user } = useSelector((state) => ({ ...state }))
    const { token } = user


    console.log('no')
    const [values, setValues] = useState({
        title: '',
        content: '',
        location: '',
        image: '',
        price: '',
        from: '',
        to: '',
        bed: ''
    })

    //destructuring from values
    const { title, content, location, image, price, from, to, bed } = values;
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('form data==> ', values)
        let hotelData = new FormData()
        hotelData.append('title', title)
        hotelData.append('content', content)
        hotelData.append('location', location)
        image && hotelData.append('image', image)
        hotelData.append('bed', bed)
        hotelData.append('price', price)

        hotelData.append('from', from)
        hotelData.append('to', to)
        console.log([...hotelData])
        try {
            const res = await createHotel(token, hotelData)
            console.log('hotel creation res ', res)
            toast.success('New hotel is posted')
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        } catch (err) {
            console.log(err)
            toast.error(err.response.data)
        }
    }
    const [preview, setPreview] = useState('https://via.placeholder.com/100x100.png?text=PREVIEW')
    const handleImageChange = (e) => {
        // console.log(e.target.files[0])
        setValues({ ...values, image: e.target.files[0] })
        setPreview(URL.createObjectURL(e.target.files[0]))
    }
    // const [address, setAddress] = useState('')

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }


    {
        return (
            <>
                <div className='container-fluid bg-secondary p-5 text-center h1'>
                    <h2>Post a New Hotel</h2>
                </div>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-10'>
                            <br />
                            {user && user.token && <HotelCreateForm
                                values={values}
                                setValues={setValues}
                                handleChange={handleChange}
                                handleImageChange={handleImageChange}
                                handleSubmit={handleSubmit}
                            />}

                        </div>
                        <div className='col-md-2'>
                            <img src={preview} alt='preview_image' className='img img-fluid m-2'></img>
                            <pre>{JSON.stringify(values, null, 4)}</pre>
                        </div>
                    </div>
                </div>
            </>
        )


    }
}

export default NewHotel