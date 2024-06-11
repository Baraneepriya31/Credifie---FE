const nodemailer = require('nodemailer');

// Create a transporter using Gmail SMTP settings
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "karthika8849@gmail.com",
        pass: "hubnsjawtqsxcpli"
    },
});

// Define and export the sendEmail function
    const mailOptions = {
        from: "karthika8849@gmail.com", // Sender email address
        to:"karthika8849@gmail.com", // Recipient email address
        subject:"sending email", // Email subject
        text: "Hi Welcome to our website" // Email body (plain text)
    };
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
});
