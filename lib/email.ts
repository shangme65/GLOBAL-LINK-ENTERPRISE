import nodemailer from "nodemailer";
import crypto from "crypto";

// Email configuration
// In production, use environment variables for these values
const transporter = nodemailer.createTransport({
  service: "gmail", // or your preferred email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

// Alternatively, for development, you can use Ethereal (fake SMTP service)
// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"Global Link Enterprise" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ""), // Strip HTML for text version
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
}

export function generateVerificationCode(): string {
  // Generate a 6-digit verification code
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateVerificationToken(): string {
  // Generate a random token for URL-based verification (alternative to code)
  return crypto.randomBytes(32).toString("hex");
}

export function getVerificationEmailHtml(code: string, name?: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #3b82f6;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #3b82f6;
            margin-bottom: 10px;
          }
          .content {
            padding: 30px 0;
          }
          .code-box {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            margin: 30px 0;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          }
          .warning {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            font-size: 14px;
          }
          .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
          @media (max-width: 600px) {
            body {
              padding: 10px;
            }
            .container {
              padding: 20px;
            }
            .code-box {
              font-size: 28px;
              letter-spacing: 4px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🌐 Global Link Enterprise</div>
            <p style="color: #6b7280; margin: 0;">Secure Shipping Solutions</p>
          </div>
          
          <div class="content">
            <h2 style="color: #1f2937; margin-bottom: 20px;">
              ${name ? `Hello ${name}!` : "Hello!"}
            </h2>
            
            <p style="font-size: 16px; color: #4b5563;">
              Thank you for registering with Global Link Enterprise. To complete your registration, 
              please verify your email address using the verification code below:
            </p>
            
            <div class="code-box">
              ${code}
            </div>
            
            <p style="font-size: 16px; color: #4b5563;">
              Enter this code on the verification page to activate your account.
            </p>
            
            <div class="warning">
              <strong>⚠️ Security Notice:</strong> This verification code will expire in 10 minutes. 
              If you didn't request this, please ignore this email.
            </div>
            
            <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
              Having trouble? Contact our support team at support@globallink.com
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 5px 0;">
              © 2026 Global Link Enterprise. All rights reserved.
            </p>
            <p style="margin: 5px 0; font-size: 12px;">
              This is an automated message, please do not reply.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function sendVerificationEmail(
  email: string,
  code: string,
  name?: string
): Promise<{ success: boolean; error?: any }> {
  return sendEmail({
    to: email,
    subject: "Verify Your Email - Global Link Enterprise",
    html: getVerificationEmailHtml(code, name),
  });
}
