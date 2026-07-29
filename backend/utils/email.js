const nodemailer = (() => {
  try {
    return require('nodemailer');
  } catch (error) {
    return null;
  }
})();

const getTransporter = (user, pass, host, port) => {
  if ((host && host.includes('gmail')) || (user && user.includes('gmail'))) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
      tls: { rejectUnauthorized: false }
    });
  }
  return nodemailer.createTransport({
    host: host || 'smtp.gmail.com',
    port: parseInt(port) || 587,
    secure: parseInt(port) === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
  });
};

/**
 * Sends an OTP email to the user.
 * If SMTP configurations are missing or nodemailer is not installed, it falls back to printing to the terminal.
 * @param {string} email
 * @param {string} code
 */
const sendOtpEmail = async (email, code) => {
  const mailSubject = '🔑 Your One-Time Login Code';
  const mailText = `Your one-time login code is: ${code}. This code is valid for 60 seconds.`;
  const mailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
      <h2 style="color: #0f172a; border-bottom: 2px solid #0d5c3a; padding-bottom: 10px;">EthiZone Login Verification</h2>
      <p style="font-size: 16px; color: #4a5568;">You requested a One-Time Login Code. Use the code below to complete your login:</p>
      <div style="background-color: #f7fafc; border: 1px dashed #cbd5e0; padding: 20px; text-align: center; margin: 20px 0; border-radius: 6px;">
        <span style="font-size: 36px; font-weight: bold; letter-spacing: 6px; color: #0d5c3a; font-family: monospace;">${code}</span>
      </div>
      <p style="font-size: 14px; color: #e53e3e; font-weight: bold;">Warning: This code is only valid for 60 seconds.</p>
      <p style="font-size: 12px; color: #a0aec0; margin-top: 30px; border-top: 1px solid #edf2f7; padding-top: 15px;">If you did not request this login code, please ignore this email.</p>
    </div>
  `;

  // Always log the code to the terminal console so it can be verified in development
  const border = '═'.repeat(60);
  const contentWidth = 58;
  const toLine = ` Recipient: ${email}`.padEnd(contentWidth);
  const codeLine = ` Code:      ${code} (Expires in 60s)`.padEnd(contentWidth);
  
  console.log(`
╔${border}╗
║ 📧 EMAIL OUTBOX [ONE-TIME PASSWORD]                        ║
╠${border}╣
║${toLine}║
║${codeLine}║
║ Subject:  🔑 Your One-Time Login Code                      ║
╚${border}╝
`);

  // If nodemailer is not available, we are done
  if (!nodemailer) {
    console.log('ℹ️ [Email service] nodemailer is not installed. Falling back to console logging.');
    return;
  }

  // SMTP Settings
  const host = process.env.EMAIL_HOST || '';
  const port = process.env.EMAIL_PORT || 587;
  const user = process.env.EMAIL_USER || '';
  const pass = process.env.EMAIL_PASS || '';

  if (!user || !pass) {
    console.log('ℹ️ [Email service] EMAIL_USER or EMAIL_PASS environment variables are not set. Falling back to console logging.');
    return;
  }

  try {
    const transporter = getTransporter(user, pass, host, port);

    const info = await transporter.sendMail({
      from: `"EthiZone Support" <${user}>`,
      to: email,
      subject: mailSubject,
      text: mailText,
      html: mailHtml,
    });

    console.log(`✉️ Email successfully sent to ${email}. Message ID: ${info.messageId}`);
  } catch (error) {
    console.error(`❌ Error sending email to ${email}:`, error.message);
  }
};

/**
 * Sends a contact inquiry notification to the super admin.
 * @param {Object} inquiry - The contact inquiry document from database
 */
const sendContactInquiryEmail = async (inquiry) => {
  const User = require('../models/User');
  let adminEmail = 'admin@ultimatemaster.com';
  
  try {
    const superAdmin = await User.findOne({ role: 'super_admin' });
    if (superAdmin && superAdmin.email) {
      adminEmail = superAdmin.email;
    }
  } catch (err) {
    console.error('Error fetching super admin for contact email:', err.message);
  }

  const mailSubject = `🔔 New Support Inquiry: ${inquiry.topic}`;
  const mailText = `New inquiry from ${inquiry.fullName} (${inquiry.email}):\nTopic: ${inquiry.topic}\nPhone: ${inquiry.phone || 'N/A'}\nMessage: ${inquiry.message}`;
  
  const mailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
      <h2 style="color: #0f172a; border-bottom: 2px solid #0d5c3a; padding-bottom: 10px;">🔔 New Support Inquiry</h2>
      <p style="font-size: 16px; color: #4a5568;">A user has submitted a support ticket on EthiZone:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #4a5568;">From:</td>
          <td style="padding: 8px 0; color: #0f172a;">${inquiry.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Email:</td>
          <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Phone:</td>
          <td style="padding: 8px 0; color: #0f172a;">${inquiry.phone || 'None provided'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Topic:</td>
          <td style="padding: 8px 0; color: #0d5c3a; font-weight: bold;">${inquiry.topic}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #4a5568;">Message:</td>
          <td style="padding: 8px 0; color: #0f172a; white-space: pre-wrap;">${inquiry.message}</td>
        </tr>
        ${inquiry.attachmentUrl ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Attachment:</td>
          <td style="padding: 8px 0; color: #0f172a;">${inquiry.attachmentUrl}</td>
        </tr>
        ` : ''}
      </table>
      
      <p style="font-size: 12px; color: #a0aec0; margin-top: 30px; border-top: 1px solid #edf2f7; padding-top: 15px;">EthiZone Admin System</p>
    </div>
  `;

  // Log to console for development verification
  const border = '═'.repeat(60);
  const contentWidth = 58;
  const fromLine = ` From:      ${inquiry.fullName} (${inquiry.email})`.padEnd(contentWidth);
  const topicLine = ` Topic:     ${inquiry.topic}`.padEnd(contentWidth);
  const destLine = ` To Admin:  ${adminEmail}`.padEnd(contentWidth);

  console.log(`
