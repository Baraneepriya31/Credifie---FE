const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const app = express();
const PORT = 3008;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/admindb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
  console.log('MongoDB connected successfully');

  const adminSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  });

  const Admin = mongoose.model('Admin', adminSchema);

  const groupSchema = new mongoose.Schema({
    groupName: String,
    groupLeader: {
      name: String,
      contactNumber: String,
      panNumber: String,
    },
    subLeader: {
      name: String,
      contactNumber: String,
      panNumber: String,
    },
    members: [
      {
        name: String,
        contactNumber: String,
        panNumber: String,
      },
    ],
  });

  const Group = mongoose.model('Group', groupSchema);

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'karthika8849@gmail.com',
      pass: 'hubnsjawtqsxcpli',
    },
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(400).json({ message: 'Email not found' });
      }

      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      res.json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error.message);
      console.error('Stack trace:', error.stack);
      res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
  });

  app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ success: false, message: 'No account with that email address exists' });
        }

        // Generate a reset token
        const token = crypto.randomBytes(20).toString('hex');
        admin.resetPasswordToken = token;
        admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await admin.save();

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'karthika8849@gmail.com',
                pass: 'hubnsjawtqsxcpli',
            },
        });

        const mailOptions = {
            to: admin.email,
            from: 'karthika8849@gmail.com',
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                   Please click on the following link, or paste this into your browser to complete the process:\n\n
                   http://localhost:3000/reset-password/${token}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error during password reset:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
    }
});


  app.post('/resend-email', async (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(20).toString('hex');
    const expiration = Date.now() + 3600000; // 1 hour

    try {
      const admin = await Admin.findOneAndUpdate(
        { email },
        { resetPasswordToken: token, resetPasswordExpires: expiration }
      );

      if (!admin) {
        return res.status(400).json({ message: 'No account with that email address exists' });
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
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/reset-password/:token', async (req, res) => {
    const { password } = req.body;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.' });
    }

    try {
      const admin = await Admin.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!admin) {
        return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
      }

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
      admin.resetPasswordToken = undefined;
      admin.resetPasswordExpires = undefined;

      await admin.save();

      res.json({ message: 'Password has been reset' });
    } catch (error) {
      console.error('Error during password reset:', error.message);
      console.error('Stack trace:', error.stack);
      res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
  });

  app.post('/add-group', async (req, res) => {
    const { groupName, groupLeader, subLeader, members } = req.body;

    const newGroup = new Group({
      groupName,
      groupLeader,
      subLeader,
      members,
    });

    try {
      await newGroup.save();
      res.status(200).json({ message: 'Group added successfully' });
    } catch (error) {
      console.error('Error adding group:', error);
      res.status(500).json({ message: 'Failed to add group' });
    }
  });


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
