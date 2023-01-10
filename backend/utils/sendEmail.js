const nodemailer = require("nodemailer");
const cachAsyncError = require("../middleware/cachAsyncError");

const sendEmail = cachAsyncError(async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMPT_MAILTYPE,
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: true,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
});

module.exports = sendEmail;
