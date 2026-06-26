# Email Verification Setup Guide

This guide explains the email verification system added to Global Link Enterprise and how to configure it.

## Features Added

### 1. Email Verification System
- Users receive a 6-digit verification code via email after registration
- Codes expire after 10 minutes for security
- Users can resend verification codes if needed
- Email verification is required before full account access

### 2. Mobile-Responsive Landing Page
- Optimized for mobile devices with responsive text and spacing
- Mobile hamburger menu for navigation
- Compact layout for smaller screens
- Touch-friendly buttons and interactions

## Setup Instructions

### Step 1: Configure Email Service

1. **Copy the environment variables:**
   ```bash
   cp .env.example .env
   ```

2. **Configure email settings in `.env`:**

   #### Option A: Gmail (Recommended for development)
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-specific-password
   ```

   **Gmail Setup Steps:**
   1. Enable 2-factor authentication on your Google account
   2. Go to https://myaccount.google.com/apppasswords
   3. Generate a new app password for "Mail"
   4. Use the generated 16-character password as `EMAIL_PASSWORD`

   #### Option B: Alternative Email Services
   
   **SendGrid:**
   ```env
   EMAIL_USER=apikey
   EMAIL_PASSWORD=your-sendgrid-api-key
   ```
   Update `lib/email.ts` to use SendGrid's SMTP:
   ```typescript
   host: "smtp.sendgrid.net",
   port: 587,
   ```

   **Resend (Recommended for production):**
   Install Resend SDK: `npm install resend`
   See: https://resend.com/docs/send-with-nodejs

### Step 2: Update Database Schema

Run the Prisma migration to add email verification fields:

```bash
npx prisma migrate dev --name add_email_verification
```

This adds the following fields to the User model:
- `isEmailVerified`: Boolean (default: false)
- `emailVerificationToken`: String (stores 6-digit code)
- `emailVerificationExpiry`: DateTime (code expiration time)

### Step 3: Generate Prisma Client

```bash
npx prisma generate
```

### Step 4: Test the Email System

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Register a new account at http://localhost:3000/auth/register

3. Check your email for the 6-digit verification code

4. Enter the code at http://localhost:3000/auth/verify-email

## API Endpoints

### POST /api/auth/register
Registers a new user and sends verification email.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "company": "Optional Company",
  "phone": "Optional Phone"
}
```

**Response:**
```json
{
  "message": "User created successfully. Please check your email for verification code.",
  "user": {...},
  "requiresVerification": true
}
```

### POST /api/auth/verify-email
Verifies a user's email with the code.

**Request Body:**
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

### POST /api/auth/resend-verification
Resends verification code to user's email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

## Files Modified/Created

### New Files
- `lib/email.ts` - Email utility functions and verification email templates
- `app/api/auth/verify-email/route.ts` - Email verification endpoint
- `app/api/auth/resend-verification/route.ts` - Resend verification code endpoint
- `app/auth/verify-email/page.tsx` - Email verification page UI
- `SETUP_EMAIL_VERIFICATION.md` - This documentation file

### Modified Files
- `prisma/schema.prisma` - Added email verification fields to User model
- `app/api/auth/register/route.ts` - Updated to send verification emails
- `app/auth/register/page.tsx` - Updated to redirect to verification page
- `app/page.tsx` - Made mobile-responsive with hamburger menu
- `.env.example` - Added email configuration variables

## Mobile Optimizations

The landing page now includes:
- Responsive text sizes (text-3xl sm:text-4xl md:text-5xl lg:text-7xl)
- Mobile hamburger menu with smooth animations
- Touch-friendly buttons and spacing
- Optimized padding and margins for mobile screens
- Compact navigation bar for small devices
- Full-width buttons on mobile, auto-width on desktop

## Security Features

1. **Time-limited codes**: Verification codes expire after 10 minutes
2. **One-time use**: Codes are cleared after successful verification
3. **Rate limiting**: Consider adding rate limiting to prevent abuse
4. **Secure storage**: Verification tokens are stored securely in the database
5. **Email validation**: Email addresses are validated before sending codes

## Production Considerations

1. **Email Service**: Use a production-grade email service like:
   - Resend (recommended)
   - SendGrid
   - AWS SES
   - Mailgun

2. **Rate Limiting**: Add rate limiting to prevent:
   - Spam registrations
   - Verification code abuse
   - Email flooding

3. **Error Handling**: Monitor email delivery failures and provide fallback options

4. **Email Templates**: Customize the email template in `lib/email.ts` with your branding

5. **SMTP Security**: Use environment-specific SMTP settings (test vs. production)

## Troubleshooting

### Emails Not Sending
1. Check EMAIL_USER and EMAIL_PASSWORD in `.env`
2. For Gmail: Ensure 2FA is enabled and app password is correct
3. Check console logs for email errors
4. Verify SMTP settings in `lib/email.ts`

### Verification Code Invalid
1. Code expires after 10 minutes - request a new one
2. Check for typos in the 6-digit code
3. Ensure email address matches registration

### Database Errors
1. Run `npx prisma migrate dev` to apply migrations
2. Run `npx prisma generate` to update Prisma Client
3. Check DATABASE_URL in `.env`

## Support

For issues or questions, please check:
- The email logs in the server console
- Database connection status
- Environment variable configuration
- Prisma migration status

## Future Enhancements

Consider adding:
- Email change verification
- Password reset via email
- Welcome email after verification
- Email notification preferences
- Multi-language email templates
- Email delivery tracking
