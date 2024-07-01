import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './Components/AdminLogin/Login';
import ForgotPassword from './Components/ForgotPassword/forgot-password';
import ResetPassword from './Components/ResetPassword/reset-password';
import CheckMail from './Components/CheckMail/check-mail';
import PasswordReset from './Components/PasswordReset/password-reset';
import Header from './Components/Dashboard/Header';
import Sidebar from './Components/Dashboard/sidebar';
import Home from './Components/Dashboard/Home';
import './App.css';
import ApplicationStatus from './Components/ApplicationStatus/applicationStatus';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const AuthenticatedRoute = ({ element }) => {
        return isLoggedIn ? element : <Navigate to="/login" />;
    };

    return (
        <Router>
            
            <div className="grid-container">
                {isLoggedIn && <Header onLogout={handleLogout} />}
               {isLoggedIn && <Sidebar />}
            <Routes>
                <Route path="/" element={<AdminLogin onLogin={handleLogin} />} />
                <Route path="/login" element={<AdminLogin onLogin={handleLogin} />} />
                <Route path="/home" element={<AuthenticatedRoute element={<Home />} />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/check-mail" element={<CheckMail />} />
                <Route path="/password-reset" element={<PasswordReset />} />
                <Route path="/applicationStatus" element={<ApplicationStatus />} />
            </Routes>
            </div>
        </Router>
    );
};

export default App;
