<<<<<<< HEAD
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './Components/AdminLogin/Login';
import ForgotPassword from './Components/ForgotPassword/forgot-password';
import ResetPassword from './Components/ResetPassword/reset-password';
import CheckMail from './Components/CheckMail/check-mail';
import PasswordReset from './Components/PasswordReset/password-reset';
=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AdminLogin from './Components/AdminLogin/Login';
// import ForgotPassword from './Components/ForgotPassword/forgot-password';
// import ResetPassword from './Components/ResetPassword/reset-password';
// import CheckMail from './Components/CheckMail/check-mail';
// import PasswordReset from './Components/PasswordReset/password-reset';
>>>>>>> e73372c3506687e6f3fb75f0c964e6e76c319f6b
import Header from './Components/Dashboard/Header';
import Sidebar from './Components/Dashboard/sidebar';
import Home from './Components/Dashboard/Home';
import Group from './Components/Groups/Group';
import ApplicationStatus from './Components/ApplicationStatus/applicationStatus';
<<<<<<< HEAD

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
           <Routes>
           <Route path="/" element={<AdminLogin onLogin={handleLogin} />} />
           <Route path="/login" element={<AdminLogin onLogin={handleLogin} />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/check-mail" element={<CheckMail />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            </Routes> 
            <div className="grid-container">
                {isLoggedIn && <Header onLogout={handleLogout} />}
               {isLoggedIn && <Sidebar />}
            <Routes>
                
                <Route path="/home" element={<AuthenticatedRoute element={<Home />} />} />
                <Route path="/group" element={<AuthenticatedRoute element={<Group />} />} />
                <Route path="/applicationStatus" element={<ApplicationStatus />} />
=======
import CollectionAgent from './Components/CollectionAgent/CollectionAgent';
import LoanCalculator from './Components/Dashboard/Loancalculator';

const App = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const handleLogin = () => {
    //     setIsLoggedIn(true);
    // };

    // const handleLogout = () => {
    //     setIsLoggedIn(false);
    // };

    // const AuthenticatedRoute = ({ element }) => {
    //     return isLoggedIn ? element : <Navigate to="/login" />;
    // };

    return (
        <Router>
            {/* <Routes>
            <Route path="/" element={<AdminLogin onLogin={handleLogin} />} />
            <Route path="/login" element={<AdminLogin onLogin={handleLogin} />} /> 
            <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/check-mail" element={<CheckMail />} />
                <Route path="/password-reset" element={<PasswordReset />} />
            </Routes> */}
            <div className="grid-container">
                <Header />
                <Sidebar />
                 {/* {isLoggedIn && <Header onLogout={handleLogout} />}
               {isLoggedIn && <Sidebar />}  */}
            <Routes>

                <Route path="/home" element={<Home />} />
                <Route path="/group" element={<Group />} />
               <Route path="/collectionagent" element={< CollectionAgent />} />
                <Route path="/applicationStatus" element={<ApplicationStatus />} />
                <Route path="/loancalculator" element={<LoanCalculator />} />
>>>>>>> e73372c3506687e6f3fb75f0c964e6e76c319f6b
            </Routes>
            </div>
        </Router>
    );
};

export default App;
