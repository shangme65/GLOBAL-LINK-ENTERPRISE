# Global Link Enterprise - GitHub Copilot Instructions

## Project Overview
Global Link Enterprise is a production-ready security and shipping platform built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. This application provides comprehensive shipping management, real-time tracking, and user authentication.

## Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Authentication**: NextAuth.js with credentials provider
- **Database**: Prisma ORM with SQLite (production: PostgreSQL)
- **Icons**: React Icons
- **Validation**: Zod

## Code Style & Conventions

### TypeScript
- Use strict TypeScript with proper typing
- Avoid `any` type; use specific types or generics
- Define interfaces for component props and data structures
- Use type inference where appropriate

### React Components
- Use functional components with hooks
- Prefer `"use client"` directive for client-side interactivity
- Keep components small and focused (single responsibility)
- Extract reusable logic into custom hooks
- Use proper error boundaries for production code

### File Naming
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Utilities/Helpers: camelCase (e.g., `formatDate.ts`)
- API routes: lowercase (e.g., `route.ts`)
- Pages: lowercase (e.g., `page.tsx`, `layout.tsx`)

### Component Structure
```typescript
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export default function Component({ title, onAction }: ComponentProps) {
  // State declarations
  const [state, setState] = useState<string>("");

  // Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // Event handlers
  const handleClick = () => {
    // Handler logic
  };

  // Render
  return (
    <motion.div>
      {/* Component JSX */}
    </motion.div>
  );
}
```

## Design System

### Color Palette
- **Primary**: Blue tones (#0284c7, #075985)
- **Secondary**: Purple/Pink tones (#d946ef, #c026d3)
- **Accent**: Green tones (#10b981, #059669)
- **Gradients**: Use `gradient-text` class for branded text

### Components
- Use `glass-effect` class for glassmorphism cards
- Implement smooth animations with Framer Motion
- Ensure mobile-first responsive design
- Add hover states and transitions for interactive elements

### Animation Guidelines
- Use subtle animations (0.3-0.5s duration)
- Implement stagger animations for lists
- Add `whileHover` and `whileTap` for buttons
- Use `initial`, `animate`, and `exit` for page transitions

## Database Schema

### Models
- **User**: Authentication and profile data
- **Shipment**: Shipping orders and tracking
- **TrackingHistory**: Shipment status updates
- **Notification**: User notifications

### Best Practices
- Use Prisma Client for database operations
- Implement proper error handling
- Use transactions for multi-step operations
- Always validate input data with Zod

## API Routes

### Structure
```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  field: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = schema.parse(body);
    
    // Process request
    
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Security
- Always validate and sanitize input
- Use environment variables for sensitive data
- Implement rate limiting for API routes
- Hash passwords with bcryptjs
- Use NextAuth for session management

## Environment Variables

### Critical Rule: Always Edit .env (Not .env.example)
**IMPORTANT**: When adding or modifying environment variables:
- ✅ **ALWAYS** edit the actual `.env` file directly
- ❌ **NEVER** edit only `.env.example` file
- `.env.example` is a template for documentation purposes only
- Real configuration changes must be in `.env` to take effect

### Required Environment Variables
```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Email Configuration
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"

# Admin Account (First-time initialization)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="secure-password-min-8-chars"
ADMIN_NAME="Administrator"
```

### Adding New Environment Variables
1. Add to `.env` file first (real configuration)
2. Add to `.env.example` file second (template for others)
3. Update this documentation
4. Restart dev server to load changes

### Accessing Environment Variables
- Server-side: `process.env.VARIABLE_NAME`
- Client-side: `process.env.NEXT_PUBLIC_VARIABLE_NAME`
- Always check if variable exists before using

## Authentication Flow
1. User registers via `/api/auth/register`
2. Password is hashed and stored
3. User logs in via NextAuth credentials provider
4. Session is managed with JWT
5. Protected routes check session status

## State Management
- Use React hooks (useState, useEffect, useReducer)
- Lift state up when sharing between components
- Use Context API for global state (if needed)
- Consider React Query for server state (future enhancement)

## Performance Optimization
- Use Next.js Image component for images
- Implement lazy loading for heavy components
- Optimize bundle size with code splitting
- Use React.memo for expensive computations
- Implement proper error boundaries

## Testing Guidelines
- Write unit tests for utilities and helpers
- Test API routes with proper mocking
- Implement integration tests for critical flows
- Test authentication and authorization
- Validate form submissions and error states

## Deployment
- Build: `npm run build`
- Environment variables must be set
- Database migrations: `npx prisma migrate deploy`
- Generate Prisma Client: `npx prisma generate`
- Use production database (PostgreSQL recommended)

## Common Patterns

### Protected Route
```typescript
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") return <LoadingSpinner />;
  if (!session) return null;

  return <div>Protected Content</div>;
}
```

### Animated Card
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ y: -5 }}
  className="glass-effect p-6 rounded-2xl"
>
  {/* Card content */}
</motion.div>
```

## Troubleshooting

### Common Issues
1. **Hydration errors**: Ensure server/client rendering consistency
2. **Session issues**: Check NextAuth configuration and environment variables
3. **Database errors**: Run `npx prisma generate` after schema changes
4. **Build errors**: Check TypeScript types and imports

### Debug Commands
- `npm run dev`: Start development server
- `npx prisma studio`: Open database GUI
- `npx prisma migrate dev`: Create database migration
- `npm run lint`: Check for linting errors

## Future Enhancements
- Implement real-time tracking with WebSockets
- Add payment integration (Stripe)
- Implement advanced search and filtering
- Add email notifications
- Create admin dashboard
- Implement multi-language support
- Add dark mode toggle
- Integrate mapping service for route visualization

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/docs)
