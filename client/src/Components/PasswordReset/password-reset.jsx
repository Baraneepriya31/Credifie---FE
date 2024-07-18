import React, {useNavigate}  from 'react';
import '../CheckMail/checkMail.css';
import login_ellipse1 from '../Assets/login-ellipse1.png';
import login_top_icon from '../Assets/login-top.png';
import lock from '../Assets/lock.png';


const PasswordReset = () => {
    const navigate = useNavigate();

    const handleBacktoLogin=()=>{
        navigate('/login')
    }

    return (
        <div id="admin-page">
            <img src={login_ellipse1} id="image-eli1" alt="ellipse" />
            <div id='credi'>
                <img src={login_top_icon} alt='hand' />
                <div><span>Cred</span>ifie</div>
            </div>2
            <div className='admin-login'>
                <img src={lock} id='lock' alt='lock'/>
                <h2>Password reset</h2>
                <div>We have sent a password reset link to your registered mail ID</div>
            
            <form>
            <button onClick={handleBacktoLogin}>BACK TO LOGIN</button>

        </form>
        </div>
        </div>
    );
};

export default PasswordReset;
