const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cors = require('cors');  
const bodyParser = require('body-parser');

const app = express();
const port = 3008;


//Middleware
app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());

//Database Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',          
    password: '',   
    database: 'admindb'    
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'karthika8849@gmail.com',  
        pass: 'hubnsjawtqsxcpli'      
    }
});


//Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Replace this query with your actual query to verify user credentials
    const query = 'SELECT * FROM admin WHERE email = ? AND password = ?';
    connection.query(query, [email, password], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ message: 'Database error' });
            return;
        }

        if (results.length > 0) {
            res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    });
});


    

app.post('/reset-password', (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(20).toString('hex');
    const expires = Date.now() + 3600000; // 1 hour

    const query = 'UPDATE admin SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE email = ?';
    connection.query(query, [token, expires, email], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ message: 'Database error' });
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Email not found' });
            return;
        }

        const mailOptions = {
            from: 'karthika8849@gmail.com', // replace with your Gmail address
            to: email,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process:\n\n
                http://localhost:3000/reset-password/${token}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error('Error sending email:', err);
                res.status(500).json({ message: 'Error sending email' });
            } else {
                res.status(200).json({ message: 'Reset token generated and email sent', token });
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
