const nodemailer = (() => {
  try {
    return require('nodemailer');
  } catch (error) {
    return null;
  }
})();

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
    const transporter = nodemailer.createTransport({
      host: host || (parseInt(port) === 465 ? 'smtp.gmail.com' : undefined),
      port: parseInt(port),
      secure: parseInt(port) === 465,
      auth: {
        user,
        pass,
      },
    });

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

module.exports = { sendOtpEmail };
