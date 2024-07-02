import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../AdminLogin/Login.css';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import login_ellipse1 from '../Assets/login-ellipse1.png';
import login_top_icon from '../Assets/login-top.png';
import help_circle from '../Assets/help-circle.png';
import { FaArrowLeft } from 'react-icons/fa6';

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const navigate = useNavigate();

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        setNewPassword(password);
        setPasswordStrength(validatePasswordStrength(password));
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validatePassword = (password) => {
        const lowerCaseRegex = /[a-z]/;
        const upperCaseRegex = /[A-Z]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /[$&+,:;=?@#|'<>.^*()%!-]/;

        return (
            password.length >= 8 &&
            lowerCaseRegex.test(password) &&
            upperCaseRegex.test(password) &&
            numberRegex.test(password) &&
            specialCharRegex.test(password)
        );
    };

    const validatePasswordStrength = (password) => {
        const lowerCaseRegex = /[a-z]/;
        const upperCaseRegex = /[A-Z]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /[$&+,:;=?@#|'<>.^*()%!-]/;

        let strengthScore = 0;
        if (lowerCaseRegex.test(password)) strengthScore += 1;
        if (upperCaseRegex.test(password)) strengthScore += 1;
        if (numberRegex.test(password)) strengthScore += 1;
        if (specialCharRegex.test(password)) strengthScore += 1;

        if (password.length >= 8 && strengthScore === 4) {
            return 2; // Strong
        } else if (password.length >= 8 && strengthScore >= 2) {
            return 1; // Moderate
        } else {
            return 0; // Weak
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validatePassword(newPassword)) {
            setMessage('Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        fetch(`http://localhost:3008/reset-password/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword }), 
        })
        .then(response => response.json())
        .then(data => {
            console.log("data", data);
            if (data.message === "Password has been reset successfully") {
                navigate('/password-reset');
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
        <div id="admin-page">
            <img src={login_ellipse1} id="image-eli1" alt="ellipse" />
            <div id='credi'>
                <img src={login_top_icon} alt='hand' />
                <div><span>Cred</span>ifie</div>
            </div>
            <div className='admin-login'>
                <h2>Set New Password</h2>
                <div>Your new password must be different from the previously used password.</div>
                {message && <p className="error-message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="password-container">
                        <label htmlFor='password'>New Password <a href='/reset-password' className="tooltip-container">
                            <img src={help_circle} alt="question" className="tooltip-image" />
                            <span className="tooltip-text">Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters</span>
                        </a></label>

                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={newPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                        {newPassword && (
                            <span className="eye-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? <BsEyeSlash /> : <BsEye />}
                            </span>
                        )}
                        {newPassword && (
                            <div className="password-strength-bar">
                                <div className={`strength-${passwordStrength}`}>
                                    {passwordStrength === 0 ? 'Weak' : passwordStrength === 1 ? 'Moderate' : 'Strong'}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="password-container">
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
