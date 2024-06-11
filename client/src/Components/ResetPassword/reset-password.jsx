import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../AdminLogin/Login.css';
import login_ellipse1 from '../Assets/login-ellipse1.png';
import login_top_icon from '../Assets/login-top.png';



const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate= useNavigate();

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }
        
        fetch(`http://localhost:3008/reset-password/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setMessage('Password has been reset successfully.');
                navigate('/login');
            } else {
                setMessage(data.message || 'Password reset failed.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        });
    };

    return (
        <div id='admin-page'>
            <img src={login_ellipse1} id="image-eli1" alt="ellipse" />
            <div id='credi'>
                <img src={login_top_icon} alt='hand' />
                <div><span>Cred</span>ifie</div>
            </div>
            <div className='admin-login'>
                <h2>Set New Password</h2>
                <div>Your new password must be different to previously used password</div>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                <label htmlFor="password">New Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <div>
                <label htmlFor="confirm-password">Confirm New Password</label>
                <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                /></div>
                
                    <button type="submit">RESET PASSWORD</button>
                    <a href="/login" className="forgot-password-link">
                        <FaArrowLeft /> Back to login
                    </a>
                    
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
