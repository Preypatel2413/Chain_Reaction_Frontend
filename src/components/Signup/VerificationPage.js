import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUp from './Signup';
import Login from './Login';
import './verification.css'

const Verification = () => {
  const [isSignupMode, setSignupMode] = useState(true);

  const toggleMode = () => {
    setSignupMode((prevMode) => !prevMode);
  };

  return (
    <>
    <div className="verify-container">
    <Link to="/Home" style={{ textDecoration: 'none', display: 'flex' }}>
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Chain Reaction</h1>
    </Link></div>
    
    <div className="verification-container">
      <div className="toggle-buttons">
        <button className={isSignupMode ? 'active' : ''} onClick={() => setSignupMode(true)}>
          Signup
        </button>
        <button className={!isSignupMode ? 'active' : ''} onClick={() => setSignupMode(false)}>
          Login
        </button>
      </div>

      {isSignupMode ? <SignUp /> : <Login />}
    </div>
    </>
  );
};

export default Verification;
