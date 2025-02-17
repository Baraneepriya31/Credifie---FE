import React from "react";
import logo from './Group (1).png';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <img src={logo} className='logo_img' alt="Logo" />
          <p className="logo_name">Cred<span>ifie</span></p>
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="#h" onClick={() => handleNavigate('/Home')}>
            <p className='nav-menu'>Dashboard</p>
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#g" onClick={() => handleNavigate('/Group')}>
            <p className='nav-menu'>Groups</p>
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#c" onClick={() => handleNavigate('/collectionagent')}>
            <p className='nav-menu'>Collection Agent</p>
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#a" onClick={() => handleNavigate('/applicationStatus')}>
            <p className='nav-menu'>Application Status</p>
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
