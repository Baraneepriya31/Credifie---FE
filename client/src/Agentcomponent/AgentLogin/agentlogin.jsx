import React, {useState} from 'react';
import './agentlogin.css';
import logo from './login-top.png';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function Agentlogin() {
     
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [id, setId] =useState('');
  const navigate = useNavigate();
 
   

  const handlesubmit=async(e) =>{
    e.preventDefault();
        if(id === '' || password === '') {
          alert("All feilds required")
        }else{
          navigate('/AgentHome');
        }
  }
   
  

  

const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

  return (
    <div className='agent-login'>
        <img className='logo' src={logo} alt="logo" />
        <div className='logo-name'>Cred<span>ifie</span></div>
     <div className='agent-container'>
           <p className="login">Login</p>
           <form>
            <div className='form'>
                <label className='emplyoee'>Employee ID</label>
                <input type="text"  value={id} onChange={(e) => setId(e.target.value)} />
                <label className='employee'>Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {password && (
                            <span className="eye-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? <BsEyeSlash /> : <BsEye />}
                            </span>
                        )}
              <button className='login-btn'onSubmit={handlesubmit} >Login</button>
            </div>
           </form>
     </div>
    </div>
  )
}

export default Agentlogin
