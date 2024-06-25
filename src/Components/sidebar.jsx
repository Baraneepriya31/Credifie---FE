   import React from "react";
   import logo from './Group (1).png'
   import { Link } from 'react-router-dom';
   import { useNavigate } from 'react-router-dom';

  function Sidebar({openSidebarToggle, OpenSidebar}) {

   const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

     return (
     <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
         <div className='sidebar-title'>
         <div className='sidebar-brand'>
             <img src={logo}  className='logo_img'/>
            <p className="logo_name">Cred<span>ifie</span></p>
        </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
     </div>
          
         <ul className='sidebar-list'>
         <li className='sidebar-list-item'>
         <a href="">
         <Link to="/" className='nav-menu'>Dashboard</Link>
             
        </a>
         </li>
         <li className='sidebar-list-item'>
        <a href="">
           <p onClick={() => handleNavigate('/group')}  className='nav-menu'>Groups</p>
        </a>
        </li>
        
        <li className='sidebar-list-item'>
        <a href="">
        <Link to="/" className='nav-menu'>Collection Agent</Link>
        </a>
        </li>
        <li className='sidebar-list-item'>
        <a href="">
        <Link to="/" className='nav-menu'>Application Status</Link>
        </a>
        </li>
        </ul>
                      
        </aside>
    )
}

export default Sidebar