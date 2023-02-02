import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function TopNav() {
    const histor = useNavigate()
    const { user } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()
    const logout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
        window.localStorage.removeItem('auth')
        histor('/login')
    }
    return (
        <div className='nav bg-light d-flex justify-content-between'>
            <Link className='nav-link' to="/">Home</Link>
            {user !== null && <>
                <Link className='nav-link' to='/dashboard'>Dashboard</Link>
            </>}
            {user === null && <>
                <Link className='nav-link' to='/login'>Login</Link>
                <Link className='nav-link' to='/register'>Register</Link>
            </>}
            {user !== null && <>
                <a onClick={logout} className='nav-link pointer' >Logout</a>
            </>}
        </div>
    )
}

export default TopNav