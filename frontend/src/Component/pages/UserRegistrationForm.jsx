import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../LoginPage.css';

const UserRegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        // Registration successful
        toast.success('Registration successful');
        navigate('/'); // Redirect to the login page
      } else {
        // Registration failed
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Registration failed';
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='main-div-signup'>
      <ToastContainer position='top-center' />
      <div className='login-content'>
        <h1 className='login-text'>SignUp</h1>
        <p>Please Enter Your SignUp Details</p>
        <form className='login-input' onSubmit={handleRegistration}>
          <input
            className='input-field'
            type='text'
            name='username'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <input className='login-btn' type='submit' value='SIGNUP' />
          <div className='signup-navi'>
            <p>Already a member..?</p>
            <p>
              <Link className='lo-sign' to='/'>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
