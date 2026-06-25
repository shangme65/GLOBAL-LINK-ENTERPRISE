# 🌍 Global Link Enterprise

A production-ready security and shipping platform built with Next.js 14, featuring advanced animations, real-time tracking capabilities, and comprehensive user management.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🔐 **Secure Authentication** - NextAuth.js with credential-based login
- 📦 **Shipment Management** - Create, track, and manage shipments
- 🎨 **Beautiful UI** - Glassmorphism design with smooth animations
- 📱 **Mobile Responsive** - Optimized for all device sizes
- 🚀 **Real-time Tracking** - Monitor shipment progress in real-time
- 🔔 **Notifications System** - Stay updated on shipment status
- 👤 **User Profiles** - Comprehensive user management
- 🎭 **Advanced Animations** - Powered by Framer Motion
- 🎯 **Type-Safe** - Built with TypeScript for reliability
- 🗄️ **Database Integration** - Prisma ORM with PostgreSQL

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Authentication**: NextAuth.js
- **Database**: Prisma ORM with PostgreSQL
- **Validation**: Zod
- **Icons**: React Icons
- **Security**: bcryptjs for password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or higher
- npm or yarn or pnpm
- Git (optional)

## 🚀 Quick Start

### 1. Clone or Navigate to the Project

```bash
cd "c:\Users\Silas\GLOBAL-LINK ENTERPRISE"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env` and update with your values:

```env
# Database - Use PostgreSQL (Neon, Supabase, Railway, etc.)
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# NextAuth - Generate secret: openssl rand -base64 32
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-generated-secret-key

# App Configuration
NEXT_PUBLIC_APP_NAME=Global Link Enterprise
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 4. Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (for production databases)
npx prisma db push

# Or run migrations (for development)
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
global-link-enterprise/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/
│   │       │   └── route.ts        # NextAuth configuration
│   │       └── register/
│   │           └── route.ts        # User registration API
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx           # Login page
│   │   └── register/
│   │       └── page.tsx           # Registration page
│   ├── dashboard/
│   │   ├── notifications/
│   │   │   └── page.tsx           # Notifications page
│   │   ├── profile/
│   │   │   └── page.tsx           # User profile page
│   │   ├── shipments/
│   │   │   └── page.tsx           # Shipments management
│   │   ├── layout.tsx             # Dashboard layout
│   │   └── page.tsx               # Dashboard home
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Landing page
├── components/
│   └── providers/
│       └── AuthProvider.tsx       # NextAuth session provider
├── lib/
│   ├── auth.ts                    # NextAuth configuration
│   └── prisma.ts                  # Prisma client
├── prisma/
│   └── schema.prisma              # Database schema
├── types/
│   └── next-auth.d.ts            # NextAuth type definitions
├── .env.local                     # Environment variables
├── .gitignore                     # Git ignore rules
├── copilot-instructions.md        # GitHub Copilot instructions
├── next.config.js                 # Next.js configuration
├── package.json                   # Dependencies
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.ts             # Tailwind CSS configuration
└── tsconfig.json                  # TypeScript configuration
```

## 🎨 Design System

### Color Palette

- **Primary**: Blue shades for trust and security
  - `#0284c7` (primary-600)
  - `#075985` (primary-700)
  
- **Secondary**: Purple/Pink for accents
  - `#d946ef` (secondary-500)
  - `#c026d3` (secondary-600)

- **Accent**: Green for success states
  - `#10b981` (accent-600)
  - `#059669` (accent-700)

### Custom Classes

- `glass-effect`: Glassmorphism backdrop blur effect
- `gradient-text`: Gradient text effect
- Smooth animations with Framer Motion

## 🔐 Authentication

The platform uses NextAuth.js with a custom credentials provider:

### Register a New User

1. Navigate to `/auth/register`
2. Fill in the registration form
3. Account is created with hashed password

### Login

1. Navigate to `/auth/login`
2. Enter email and password
3. Redirected to dashboard on success

### Protected Routes

All `/dashboard/*` routes are protected and require authentication.

## 🗄️ Database Schema

### User Model
- Authentication credentials
- Profile information
- Relationships: Shipments, Notifications

### Shipment Model
- Tracking information
- Origin and destination
- Status and progress tracking
- Relationships: User, TrackingHistory

### TrackingHistory Model
- Historical tracking data
- Status updates and timestamps

### Notification Model
- User notifications
- Read/unread status
- Notification types

## 📱 Mobile Responsiveness

The application is fully responsive with:
- Collapsible sidebar on mobile
- Touch-friendly interface
- Optimized layouts for all screen sizes
- Mobile-first Tailwind CSS utilities

## 🎭 Animations

Powered by Framer Motion:
- Page transitions
- Card hover effects
- List stagger animations
- Smooth scroll animations
- Loading states

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Generate Prisma Client
npx prisma generate

# Create database migration
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio
```

## 🚢 Deployment

### Vercel (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import project in Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure environment variables**
   Add these in Vercel Project Settings → Environment Variables:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
   NEXTAUTH_URL="https://your-app.vercel.app"
   NEXTAUTH_SECRET="your-generated-secret-key"
   NEXT_PUBLIC_APP_NAME="Global Link Enterprise"
   NEXT_PUBLIC_APP_URL="https://your-app.vercel.app"
   ```
   
   > 💡 **Tip**: Generate a secure secret: `openssl rand -base64 32`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live!

### Database Setup (Neon PostgreSQL)

1. **Create a Neon database**
   - Go to [Neon.tech](https://neon.tech)
   - Create a new project
   - Copy your connection string

2. **Add to Vercel**
   - Paste connection string as `DATABASE_URL` in Vercel

3. **Initialize schema**
   ```bash
   # From your local terminal with DATABASE_URL set
   npx prisma db push
   ```

### Environment Variables for Production

```env
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret-key"
NEXT_PUBLIC_APP_NAME="Global Link Enterprise"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

## 📊 Features Overview

### Landing Page
- Hero section with animations
- Feature showcase
- Statistics display
- Call-to-action sections

### Dashboard
- Overview statistics
- Recent shipments
- Quick actions
- Real-time updates

### Shipments
- List all shipments
- Search and filter
- Progress tracking
- Detailed information

### Notifications
- System notifications
- Shipment updates
- Read/unread status
- Different notification types

### Profile
- User information
- Account statistics
- Edit profile details
- Security settings

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Hydration Errors
- Ensure consistent server/client rendering
- Check for browser-only APIs in server components

### Database Issues
- Run `npx prisma generate` after schema changes
- Check DATABASE_URL in `.env.local`
- Ensure database is accessible

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`

## 📞 Support

For issues and questions:
- Check the documentation
- Review GitHub issues
- Contact support team

## 🎯 Roadmap

- [ ] Real-time tracking with WebSockets
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] API documentation
- [ ] Integration with shipping carriers

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for deployment platform
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for animation library

---

**Built with ❤️ by Global Link Enterprise Team**

For more information, visit our [documentation](./copilot-instructions.md).
