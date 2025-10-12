const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.devsramen.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SENDING_MAIL_ID,
    pass: process.env.SENDING_MAIL_PASSWORD,
  },
});

/**
 * Send Email Function
 * @param {Object} options
 * @param {string} options.to - Receiver email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text body
 * @param {string} options.html - HTML body
 */
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"TODO APP" <${process.env.SENDING_MAIL_ID}>`,
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (error) {
    throw new Error(`Email could not be sent: ${error.message}`);
  }
};

module.exports = sendEmail;
