import React, { useState } from 'react';
import '../AdminLogin/Login.css';
import login_ellipse1 from '../Assets/login-ellipse1.png';
import login_top_icon from '../Assets/login-top.png';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3008/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            if (data.message === 'Reset token generated and email sent') {
                setMessage(data.message); 
                // setTimeout(() => {
                //     navigate('/check-mail', { state: { email } });
                // }, 2000);
                 navigate('/check-mail', { state: { email } }); 
            } else {
                setMessage(data.message || 'Password reset failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        });
    };

    return (
        <div id="admin-page">
            <img src={login_ellipse1} id="image-eli1" alt="ellipse" />
            <div id="credi">
                <img src={login_top_icon} alt="hand" />
                <div><span>Cred</span>ifie</div>
            </div>
            <div className="admin-login">
                <h2>Forgot Password?</h2>
                <div>No worries, we'll send you reset instructions</div>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <button type="submit">REQUEST NEW PASSWORD</button>
                    <a href="/login" className="forgot-password-link">Back to login</a>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
