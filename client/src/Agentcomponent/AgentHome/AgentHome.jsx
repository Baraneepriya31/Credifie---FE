import React from 'react';
import './AgentHome.css';
import logo from './login-top.png';
function AgentHome() {
  return (
    <div className="home-container">
      <div className='logo-container'>
            <img className="home-logo" src={logo} alt="logo" />
            <div className='logo-name'>Cred<span>ifie</span></div>
      </div>
    </div>
  )
}

export default AgentHome
