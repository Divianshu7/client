import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Select } from 'antd'
import { useParams } from 'react-router-dom'
import { read, updateHotel } from '../actions/hotel'
import { useSelector } from 'react-redux'
import HotelEditForm from '../component/forms/HotelEditForm'
const { Option } = Select
function EditHotel() {
    const params = useParams()
    const { user } = useSelector((state) => ({ ...state }))
    const { token } = user
    const [image, setImage] = useState('')
    const [values, setValues] = useState({
        title: '',
        content: '',
        location: '',
        bed: '',
        from: '',
        to: '',
        price: '',
    })
    const [preview, setPreview] = useState('https://via.placeholder.com/100x100.png?text=PREVIEW')
    const handleImageChange = (e) => {
        // console.log(e.target.files[0])
        setImage(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
    }
    // const [address, setAddress] = useState('')
    const { title, content, location, price, from, to, bed } = values;
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
            const res = await updateHotel(token, hotelData, params.hotelId)
            console.log('hotel update res ', res)
            toast.success(`${res.data.title} is updated`)
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        } catch (err) {
            console.log(err)
            toast.error(err.response.data)
        }
    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        // console.log(params)
        loadSellerHotel()
    }, [])
    const loadSellerHotel = async () => {
        let res = await read(params.hotelId)
        // console.log(res)/
        setValues({ ...values, ...res.data })
        setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`)
    }
    return (
        <>
            <div className='container-fluid bg-secondary p-5 text-center h1'>
                <h2>Edit Hotel</h2>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-10'>
                        <br />
                        {bed && <HotelEditForm
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

export default EditHotel