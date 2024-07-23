import React, { useRef, useState } from "react";
import basil_notification_icon from './basil_notification-on-outline.png'
import group from './Group.png'
import profile from './Profile icon.png'
import settings from './Settings icon.png'
import logout from './Frame 1126.png'
import calendar from './calendar.png'
import './App.css';
import { useNavigate } from 'react-router-dom';

function Header() {

     const [modals, setModals] = useState(false);
     const [openProfile, setOpenProfile] = useState(false);
     const [isEditing, setIsEditing] = useState(false);
     const [activeSection, setActiveSection] = useState('primaryInfo');
     const fileInputRef = useRef(null);
     const navigate = useNavigate();


     const clickProfile = () =>{
        setOpenProfile(true);
     }
     const handleLogout = () =>{
        navigate('/login')
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

    const handleSectionClick=(section)=>{
      setActiveSection(section);
    }

    const handleProfileBox =() =>{
      fileInputRef.current.click();
    }

// eslint-disable-next-line
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log('Selected file:', file.name);
        // Implement file handling logic here
      }
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
          <div onClick={handleLogout} className="logout-pic"> 
            <img className="logout-img" src={logout} alt="logout" />
            <p>Logout</p></div>
            
            </div>
            </div>
           
            
            )} 
            {openProfile && (
              <div className="profile-popup">
                <div onClick={clickProfile} className="overlay"></div>
                  <div className="profile-box">
                  <div className="profile-text">
                    <h3>PROFILE</h3>
                    <div className="close-icon1" onClick= {closePopup}>&times;</div>

                    </div>
                    
                    <div className="profile-inner-box">
                      <div clasname="profile-outline">
                        <div className="profile-picture">
                      <div className="inside-profile-picture"></div>
                      </div>
                      <p className="picture-text" onClick={handleProfileBox}>CHANGE IMAGE</p>
                      </div>
                      <input
                      type="file"
                      ref={fileInputRef}
                      style={{display:'none'}}
                      onChange={handleFileChange}
                      />   
                      <div className="profile-info">
                        <div className="profile-head">
                        <h3 className="primary-info" onClick={()=>handleSectionClick('primaryInfo')}>PRIMARY INFO</h3>
                        <h3 className="account-password" onClick={()=>handleSectionClick('accountPassword')}>ACCOUNT PASSWORD</h3>
                        <h3 className="Secondary-info" onClick={()=>handleSectionClick('secondaryInfo')}>SECONDARY INFO</h3>
                        </div>
                        {activeSection === 'primaryInfo' &&(
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
                    </div>
                    </div>
                    {isEditing && (
                      <div className="save-button">
                      <button onClick = {handleSaveClick} > SAVE </button>
                      </div>
                    )}
                  </div>
                )}

{activeSection === 'accountPassword' &&(
                        <div className="details-box">
                        <div>
                        <div className="profile-input">
                        <label htmlFor="name">Account Password<span onClick={handleEditClick}>{isEditing? "CANCEL" :"CHANGE"}</span></label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            disabled={!isEditing}
                        />
                    </div>
                    </div>
                    {isEditing && (
                      <div className="save-button">
                      <button onClick = {handleSaveClick} > SAVE </button>
                      </div>
                    )}
                    </div>
                    )}

{activeSection === 'secondaryInfo' &&(
                        <div className="details-box">
                        <div>
                        <div className="profile-input">
                        <label htmlFor="name">Secondary Mail ID<span onClick={handleEditClick}>{isEditing? "CANCEL" :"EDIT"}</span></label>
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
                        <label htmlFor="email">Secondary Contact Number<span onClick={handleEditClick}>{isEditing? "CANCEL" :"EDIT"}</span></label>
                        <input
                            type="text"
                            id="empId"
                            name="empid"
                            disabled={!isEditing}
                        />
                    </div>
                    </div>
                    {isEditing && (
                      <div className="save-button">
                      <button onClick = {handleSaveClick} > SAVE </button>
                      </div>
                    )}
                    </div>
                    )}

                </div>
                  </div>
                  
                  </div>
                  
              </div>
            )}
        </header>
    )}
  

export default Header;