import React, { useState } from 'react';
import './checkMail.css';
import login_ellipse1 from '../Assets/login-ellipse1.png';
import login_top_icon from '../Assets/login-top.png';
import mail from '../Assets/mail.png';

const CheckMail = ({ email }) => {
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleResend = async () => {
        setMessage('');
        setErrorMessage('');
        try {
            const response = await fetch('http://localhost:3008/resend-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setMessage('Password reset email has been resent');
            } else {
                setErrorMessage(data.message || 'Failed to resend email');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div id="admin-page">
            <img src={login_ellipse1} id="image-eli1" alt="ellipse" />
            <div id='credi'>
                <img src={login_top_icon} alt='hand' />
                <div><span>Cred</span>ifie</div>
            </div>
            <div className='admin-login'>
                <img src={mail} id='lock'/>
                <h2>Check Your Email</h2>
                <div>We have sent a password reset link to your registered mail ID</div>
                {message && <p className="success-message">{message}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form>
                    <button type="button" onClick={handleResend}>RESEND EMAIL</button>
                    <a href="/login" className="forgot-password-link">Back to login</a>
                </form>
            </div>
        </div>
    );
};

export default CheckMail;
