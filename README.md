# SaaS Dashboard Template

A modern, full-stack SaaS dashboard template built with Next.js 15, featuring authentication, multi-tenancy, RBAC, internationalization, and a beautiful UI.

## ✨ Features

- 🔐 **Authentication**: OAuth with GitHub & Google via NextAuth.js
- 👥 **Multi-tenancy**: Organizations with role-based access control (RBAC)
- 🌍 **Internationalization**: French and English support with next-intl
- 🎨 **Modern UI**: shadcn/ui components with Tailwind CSS
- 🌓 **Dark Mode**: System-aware theme switching
- 📊 **Dashboard**: Analytics, charts, and KPIs
- 🗄️ **Dual Database**: PostgreSQL (Prisma) + MongoDB (Mongoose)
- 💳 **Payments**: Stripe integration ready
- 📧 **Emails**: Transactional emails with Resend
- 🔍 **Audit Logs**: Activity tracking in MongoDB
- 🎭 **Animations**: Smooth Notion-like transitions with Framer Motion
- 🧪 **Testing**: Vitest + Playwright setup
- 🚀 **CI/CD**: GitHub Actions ready

## 🏗️ Tech Stack

### Core
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui

### Authentication & Authorization
- **Auth**: NextAuth.js v5
- **RBAC**: Custom role-based permissions
- **Multi-tenancy**: Organization-based isolation

### Databases
- **SQL**: PostgreSQL with Prisma ORM
- **NoSQL**: MongoDB with Mongoose

### UI & Components
- **Components**: Radix UI primitives
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Tables**: TanStack Table
- **Charts**: Recharts + Tremor

### Internationalization
- **i18n**: next-intl

### State Management
- **Server State**: TanStack Query
- **Client State**: Zustand

### Payments & Email
- **Payments**: Stripe
- **Email**: Resend

### Testing
- **Unit Tests**: Vitest
- **E2E Tests**: Playwright
- **Component Tests**: Testing Library

### Code Quality
- **Linting**: ESLint
- **Formatting**: Prettier
- **Git Hooks**: Husky + lint-staged

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd next-template
\`\`\`

2. Install dependencies:
\`\`\`bash
pnpm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env
\`\`\`

Edit \`.env\` with your credentials.

4. Set up the database:
\`\`\`bash
# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# (Optional) Seed the database
pnpm db:seed
\`\`\`

5. Start the development server:
\`\`\`bash
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗂️ Project Structure

\`\`\`
├── app/
│   ├── [locale]/              # Internationalized routes
│   │   ├── (marketing)/       # Marketing pages
│   │   ├── (dashboard)/       # Dashboard pages
│   │   └── (auth)/           # Auth pages
│   ├── api/                  # API routes
│   └── globals.css
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── layout/               # Layout components
│   └── dashboard/            # Dashboard components
├── lib/
│   ├── auth/                 # Auth config & helpers
│   ├── db/                   # Database connections
│   ├── i18n/                 # i18n config
│   ├── models/               # MongoDB models
│   └── utils.ts
├── locales/                  # Translation files
│   ├── en/
│   └── fr/
├── prisma/
│   └── schema.prisma         # Database schema
├── types/                    # TypeScript types
└── tests/                    # Test files
\`\`\`

## 🔧 Available Scripts

\`\`\`bash
# Development
pnpm dev                  # Start dev server
pnpm build                # Build for production
pnpm start                # Start production server

# Database
pnpm db:generate          # Generate Prisma client
pnpm db:migrate           # Run migrations
pnpm db:push              # Push schema changes
pnpm db:seed              # Seed database

# Code Quality
pnpm lint                 # Lint code
pnpm format               # Format code

# Testing
pnpm test                 # Run unit tests
pnpm test:e2e             # Run E2E tests
\`\`\`

## 🔑 Environment Variables

See \`.env.example\` for all required environment variables.

### Required for Development
- \`DATABASE_URL\`: PostgreSQL connection string
- \`MONGODB_URI\`: MongoDB connection string
- \`NEXTAUTH_URL\`: Your app URL
- \`NEXTAUTH_SECRET\`: Secret for NextAuth
- \`GITHUB_ID\` & \`GITHUB_SECRET\`: GitHub OAuth credentials
- \`GOOGLE_CLIENT_ID\` & \`GOOGLE_CLIENT_SECRET\`: Google OAuth credentials

### Optional (for full features)
- Stripe keys for payments
- Resend API key for emails

## 🎨 Customization

### Theme
Edit Tailwind config and CSS variables in \`app/globals.css\` to customize colors and design tokens.

### Components
All UI components are in \`components/ui/\` and can be customized or replaced.

### Database Schema
Modify \`prisma/schema.prisma\` and run \`pnpm db:migrate\` to update the database.

### Translations
Add or edit translation files in \`locales/[locale]/\` to support more languages.

## 📊 Database Schema

### PostgreSQL (Prisma)
- **Users**: User accounts with OAuth
- **Organizations**: Multi-tenant organizations
- **Memberships**: User-organization relationships with roles
- **Subscriptions**: Stripe subscriptions
- **Invitations**: Organization invites
- **Events**: Audit log (can also use MongoDB)

### MongoDB (Mongoose)
- **Activity**: Detailed activity logs with flexible schema

## 🔐 RBAC (Role-Based Access Control)

Four roles are supported:
- **OWNER**: Full access to everything
- **ADMIN**: Manage organization, members, and settings
- **MEMBER**: Read access and basic operations
- **VIEWER**: Read-only access

Permissions are defined in \`lib/auth/rbac.ts\`.

## 🌍 Internationalization

The app supports multiple languages via next-intl:
- Automatic locale detection
- URL-based locale routing (\`/fr/...\`, \`/en/...\`)
- Translations in \`locales/\` directory

To add a new language:
1. Add locale to \`lib/i18n/config.ts\`
2. Create translation files in \`locales/[locale]/\`
3. Update middleware

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Docker
\`\`\`bash
docker build -t saas-dashboard .
docker run -p 3000:3000 saas-dashboard
\`\`\`

## 📝 License

MIT License - feel free to use this template for your projects.

## 🤝 Contributing

Contributions are welcome! Please open an issue or PR.

## 📧 Support

For issues or questions, please open a GitHub issue.
