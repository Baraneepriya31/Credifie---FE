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
     const [openProfile, setOpenProfile] = useState(false);
     const [isEditing, setIsEditing] = useState(false);

     const clickProfile = () =>{
        setOpenProfile(true);
     }

     const closePopup= () =>{
      setOpenProfile(false);
     }

     const handleEditClick =()=>{
      setIsEditing(!isEditing);
     }

     const handleSaveClick = () =>{
      setIsEditing(false);
     }

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
            
          <div className="profile-pic" onClick={clickProfile}>
            
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
            {openProfile && (
              <div className="profile-popup">
                <div onClick={clickProfile} className="overlay"></div>
                  <div className="profile-box">
                  <div className="close-icon1" onClick= {closePopup}>&times;</div>
                  <div className="profile-text">
                    <h3>PROFILE</h3>
                    </div>
                    
                    <div className="profile-inner-box">
                      <div className="profile-picture">
                      <div className="inside-profile-picture"></div>

                      </div>
                      
                      <div className="profile-info">
                        <div className="profile-head">
                        <h3 className="primary-info">PRIMARY INFO</h3>
                        <h3 className="account-password">ACCOUNT PASSWORD</h3>
                        <h3 className="Secondary-info">SECONDARY INFO</h3>
                        </div>

                        <div className="details-box">
                        <div>
                        <div className="profile-input">
                        <label htmlFor="name">Name<span onClick={handleEditClick}>{isEditing? "CANCEL" :"EDIT"}</span></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            disabled={!isEditing}
                        />
                    </div>
                    </div>
                    <div>
                    <div className="profile-input">
                        <label htmlFor="email">EMP ID <span onClick={handleEditClick}>{isEditing? "CANCEL" :"EDIT"}</span></label>
                        <input
                            type="text"
                            id="empId"
                            name="empid"
                            disabled={!isEditing}
                        />
                    </div>
                    </div>
                    <div>
                    <div className="profile-input">
                        <label htmlFor="email">E-Mail ID <span onClick={handleEditClick}>{isEditing? "CANCEL" :"EDIT"}</span></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            disabled={!isEditing}
                        />
                    </div>
                    </div>
                    <div>
                      <div className="profile-input">
                        <label htmlFor="number">Contact Number<span onClick={handleEditClick}>{isEditing? "CANCEL" :"EDIT"}</span> </label>
                        <input
                            type="number"
                            id="number"
                            name="contact number"
                            disabled={!isEditing}
                        />
                    </div>
                    </div>
                    <div>
                      <div className="profile-input">
                        <label htmlFor="text">Base Location<span onClick={handleEditClick}>{isEditing? "CANCEL" :"EDIT"}</span> </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            disabled={!isEditing}
                        />
                        {/* <span>Edit</span> */}
                    </div>
                    </div>
                    {isEditing && (
                      <button onClick = {handleSaveClick} > SAVE </button>
                    )}
                  </div>
                </div>
                  </div>
                  </div>
              </div>
            )}
        </header>
    )
}

export default Header