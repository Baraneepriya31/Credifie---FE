import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn';
import '../AdminLogin/Login.css';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import login_ellipse1 from '../Assets/login-ellipse1.png';
import login_top_icon from '../Assets/login-top.png';
import help_circle from '../Assets/help-circle.png';
import { FaArrowLeft } from 'react-icons/fa';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const navigate = useNavigate();

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        const evaluation = zxcvbn(newPassword);
        setPasswordStrength(evaluation.score);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        if (!validatePassword(password)) {
            setMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3008/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const responseBody = await response.json();

            if (!response.ok) {
                console.error('Response status:', response.status);
                console.error('Response message:', responseBody.message);
                throw new Error('Network response was not ok');
            }

            setMessage('Password has been reset successfully');
            navigate('/password-reset');
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
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
                <h2>Set New Password</h2>
                <div>Your new password must be different from the previously used password.</div>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="password-input-container">
                        <label htmlFor="password">New Password <img src={help_circle} alt='question'/></label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        {password && (
                            <span className="eye-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? <BsEyeSlash /> : <BsEye />}
                            </span>
                        )}
                        {password && (
                            <div className="password-strength-bar">
                                <div className={`strength-fill strength-${passwordStrength}`} />
                            </div>
                        )}
                    </div>
                    <div className="password-input-container">
                        <label htmlFor="confirm-password">Confirm New Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="confirm-password"
                            name="confirm-password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                        {confirmPassword && (
                            <span className="eye-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? <BsEyeSlash /> : <BsEye />}
                            </span>
                        )}
                    </div>
                    <button type="submit">RESET PASSWORD</button>
                    <a href="/login" className="forgot-password-link"><FaArrowLeft />Back to login</a>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
