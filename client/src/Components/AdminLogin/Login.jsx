import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import login_ellipse1 from '../Assets/login-ellipse1.png';
import login_top_icon from '../Assets/login-top.png';


const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
    
        if (email === '' || password === '') {
            setErrorMessage('Email and Password are required.');
        } else {
            setErrorMessage('');
            try {
                const response = await fetch('http://localhost:3008/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
    
                if (!response.ok) {
                    const responseBody = await response.text();
                    console.error('Response status:', response.status);
                    console.error('Response message:', responseBody);
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.json();
                console.log('Login data:', data); 
                // navigate('/dashboard');
    
                if (data.message ==="Login successful") {
                    console.log('Navigating to dashboard...'); 
                    navigate('/dashboard');
                } else {
                    setErrorMessage(data.message || 'Login failed');
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };
    
    

    return (
        <div id='admin-page'>
            <img src={login_ellipse1} id="image-eli1" alt="ellipse" />
            <div id='credi'>
                <img src={login_top_icon} alt='hand' />
                <div><span>Cred</span>ifie</div>
            </div>
            <div className='admin-login'>
                <h2>Welcome</h2>
                <div>Please sign in to continue</div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Id</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="password-container">
                        <label htmlFor="password">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {password && (
                            <span className="eye-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? <BsEyeSlash /> : <BsEye />}
                            </span>
                        )}
                    </div>
                    <button type="submit">SIGN IN</button>
                </form>
                <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
            </div>
        </div>
    );
};

export default AdminLogin;
