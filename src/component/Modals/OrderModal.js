import { Modal } from 'antd'
import React from 'react'

function OrderModal({ showModel, setShowModel, session, orderedBy }) {
    const handleOk = () => {
        setShowModel(!showModel)
    }
    return (
        <Modal title='Order Payment Info' onCancel={handleOk} onOk={handleOk} open={true}>
            <p>Payment Intent: {session.payment_intent}</p>
            <p>Payment status: {session.payment_status}</p>
            <p>Payment total: {session.currency.toUpperCase()}{" "}{session.amount_total / 100}</p>
            <p>Stripe customer id: {session.id}</p>
            <p>Customer: {orderedBy.name}</p>

        </Modal>
    )
}

export default OrderModal
