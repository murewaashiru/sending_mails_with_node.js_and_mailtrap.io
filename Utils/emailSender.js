const nodemailer = require('nodemailer');
module.exports = {
  sendEmail: async (options) => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const message = {
      from: `${process.env.SENDER_NAME} <${process.env.SENDER_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      html: options.message,
    };
    await transporter.sendMail(message);
  },
};
