# SCOA Admin — Flipkart Training Management Platform

A production-ready admin dashboard built for Flipkart's Supply Chain Operations Academy (SCOA) training platform.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 (CSS-first, no config file)
- **Theme**: next-themes (light/dark mode)
- **Icons**: lucide-react
- **Charts**: Recharts
- **Tables**: TanStack Table v8
- **Forms**: react-hook-form + zod
- **State**: Zustand
- **Data Fetching**: TanStack React Query

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) — automatically redirects to `/admin/dashboard`.

## Project Structure

```
/app
  /admin
    /dashboard          ← KPIs, charts, activity
    /students           ← Student management + profile
    /courses            ← Course CRUD
    /questions          ← Question bank
    /exams              ← Exam attempts & analytics
    /certificates       ← Certificate management
    /admins             ← Admin RBAC management
    /roles              ← Role & permission editor
    /audit-logs         ← Login history & system logs
    /analytics          ← Full analytics dashboard
    /settings           ← Platform configuration

/components
  /layout               ← Sidebar, TopNav, CommandPalette, Providers
  /dashboard            ← KPI cards, charts, quick actions
  /tables               ← Reusable DataTable (TanStack)
  /ui                   ← Checkbox and shared primitives
  /charts               ← Recharts wrappers (see dashboard/)

/features
  /students             ← Student table feature

/store
  auth-store.ts         ← Zustand auth state
  ui-store.ts           ← Sidebar, command palette state
  filter-store.ts       ← Table filter state

/lib
  /utils/cn.ts          ← Tailwind class merger
  /permissions          ← RBAC permission helpers

/types
  index.ts              ← Full domain type definitions

middleware.ts           ← Auth & RBAC route protection (configure with your JWT)
```

## Key Features

### Dashboard
- KPI metric cards with trend indicators
- Student growth area chart
- Course distribution pie chart
- Exam pass/fail bar chart
- Daily registration trend
- Recent activity feed
- Quick actions panel

### Student Management
- Searchable, sortable, filterable data table
- Bulk selection support
- Student profile with exam history and certificates

### Admin RBAC
- 4 role hierarchy: Super Admin → Admin → Analyst → Viewer
- Permission matrix per role
- Activate/deactivate admins

### Security Architecture
- Auth middleware template at `middleware.ts`
- Session management via Zustand with configurable timeout
- Audit logging structure in place
- RBAC guard hooks ready to implement

### Command Palette
Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) to open the command palette for quick navigation.

## Customization

### Adding API Connections
Replace mock data in each page/feature with real API calls using the `useQuery` hooks in `/hooks/use-data.ts`.

### Theme
Edit CSS variables in `/styles/globals.css` under `:root` (light) and `.dark` (dark) selectors.

### Adding Roles/Permissions
Edit the `rolePermissions` map in `/lib/permissions/index.ts`.

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://your-api.com
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```
