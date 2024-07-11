import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './Components/AdminLogin/Login';
import Dashboard from './Components/Dashboard/dashboard';
import ForgotPassword from './Components/ForgotPassword/forgot-password';
import ResetPassword from './Components/ResetPassword/reset-password';
import CheckMail from './Components/CheckMail/check-mail';
import PasswordReset from './Components/PasswordReset/password-reset';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/login" element={<AdminLogin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/check-mail" element={<CheckMail />} />
                <Route path="/password-reset" element={<PasswordReset/>} />
            </Routes>
            </div>
        </Router>
    );
};

export default App;
