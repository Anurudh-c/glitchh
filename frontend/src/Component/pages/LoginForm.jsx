import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import '../LoginPage.css'



const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful
        const userData = await response.json();
        console.log(userData)
        console.log('Login successful:', userData);
        navigate('/home', { state: { user: userData } }); // Pass user data as state to the home page
      } else {
        // Login failed
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Rest of the code...


  return (
    <div className='main-div'>
    {/* <ToastContainer position='top-center' reverseOrder={false} /> */}
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
  </div>

  );
};

export default LoginForm;
