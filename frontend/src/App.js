import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Component/pages/LoginForm';
import HomePage from './Component/pages/HomePage';
import UserRegistrationForm from './Component/pages/UserRegistrationForm';
import UserProfilePage from './Component/pages/UserProfilePage';





function App() {
  return (
    <div className="App">
     
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/signup" element={<UserRegistrationForm/>} />
          <Route path="/user-profile" element={<UserProfilePage/>} />
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
