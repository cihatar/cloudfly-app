const nodemailer = require("nodemailer");

const sendResetPasswordEmail = ({ name, email, token }) => {
    if (!email || !token) return;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.EMAIL_SERVICE_EMAIL,
            pass: process.env.EMAIL_SERVICE_PASSWORD,
        },
        secure: true,
    });

    const message = `<div style="padding: 20px; background-color: #edf5ff; border-radius: 16px;">
        <h1 style="font-size: 36px; margin: 0px;">Hello, ${name}!</h1>
        <p style="font-size: 16px;">
            Your password reset request has been successfully received. 
            Click the link below to create your new password.
        </p>
        <a href="${process.env.FRONTEND_URL}/auth/reset-password?token=${token}" 
        style="display: inline-block; padding: 10px 20px; background-color: #007bff; 
        color: #ffffff; text-decoration: none; border-radius: 16px; text-align: center;">
            Reset Password
        </a>
        </div>
    `

    const mailData = {
        from: process.env.EMAIL_SERVICE_EMAIL,
        to: email,
        subject: "Reset Password",
        html: message,
    };

    transporter.sendMail(mailData, function (err, info) {
        if (err) console.log(err);
    });
};

module.exports = sendResetPasswordEmail;
