import React, {useState} from 'react';
import './userLogin.css';
import logintop from './login-top.png';
import { CiMobile4 } from "react-icons/ci";

function UserLogin() {

  const [showBlock, setShowBlock] = useState(false);

  const handleButtonClick = () =>{
    setShowBlock(!showBlock);
  }

  return (
    <div id='userlogin'>
        <div id='credi'>
        <img src={logintop} alt='logo'/>
        <div><span>Cred</span>ifie</div>
        </div>
        <div className='login-user'>
          <h2>Login / Sign Up</h2>
            <form>
                <div>
                <label>Mobile number</label>
                <span className='mobile'><CiMobile4 /></span><input
                            type="number"
                        />
                </div>
                <div className='checkbox-div' style={{display: 'flex', flexDirection: 'row', justifyContent:'left' ,textAlign:'left'}}>
                      <input style={{width: '20px'}}
                            type="checkbox"
                        />
                        <label>Receive Whatsapp Updates</label>
                </div>
                <div>
                  <button onClick={handleButtonClick}>Get OTP</button>
                </div>
                {showBlock && (
                  <div >
                    <input className='block'/>
                    <input className='block'/>
                    <input className='block'/>
                    <input className='block'/>
                    <button>Verify</button>
                    <a href='#'>Resend otp</a>
                  </div>
                      
                  )}
            </form>
        </div>
    </div>
  )
}

export default UserLogin