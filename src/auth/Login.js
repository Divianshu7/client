import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { login } from '../actions/auth';
import LoginForm from '../component/LoginForm'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
function Login() {
    const dispatch = useDispatch()
    const [password, setPassword] = useState('12345678');
    const [email, setEmail] = useState('divianshu1@gmail.com');
    const history = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            let res = await login({ email, password })
            if (res.data) {
                // console.log('save user res in redux and local storage then redirect==> ')
                console.log(res.data)
                window.localStorage.setItem('auth', JSON.stringify(res.data))
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: res.data
                })
                history('/')
            }
        } catch (err) {
            console.log(err)
            if (err.respose.status === 400) toast.error(err.respose.data)
        }
    }
    return (
        <>
            <div className='container-fluid bg-secondary p-5 text-center'>
                <h1>Login</h1>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <LoginForm
                            handleSubmit={handleSubmit}
                            password={password}
                            setEmail={setEmail}
                            email={email}
                            setPassword={setPassword}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login