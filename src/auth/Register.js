import React, { useState } from 'react'
import axios from "axios"
import RegisterForm from '../component/RegisterForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Register() {
    const history = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8000/api/register`, {
                name: name,
                email: email,
                password: password
            });
            console.log('register user===> ', res)
            toast("Registered succesfully!,Please login");
            history("/login")
        }
        catch (error) {
            console.log(error)
            if (error.response.status === 400) {
                toast(error.response.data);
            }
        }
    }

    return (
        <>
            <div className='container-fluid bg-secondary p-5 text-center'>
                <h1>Register</h1>

            </div>

            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <RegisterForm
                            name={name}
                            handleSubmit={handleSubmit}
                            password={password}
                            setEmail={setEmail}
                            setName={setName}
                            email={email}
                            setPassword={setPassword}
                        />
                    </div>

                </div>

            </div>
        </>
    )
}

export default Register