import React, { useState } from "react";
import basil_notification_icon from './basil_notification-on-outline.png'
import group from './Group.png'
import profile from './Profile icon.png'
import settings from './Settings icon.png'
import logout from './Frame 1126.png'
import calendar from './calendar.png'
import './App.css';

 //var datetime = () => {
    //var showdate = new Date();
   // var displaytodaysdate=showdate.getDate()+'/'+showdate.getMonth()+'/'+showdate.getFullYear();
   // return(
      //  <div>

      //  </div>
   // )
//}


function Header() {

     const [modals, setModals] = useState(false);

     const profiletoggle = () => {
       setModals(!modals);
     };
  
     if(modals) {
       document.body.classList.add('active-modals')
     } else {
       document.body.classList.remove('active-modals')
     }
      

    return(
    
        <header className="header">
            
            <div className="header-left">
                <p className="user-name"> <span>Welcome Back,</span> Suresh </p>
                
            </div>
            <div className="header-right">
             
              <img src={calendar} alt="calendar" className="calendar-icon" />
              10:30 AM | 21st Dec,2023
              
              <img src={basil_notification_icon} alt="image1" className="icon-img" />
              <img onClick={profiletoggle} src={group} alt='groupimage' className="icon-img"/>
            </div>
            
           {modals && (  <div className="modals">
          <div className="profile">
            
          <div className="profile-pic">
            
             <img className="profile-img" src={profile} alt="profile" />
             <p>Profile</p></div>
          <div className="settings-pic">
             <img className="settings-img" src={settings} alt="settings" />
             <p>Settings</p></div>
          <div className="logout-pic"> 
            <img className="logout-img" src={logout} alt="logout" />
            <p>Logout</p></div>
            
            </div>
            </div>
           
            
            )} 
        </header>
    )
}

export default Header