╔${border}╗
║ 📧 EMAIL OUTBOX [SUPPORT TICKET FORWARDING]                ║
╠${border}╣
║${fromLine}║
║${topicLine}║
║${destLine}║
║ Subject:  ${mailSubject.padEnd(46)}║
╚${border}╝
  `);

  if (!nodemailer) {
    console.log('ℹ️ [Email service] nodemailer is not installed. Falling back to console logging.');
    return;
  }

  const host = process.env.EMAIL_HOST || '';
  const port = process.env.EMAIL_PORT || 587;
  const user = process.env.EMAIL_USER || '';
  const pass = process.env.EMAIL_PASS || '';

  if (!user || !pass) {
    console.log('ℹ️ [Email service] EMAIL_USER or EMAIL_PASS environment variables are not set. Falling back to console logging.');
    return;
  }

  try {
    const transporter = getTransporter(user, pass, host, port);

    const info = await transporter.sendMail({
      from: `"EthiZone Contact System" <${user}>`,
      to: adminEmail,
      subject: mailSubject,
      text: mailText,
      html: mailHtml,
    });

    console.log(`✉️ Support ticket email successfully forwarded to Super Admin at ${adminEmail}. Message ID: ${info.messageId}`);
  } catch (error) {
    console.error(`❌ Error forwarding support ticket email to admin:`, error.message);
  }
};

const sendNotificationEmail = async (toEmail, subject, text, html) => {
  if (!nodemailer) {
    console.log('ℹ️ [Email service] nodemailer is not installed. Falling back to console logging.');
    return;
  }

  const host = process.env.EMAIL_HOST || '';
  const port = process.env.EMAIL_PORT || 587;
  const user = process.env.EMAIL_USER || '';
  const pass = process.env.EMAIL_PASS || '';

  if (!user || !pass) {
    console.log('ℹ️ [Email service] EMAIL_USER or EMAIL_PASS environment variables are not set. Falling back to console logging.');
    return;
  }

  try {
    const transporter = getTransporter(user, pass, host, port);

    const info = await transporter.sendMail({
      from: `"EthiZone Notifications" <${user}>`,
      to: toEmail,
      subject: subject,
      text: text,
      html: html,
    });

    console.log(`✉️ Notification email successfully sent to ${toEmail}. Message ID: ${info.messageId}`);
  } catch (error) {
    console.error(`❌ Error sending notification email to ${toEmail}:`, error.message);
  }
};

module.exports = { sendOtpEmail, sendContactInquiryEmail, sendNotificationEmail };
