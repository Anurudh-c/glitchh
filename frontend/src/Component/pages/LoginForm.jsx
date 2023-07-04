import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../LoginPage.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                email,
                password,
            });

            if (response.status === 200) {
                // Login successful
                const userData = response.data;
                console.log('Login successful:', userData);
                navigate('/home', { state: { user: userData } }); // Pass user data as state to the home page
            } else {
                // Login failed
                console.log('Login failed');
            }
        } catch (error) {
            if (error.response) {
                // Request was made and server responded with an error status
                const errorMessage = error.response.data.message;
                toast.error(errorMessage); // Display the error message using toast
            } else {
                // Something else went wrong
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className='main-div'>
            <div className='login-content'>
                <h1 className='login-text'>Login</h1>
                <p>Please Enter Your Login Details</p>
                <form className='login-input' onSubmit={handleLogin}>
                    <input
                        className='input-field'
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className='input-field'
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input className='login-btn' type='submit' value='LOGIN' />
                    <div className='signup-navi'>
                        <p>Not yet registered..?</p>
                        <p>
                            <Link className='lo-sign' to='/signup'>
                                SignUp
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <ToastContainer position='top-right' /> 
        </div>
    );
};

export default LoginForm;
