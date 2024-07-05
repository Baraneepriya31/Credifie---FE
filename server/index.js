const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');


const app = express();
const port = 3008;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'admindb'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'karthika8849@gmail.com',
        pass: 'hubnsjawtqsxcpli', 
    },
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    connection.query(
        'SELECT * FROM admin WHERE email = ?',
        [email],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
            if (result.length === 0) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            const storedPassword = result[0].password;

            // Compare the provided password with the stored plain text password
            if (password !== storedPassword) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            res.status(200).json({ message: 'Login successful' });
        }
    );
});


// Endpoint to handle password reset request
app.post('/forgot-password', (req, res) => {
    const email = req.body.email;
    const token = crypto.randomBytes(20).toString('hex');
    const expiration = Date.now() + 3600000; // 1 hour

    // Save the token and expiration to the database
    connection.query(
        'UPDATE admin SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE email = ?',
        [token, expiration, email],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(400).json({ success: false, message: 'No account with that email address exists' });
                return;
            }

            const mailOptions = {
                to: email,
                from: 'karthika8849@gmail.com',
                subject: 'Password Reset',
                text: `You are receiving this because you have requested the reset of the password for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process:\n\n
                http://localhost:3000/reset-password/${token}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`,
            };

            transporter.sendMail(mailOptions, (error, _response) => {
                if (error) {
                    console.error('There was an error: ', error);
                    res.status(500).json({ success: false, message: 'Email could not be sent' });
                } else {
                    res.status(200).json({ success: true, message: 'Password reset email sent successfully2' });
                }
            });
        }
    );
});




const validatePasswordStrength = (password) => {
    const lowerCaseRegex = /[a-z]/;
    const upperCaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[$&+,:;=?@#|'<>.^*()%!-]/;

    return (
        password.length >= 7 &&
        lowerCaseRegex.test(password) &&
        upperCaseRegex.test(password) &&
        numberRegex.test(password) &&
        specialCharRegex.test(password)
    );
};

app.post('/reset-password/:token', (req, res) => {
    const token = req.params.token;
    const newPassword = req.body.newPassword;

    console.log("Received token:", token); // Debugging log
    console.log("Received new password:", newPassword); // Debugging log

    connection.query(
        'SELECT * FROM admin WHERE resetPasswordToken = ? AND resetPasswordExpires > ?',
        [token, Date.now()],
        (err, result) => {
            if (err) {
                console.error('Error in SELECT query:', err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
            if (result.length === 0) {
                console.log('Invalid or expired token');
                res.status(400).json({ message: 'Password reset token is invalid or has expired' });
                return;
            }

            const user = result[0];

            // Check if the new password meets the criteria
            if (!validatePasswordStrength(newPassword)) {
                res.status(400).json({
                    message: 'Password must be at least 7 characters long and include uppercase letters, lowercase letters, numbers, and special characters.',
                });
                return;
            }

            // Save the new password in plain text (not recommended)
            connection.query(
                'UPDATE admin SET password = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE email = ?',
                [newPassword, user.email],
                (error, updateResult) => {
                    if (error) {
                        console.error('Error in UPDATE query:', error);
                        res.status(500).json({ message: 'Internal server error' });
                        return;
                    }
                    console.log('Password updated successfully');
                    res.status(200).json({ message: 'Password has been reset successfully' });
                }
            );
        }
    );
});


// Endpoint to handle resending password reset email
app.post('/resend-email', (req, res) => {
    const email = req.body.email;
    const token = crypto.randomBytes(20).toString('hex');
    const expiration = Date.now() + 3600000; // 1 hour

    // Save the new token and expiration to the database
    connection.query(
        'UPDATE admin SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE email = ?',
        [token, expiration, email],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(400).json({ message: 'No account with that email address exists' });
                return;
            }

            const mailOptions = {
                to: email,
                from: 'karthika8849@gmail.com',
                subject: 'Password Reset',
                text: `You are receiving this because you have requested the reset of the password for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process:\n\n
                http://localhost:3000/reset-password/${token}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`,
            };

            transporter.sendMail(mailOptions, (error, _response) => {
                if (error) {
                    console.error('There was an error: ', error);
                    res.status(500).json({ message: 'Email could not be sent' });
                } else {
                    res.status(200).json({ message: 'Password reset email sent successfully' });
                }
            });
        }
    );
});


// POST endpoint to add group data
app.post('/addGroup', (req, res) => {
    const { groupName, groupLeader, contactNumber, panNumber, subLeader, subContactNumber, subPanNumber, members } = req.body;

    // Log the request body
    console.log('Received data:', req.body);

    if (!groupName || !groupLeader || !contactNumber || !panNumber || !subLeader || !subContactNumber || !subPanNumber || !members) {
        res.status(400).send('Missing required fields');
        return;
    }

    const sql = `INSERT INTO groups (groupName, groupLeader, contactNumber, panNumber, subLeader, subContactNumber, subPanNumber, members)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    connection.query(sql, [groupName, groupLeader, contactNumber, panNumber, subLeader, subContactNumber, subPanNumber, JSON.stringify(members)], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        res.status(200).send('Group added successfully!');
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
