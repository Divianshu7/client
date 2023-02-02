import { LoadingOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserInLocalStorage } from '../actions/auth'
import { getAccountStatus } from '../actions/stripe'

function StripeCallback() {
    const { user } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()
    useEffect(() => {
        if (user && user.token) {
            accountStatus()
        }
    }, [user])
    const accountStatus = async () => {
        try {
            const res = await getAccountStatus(user.token)
            // console.log('account status==>', res)
            updateUserInLocalStorage(res.data, () => {
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: res.data
                })
                // window.location.href = '/dashboard/seller'
            })

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='d-flex justify-content-center p-5'>
            <LoadingOutlined className='display-1 h1 p-5 text-danger' />
        </div>
    )
}

export default StripeCallback