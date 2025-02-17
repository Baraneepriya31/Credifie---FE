import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CollectionAgent from './Components/CollectionAgent/CollectionAgent';
import LoanCalculator from './Components/Dashboard/Loancalculator';
import AdminLogin from './Components/AdminLogin/Login';
import ForgotPassword from './Components/ForgotPassword/forgot-password';
import ResetPassword from './Components/ResetPassword/reset-password';
import CheckMail from './Components/CheckMail/check-mail';
import PasswordReset from './Components/PasswordReset/password-reset';
import Header from './Components/Dashboard/Header';
import Sidebar from './Components/Dashboard/sidebar';
import Home from './Components/Dashboard/Home';
import Group from './Components/Groups/Group';
import ApplicationStatus from './Components/ApplicationStatus/applicationStatus';
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    const AuthenticatedRoute = ({ element }) => {
        return isLoggedIn ? element : <Navigate to="/login" />;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminLogin onLogin={handleLogin} />} />
                <Route path="/login" element={<AdminLogin onLogin={handleLogin} />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/check-mail" element={<CheckMail />} />
                <Route path="/password-reset" element={<PasswordReset />} />
            </Routes>
            {isLoggedIn && (
                <div className="grid-container">
                    <Header onLogout={handleLogout} />
                    <Sidebar />
                    <Routes>
                        <Route path="/home" element={<AuthenticatedRoute element={<Home />} />} />
                        <Route path="/group" element={<AuthenticatedRoute element={<Group />} />} />
                        <Route path="/collectionagent" element={<AuthenticatedRoute element={<CollectionAgent />} />} />
                        <Route path="/applicationStatus" element={<AuthenticatedRoute element={<ApplicationStatus />} />} />
                        <Route path="/loancalculator" element={<AuthenticatedRoute element={<LoanCalculator />} />} />
                    </Routes>
                </div>
            )}
        </Router>
    );
};

export default App;
