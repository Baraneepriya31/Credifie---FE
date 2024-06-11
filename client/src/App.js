import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './Components/AdminLogin/Login';
import Dashboard from './Components/Dashboard/dashboard';
import ForgotPassword from './Components/ForgotPassword/forgot-password';
import ResetPassword from './Components/ResetPassword/reset-password';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                {/* <Route path="/login" element={<AdminLogin />} /> */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password:token" element={<ResetPassword />} />
            </Routes>
        </Router>
    );
};

export default App;
