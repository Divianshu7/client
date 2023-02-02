// import moment from 'm'
import { SettingOutlined } from '@ant-design/icons'
import { Avatar, Card } from 'antd'
import Ribbon from 'antd/es/badge/Ribbon'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { currencyFormatter, getAccountBalance, payoutSetting } from '../actions/stripe'
const { Meta } = Card
function ConnectNav() {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state) => ({ ...state }))
    const { userExist } = user
    const [balance, setBalance] = useState(0)
    useEffect(() => {
        getAccountBalance(user.token).then((res) => {
            // console.log(res)
            setBalance(res.data)
        })
    }, [])
    const handlePayoutSettings = async () => {
        setLoading(true)
        try {
            const res = await payoutSetting(user.token)
            console.log(res)
            window.location.href = res.data
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
            toast.error('unable to access settings')
        }
    }
    return (

        <div className='d-flex justify-content-around'>
            <Card>
                <Meta avatar={<Avatar>{userExist.name[0]}</Avatar>} title={userExist.name} description={`Joined ${moment(userExist.createdAt).fromNow()}`}></Meta>
            </Card>
            {user && user.userExist && user.userExist.stripe_seller && user.userExist.stripe_seller.charges_enabled && <>
                <Ribbon text='Available' color='grey'>
                    <Card className='bg-light pt-1'>
                        {balance && balance.pending && balance.pending.map((ba, i) => (
                            <span key={i}> {currencyFormatter(ba)}</span>
                        ))}
                    </Card>
                </Ribbon>
                <Ribbon text='Payouts' color='silver'>
                    <Card onClick={handlePayoutSettings} className='bg-light pointer'>
                        <SettingOutlined className='h5 pt-2' />
                    </Card></Ribbon>
            </>}
        </div>

    )
}

export default ConnectNav