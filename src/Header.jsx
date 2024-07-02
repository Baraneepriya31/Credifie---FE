import React from "react";
import {  BsJustify} from "react-icons/bs";
import basil_notification_icon from './basil_notification-on-outline.png'
import group from './Group.png'

 //var datetime = () => {
    //var showdate = new Date();
   // var displaytodaysdate=showdate.getDate()+'/'+showdate.getMonth()+'/'+showdate.getFullYear();
   // return(
      //  <div>

      //  </div>
   // )
//}


function Header() {
    return(
        <header className="header">
            <div className="menu-icon">
            <BsJustify className="icon-img"/>
            </div>
            <div className="header-left">
                <p className="user-name"> <span>Welcome Back,</span> Suresh </p>
            </div>
            <div className="header-right">

              <img src={basil_notification_icon} alt="image" className="icon-img" />
              <img src={group} className="icon-img"/>
            </div>
        </header>
    )
}

export default Header