import { LoadingOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { StripeSuccessRequest } from '../actions/stripe'

function StripeSuccess() {
    const { user } = useSelector((state) => ({ ...state }))
    const { token } = user
    const history = useNavigate()
    const params = useParams()
    useEffect(() => {
        StripeSuccessRequest(token, params.hotelId).then((res) => {
            console.log(res.data)
            if (res.data.success) {
                history('/dashboard')
            }
            else {
                history('/stripe/cancel')
            }
        })
    }, [params.hotelId])
    return (
        <div className='container'>
            <div className='col text-center d-flex justify-content-center p-5'>
                <LoadingOutlined className='display-1 text-danger p-5 ' />
            </div>
        </div>
    )
}

export default StripeSuccess