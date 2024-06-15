const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


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
        'SELECT * FROM admin WHERE email = ? AND password = ?',
        [email, password],
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

            transporter.sendMail(mailOptions, (error, response) => {
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

// Endpoint to handle resetting the password
app.post('/reset-password/:token', (req, res) => {
    const token = req.params.token;
    const newPassword = req.body.newPassword;

    connection.query(
        'SELECT * FROM admin WHERE resetPasswordToken = ? AND resetPasswordExpires > ?',
        [token, Date.now()],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
            if (result.length === 0) {
                res.status(400).json({ message: 'Password reset token is invalid or has expired' });
                return;
            }

            // Directly save the new password (plaintext, not recommended in production)
            connection.query(
                'UPDATE admin SET password = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE email = ?',
                [newPassword, result[0].email],
                (error) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ message: 'Internal server error' });
                        return;
                    }
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

            transporter.sendMail(mailOptions, (error, response) => {
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
