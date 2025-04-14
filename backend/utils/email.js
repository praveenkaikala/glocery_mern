import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const sendEmail = async (email, name,verificationLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Verify your email to get started with Blinkit',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f7f7f7;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #ffffff;
                padding: 40px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
              }
              .logo {
                text-align: center;
                margin-bottom: 20px;
              }
              .logo img {
                height: 40px;
              }
              .header {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 10px;
                color: #333333;
              }
              .content {
                font-size: 16px;
                color: #555555;
                margin-bottom: 30px;
              }
              .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #0f9d58;
                color: white;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
              }
              .footer {
                font-size: 12px;
                color: #999999;
                margin-top: 40px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">
                <img src="https://blinkit.com/images/favicon/apple-icon-180x180.png" alt="Blinkit Logo" />
              </div>
              <div class="header">Hi ${name},</div>
              <div class="content">
                Thanks for signing up with Blinkit! Please verify your email address by clicking the button below:
              </div>
              <div style="text-align: center;">
                <a class="button" href="${verificationLink}" target="_blank">Verify Email</a>
              </div>
              <div class="content" style="margin-top: 30px;">
                If you didn’t request this, you can safely ignore this email.
              </div>
              <div class="footer">
                &copy; ${new Date().getFullYear()} Blinkit. All rights reserved.
              </div>
            </div>
          </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error("Email send unsuccessful");
  }
};


export const sentOtp = async (userName,email,otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Forgot Password From Blinkit',
      html: `
       <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f7f7f7;
      padding: 20px;
    }
    .email-container {
      background-color: #fff;
      border-radius: 10px;
      max-width: 500px;
      margin: auto;
      padding: 30px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .header {
      text-align: center;
      font-size: 24px;
      color: #00b300;
      margin-bottom: 20px;
      font-weight: 600;
    }
    .otp-box {
      background-color: #f0f0f0;
      padding: 20px;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 6px;
      text-align: center;
      border-radius: 8px;
      color: #333;
    }
    .footer {
      margin-top: 25px;
      font-size: 14px;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Your Blinkit OTP</div>
    <p>Hi <strong>${userName}</strong>,</p>
    <p>Your One-Time Password (OTP) for verification is:</p>
    <div class="otp-box">${otp}</div>
    <p>This OTP is valid for the next 1 hour. Please do not share it with anyone.</p>
    <div class="footer">
      Thank you for choosing Blinkit!<br>
      — Team Blinkit
    </div>
  </div>
</body>
</html>

      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
  }
};