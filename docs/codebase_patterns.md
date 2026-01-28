# TrackMate Codebase Patterns & Conventions

This document describes the architectural patterns, coding conventions, and structure used throughout the TrackMate codebase.

---

## Overview

TrackMate is an academic tracking application built with React 19, TypeScript 5, and Vite 7. It uses a monorepo architecture with three packages: **academic** (core app), **landing** (auth/landing pages), and **shared** (reusable code).

---

## Architecture & File Organization

### Monorepo Structure

TrackMate uses npm workspaces with three packages:

```
TrackMate/
├── packages/
│   ├── academic/          # Main academic tracking application (v0.10.4)
│   ├── landing/           # Landing page, auth, and account management (v0.13.7)
│   └── shared/            # Shared components, hooks, contexts, and utilities
├── dist/                  # Production build output
│   └── academic/          # Academic app build
├── docs/                  # Documentation
├── branding/              # App icons, favicons, source design files
├── .github/workflows/     # CI/CD with Firebase Hosting
├── package.json           # Root workspace configuration
├── tsconfig.json          # Root TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── eslint.config.ts       # ESLint configuration
└── firebase.json          # Firebase Hosting configuration
```

### Package Purposes

| Package | Purpose | URL Path |
|---------|---------|----------|
| **academic** | Core assignment/class/schedule tracking app | `/academic/` |
| **landing** | Landing page, authentication, account management | `/` (root) |
| **shared** | Reusable components, contexts, hooks, and utilities | N/A (library) |

### Academic Package Structure

```
packages/academic/
├── app/                   # Core application infrastructure
│   ├── components/        # App-level components (Sidebar, modals, PageHeader)
│   ├── contexts/          # React contexts (ModalContext, ScheduleComponentsContext)
│   ├── hooks/             # Shared hooks organized by purpose
│   │   ├── entities/      # Domain hooks (useAssignments, useClasses, etc.)
│   │   ├── data/          # Data persistence hooks (useLocalStorage)
│   │   └── ui/            # UI interaction hooks
│   ├── layouts/           # Layout component
│   ├── lib/               # Utility functions
│   ├── config/            # Configuration (paths, brand, storageKeys)
│   ├── styles/            # CSS and color system
│   └── types/             # Core type definitions
├── pages/                 # Feature-based page modules
│   ├── Dashboard/
│   ├── Calendar/
│   ├── My Assignments/
│   ├── My Classes/
│   ├── My Schedule/
│   ├── Settings/
│   ├── DevLogin/
│   └── NotFound/
├── index.html             # HTML template
└── vite.config.ts         # Vite configuration
```

### Landing Package Structure

```
packages/landing/
├── app/                   # Core application infrastructure
│   ├── components/        # Auth form components
│   ├── hooks/             # Auth hooks
│   ├── styles/            # CSS and colors
│   ├── types/             # Types
│   └── lib/               # Utilities
├── pages/                 # Page modules
│   ├── Landing/
│   ├── SignIn/
│   ├── SignUp/
│   ├── Account/
│   ├── VerifyEmail/
│   ├── ForgotPassword/
│   ├── ActionHandler/
│   └── NotFound/
├── index.html             # HTML template
└── vite.config.ts         # Vite configuration
```

### Shared Package Structure

```
packages/shared/
├── components/            # Reusable components
│   ├── Sidebar/           # Sidebar primitives
│   ├── modal/             # Modal system components
│   └── Auth/              # Authentication components (RequireAuth)
├── contexts/              # Shared contexts
│   ├── AuthContext.tsx    # Firebase authentication state
│   └── ToastContext.tsx   # Toast notifications
├── hooks/                 # Shared hooks
│   ├── useHover.ts
│   └── useFocus.ts
├── lib/                   # Shared utilities
│   ├── date.ts            # Date utilities
│   ├── firebase.ts        # Firebase initialization
│   └── id.ts              # ID generation
├── config/                # Brand configuration
└── styles/                # Shared CSS
```

### Page Module Pattern

Each page follows a consistent structure:

```
pages/<PageName>/
├── index.tsx              # Main page component
├── index.css              # Page-specific CSS variables
├── components/            # Page-specific components (deeply nested)
├── hooks/                 # Page-specific hooks
└── types/                 # Page-specific type definitions (namespace-based)
```

---

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI Framework |
| **TypeScript** | 5.9.3 | Type Safety |
| **Vite** | 7.2.4 | Build Tool & Dev Server |
| **TailwindCSS** | 4.1.17 | Utility-First CSS |
| **Firebase** | 12.8.0 | Authentication & Database |
| **React Router DOM** | 7.9.6 | Client-Side Routing |

### Additional Libraries

| Library | Package | Purpose |
|---------|---------|---------|
| **@dnd-kit** (core, sortable, utilities) | academic | Drag-and-drop for assignments |
| **date-fns** | academic | Date manipulation |
| **lucide-react** | both | Icon library |
| **react-hook-form** | landing | Form handling |
| **clsx + tailwind-merge** | both | CSS class utilities |
| **autoprefixer** | both | CSS vendor prefixing |
| **vite-plugin-svgr** | landing | SVG as React components |

---

## Component Patterns

### Hierarchical Component Structure

Components are **deeply nested** following a tree structure that mirrors the UI:

```
components/TodaysClasses/
├── index.tsx
├── TodaysClassesHeader.tsx
└── Body/
    ├── index.tsx
    ├── NoClassesScheduled.tsx
    ├── NoSchool.tsx
    └── ClassList/
        ├── index.tsx
        └── ClassItem/
            └── index.tsx
```

### Import Order Convention

Imports must follow this strict order:

1. React imports and third-party hooks first
2. Context imports second
3. `import type { ... }` for types
4. General function imports like from utilities or auth functions
5. Component imports — Components from `@shared` are imported first and then others from the current package
6. Second to last, or last if the final one is not present, is color imports
7. CSS file imports

**Example:**

```tsx
import React, { useState } from 'react'
import { useModal } from '@/app/contexts/ModalContext'
import type { TodaysClasses } from '@/pages/Dashboard/types'
import { DASHBOARD } from '@/app/styles/colors'
```

### Component Typing Pattern

Props are defined using **TypeScript namespaces** in `types/index.ts`. Namespaces mirror the component hierarchy exactly, and follow the comment and spacing convention shown in the example below:

```ts
export namespace TodaysClasses {
    export interface Props { ... }
    // ======================

    export interface HeaderProps { ... }
    
    export namespace Body {
        export interface Props { ... }

        // ======================
        export namespace ClassList {
            export interface Props { ... }
            // ======================
            export interface ClassItemProps { ... }
        }
    }
}
```
**Note:** The spacing and comments are important for code readability and maintainability.
Top level namespaces always have one blank line between each item within it. Items nested one level still follow that same rule. Items nested two levels deep or more should have no blank lines between them.

Components reference their props like:

```tsx
const ClassItem: React.FC<TodaysClasses.Body.ClassList.ClassItemProps> = ({ ... }) => { ... }
```

---

## Route Configuration

### Academic App Routes

**Location:** `packages/academic/app/App.tsx` and `packages/academic/app/config/paths.ts`

| Route | Component | Description |
|-------|-----------|-------------|
| `/academic/` | Redirect | Redirects to dashboard |
| `/academic/dashboard` | Dashboard | Main overview page |
| `/academic/calendar` | Calendar | Calendar view with events/assignments |
| `/academic/my-assignments` | MyAssignments | Kanban-style assignment board |
| `/academic/my-classes` | MyClasses | Class management |
| `/academic/my-schedule` | MySchedule | Schedule configuration |
| `/academic/settings` | Settings | App settings |
| `/academic/dev-login` | DevLogin | Development-only login (DEV mode) |
| `*` | NotFound | 404 page |

### Landing App Routes

**Location:** `packages/landing/app/App.tsx`

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Redirect | Redirects to /landing |
| `/landing` | Landing | Product landing page |
| `/sign-in` | SignIn | User authentication |
| `/sign-up` | SignUp | User registration |
| `/account` | Account | User account management |
| `/verify-email` | VerifyEmail | Email verification |
| `/forgot-password` | ForgotPassword | Password reset request |
| `/auth-action` | ActionHandler | Firebase auth action handler |
| `*` | NotFound | 404 page |

### Centralized Route Configuration

**Location:** `packages/academic/app/config/paths.ts`

```typescript
export interface RouteConfig {
    path: string      // Relative path (e.g., 'dashboard')
    fullPath: string  // Full path with base (e.g., '/academic/dashboard')
    title: string     // Page title for display
}

export const ROUTES = {
    'dashboard': route('dashboard', 'Dashboard'),
    'calendar': route('calendar', 'Calendar'),
    // ...
}

export const PATHS = {
    DASHBOARD: ROUTES['dashboard'].fullPath,
    // ...
}
```

**Usage:**
- **Navigation:** Use `PATHS.DASHBOARD` for `<Link to={...}>`
- **Route matching:** Use `getRouteByPath(pathname)` to get config from URL
- **Page titles:** Access via `ROUTES['dashboard'].title`

---

## Color System

### Two-Layer Architecture

1. **CSS Variables** (`colors.css`) - Theme-aware values (`:root.dark` / `:root.light`)
2. **TypeScript Constants** (`colors.ts`) - Reference CSS variables and export page-specific color objects

### Page-Specific Color Objects

Each page has its own color export that spreads `GLOBAL`:

```typescript
export const CALENDAR = {
    ...GLOBAL,

    // No School
    NO_SCHOOL_BG: 'var(--calendar-no-school-bg)',
    NO_SCHOOL_PATTERN: 'var(--calendar-no-school-pattern)',
    // ...
}
```

### Usage Pattern

Colors are applied via inline styles accessing these constants:

```tsx
<div style={{
    backgroundColor: CALENDAR.BACKGROUND_PRIMARY,
    borderColor: CALENDAR.BORDER_PRIMARY,
    color: CALENDAR.TEXT_PRIMARY
}}>
```

---

## Styling Patterns

### Hybrid Approach

- **Tailwind CSS** for utility classes (spacing, flex, grid)
- **Inline styles** for dynamic colors from the color system
- **CSS classes** for complex/reusable styles (`.modal-btn`, `.toast-notification`)

### Modal Styling Pattern

Modals use CSS custom properties passed via inline styles:

```tsx
<button
    className="modal-btn modal-btn-cancel"
    style={{
        '--modal-btn-bg': MODALS.BASE.CANCEL_BG,
        '--modal-btn-bg-hover': MODALS.BASE.CANCEL_BG_HOVER,
        '--modal-btn-text': MODALS.BASE.CANCEL_TEXT,
    } as React.CSSProperties}
>
```

---

## State Management

### Data Persistence

**Pattern:** Custom `useLocalStorage` hook with `useSyncExternalStore`

**Location:** `packages/academic/app/hooks/data/useLocalStorage.ts`

- Reads/writes to localStorage synchronously
- Syncs across components via custom events
- Syncs across browser tabs via native storage event

**Storage Keys:** `packages/academic/app/config/storageKeys.ts`

```typescript
STORAGE_KEYS = {
    ASSIGNMENTS: 'trackmateAssignments',
    CLASSES: 'trackmateClasses',
    TERMS: 'trackmateTerms',
    EVENTS: 'trackmateEvents',
    NO_SCHOOL: 'trackmateNoSchool',
    SCHEDULES: 'trackmateSchedules',
    SETTINGS: 'trackmateSettings',
}
```

### Context-Based State

| Context | Location | Purpose |
|---------|----------|---------|
| **AuthContext** | `packages/shared/contexts/AuthContext.tsx` | Firebase authentication state |
| **ToastContext** | `packages/shared/contexts/ToastContext.tsx` | Toast notifications |
| **ModalContext** | `packages/academic/app/contexts/ModalContext.tsx` | Modal management |
| **ScheduleComponentsContext** | `packages/academic/app/contexts/ScheduleComponentsContext.tsx` | Schedule-type-specific components |

### Modal State Pattern

Modal management is centralized in ModalContext:

```typescript
activeModal: string | null
modalData: any
openModal: (modalName: string, data?: any) => void
closeModal: () => void
```

---

## Type Definitions

### Core Types

**Location:** `packages/academic/app/types/index.ts`

#### Primitives

```typescript
type Priority = 'High' | 'Medium' | 'Low'
type Status = 'To Do' | 'In Progress' | 'Done'
type AssignmentType = string  // User-configurable
type DayType = 'A' | 'B' | null
type ThemeMode = 'light' | 'dark'
type TermMode = 'Semesters Only' | 'Semesters With Quarters'
type ScheduleType = 'alternating-ab' | 'none'
```

#### Core Entities

```typescript
interface Assignment {
    id: string
    title: string
    dueDate: string          // YYYY-MM-DD
    dueTime: string          // HH:MM (24-hour)
    priority: Priority
    status: Status
    classId: string
    type: AssignmentType
    createdAt: string
    description?: string
}

interface Class {
    id: string
    name: string
    color: string            // Hex color
    teacherName: string
    roomNumber: string
    termId?: string
    semesterId?: string
}

interface Event {
    id: string
    title: string
    date: string             // YYYY-MM-DD
    startTime: string | null // HH:MM or null for all-day
    endTime: string | null
    color: string
    createdAt: string
    description?: string
}

interface NoSchoolPeriod {
    id: string
    startDate: string
    endDate: string
    name: string
    createdAt: string
}
```

#### Academic Terms

```typescript
interface AcademicTerm {
    id: string
    name: string
    startDate: string
    endDate: string
    termType: TermMode
    semesters: Semester[]
}

interface Semester {
    id: string
    name: 'Fall' | 'Spring'
    startDate: string
    endDate: string
    quarters?: Quarter[]
}

interface Quarter {
    id: string
    name: 'Q1' | 'Q2' | 'Q3' | 'Q4'
    startDate: string
    endDate: string
}
```

#### Schedule Configuration

```typescript
interface Schedules {
    type: ScheduleType
    'alternating-ab'?: AlternatingABData
    'none'?: NoScheduleData
}

interface AlternatingABData {
    startDate: string
    startDayType: 'A' | 'B'
    dayTypeOverrides: Record<string, 'A' | 'B'>
    terms: Record<string, TermSchedule>
}

interface TermSchedule {
    Fall: SemesterScheduleData
    Spring: SemesterScheduleData
}

interface SemesterScheduleData {
    days: DaySchedule[]
}

interface DaySchedule {
    dayLabel: string
    classes: (string | null)[]  // Class IDs or null for empty
}
```

---

## Custom Hooks

### Entity Hooks

**Location:** `packages/academic/app/hooks/entities/`

Each entity has a dedicated hook providing filtered views, indexed data, lookup functions, and CRUD operations:

| Hook | Purpose |
|------|---------|
| `useAssignments` | Assignment CRUD, filtering (active/completed/overdue), indexed by date |
| `useClasses` | Class CRUD, lookup by ID/name, indexed by term |
| `useEvents` | Event CRUD, today's/upcoming events, indexed by date |
| `useNoSchool` | No-school periods, date-based lookup, date range expansion |
| `useAcademicTerms` | Academic terms, active term detection, term-based filtering |
| `useSchedules` | Schedule configuration, day type calculation |
| `useSettings` | App settings (theme, term mode, assignment types) |

**Entity Hook Pattern:**

```typescript
export const useAssignments = () => {
    const [assignments, setAssignments] = useLocalStorage(...)
    
    // Filtered views
    const activeAssignments = useMemo(() => ...)
    
    // Indexed data
    const assignmentsByDate = useMemo(() => ...)
    
    // Lookup functions
    const getAssignmentById = useCallback((id: string) => ...)
    
    // CRUD Actions
    const addAssignment = useCallback((data) => ...)
    
    return {
        // Raw data
        assignments,
        // Counts
        totalNum,
        // Filtered views
        activeAssignments, completedAssignments, overdueAssignments,
        // Indexed data
        assignmentsByDate,
        // Lookup functions
        getAssignmentById, getAssignmentsForDate,
        // Actions
        addAssignment, updateAssignment, deleteAssignment,
    }
}
```

### UI Hooks

**Location:** `packages/shared/hooks/` and `packages/academic/app/hooks/ui/`

| Hook | Purpose |
|------|---------|
| `useHover` | Track hover state, returns `isHovered`, `hoverProps`, and `resetHover` |
| `useFocus` | Track focus state, returns `isFocused` and `focusProps` to spread |

**Usage Pattern:**

```typescript
const { isHovered, hoverProps } = useHover()
<div {...hoverProps} style={{ backgroundColor: isHovered ? BG_HOVER : BG_DEFAULT }}>
```

### Data Hooks

**Location:** `packages/academic/app/hooks/data/`

| Hook | Purpose |
|------|---------|
| `useLocalStorage` | Persistent state with localStorage, cross-tab sync |

### Page-Level Hooks

Feature-specific hooks live in `pages/<Page>/hooks/`:

| Page | Hooks |
|------|-------|
| Calendar | `useCalendarGrid`, `useCalendarNavigation`, `useSelectedDate`, `useSidePanel` |
| Settings | `useAssignmentTypeSettings` |

---

## Utility Functions

### Shared Utilities

**Location:** `packages/shared/lib/`

| File | Functions | Description |
|------|-----------|-------------|
| `date.ts` | `todayString()`, `formatDate()`, `parseDateLocal()`, `dateToLocalISOString()` | Date manipulation |
| `firebase.ts` | Firebase exports | Firebase app, auth, firestore initialization |
| `id.ts` | `generateId()` | Unique ID generation (random + timestamp) |

### Academic App Utilities

**Location:** `packages/academic/app/lib/`

| Function | Description |
|----------|-------------|
| `cn()` | Tailwind class merging (clsx + twMerge) |
| `getTextColorForBackground()` | Contrast calculation (black/white) for hex colors |
| `parse12HourTime()` | Convert "2:30 PM" to "14:30" (24-hour format) |
| `addDaysToDateString()` | Add/subtract days from YYYY-MM-DD string |
| `formatEventTimeRange()` | Format time range for display (e.g., "2:30 PM - 4:00 PM") |

---

## Build & Development

### Scripts

**Location:** Root `package.json`

```json
{
    "dev:landing": "npm run dev --workspace packages/landing",
    "dev:academic": "npm run dev --workspace packages/academic",
    "build:landing": "npm run build --workspace packages/landing",
    "build:academic": "npm run build --workspace packages/academic",
    "build:all": "npm run build:landing && npm run build:academic",
    "lint:landing": "npm run lint --workspace packages/landing",
    "lint:academic": "npm run lint --workspace packages/academic",
    "deploy": "npm run build:all && firebase deploy"
}
```

### Vite Configuration

Both packages use Vite with:
- React plugin
- Path aliases (`@/` maps to `app/` or `src/`)
- Manual chunking for vendors:

```typescript
manualChunks: {
    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
    'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
    'ui-vendor': ['lucide-react', '@dnd-kit/core', ...]  // academic only
}
```

### CI/CD

**Location:** `.github/workflows/firebase-hosting-merge.yml`

- Triggers on push to `main` branch
- Runs `npm ci` and builds both workspaces
- Deploys to Firebase Hosting live channel

### Firebase Hosting

**Location:** `firebase.json`

- `/academic/**` rewrites to `/academic/index.html` (SPA routing)
- Other routes rewrite to `/index.html` (Landing SPA)

---

## Key Features

### Dashboard

**Location:** `packages/academic/pages/Dashboard/`

- **Upcoming Assignments** - List of active assignments sorted by due date
- **Today's Events** - Events scheduled for today
- **Today's Classes** - Classes based on current schedule rotation

### Calendar

**Location:** `packages/academic/pages/Calendar/`

- Monthly calendar grid with navigation
- Assignments and events displayed on calendar days
- Side panel showing details for selected date
- Day type display (A/B day)
- No-school period visualization

### My Assignments (Kanban Board)

**Location:** `packages/academic/pages/My Assignments/`

- **Drag-and-drop** using @dnd-kit
- Three columns: To Do, In Progress, Done
- Collapsible columns on mobile
- Assignment cards with priority, class color, due date

### My Classes

**Location:** `packages/academic/pages/My Classes/`

- Class cards with color, instructor, room, term info
- CRUD operations via modals
- Grid layout

### My Schedule

**Location:** `packages/academic/pages/My Schedule/`

- Schedule configuration based on schedule type
- Alternating A/B day schedule table
- Class assignment per period per day type

### Settings

**Location:** `packages/academic/pages/Settings/`

- **Theme Settings** - Light/Dark mode toggle
- **Assignment Types** - Drag-and-drop reordering, add/remove types
- **Schedule Settings** - Schedule type, A/B day correction
- **Term Settings** - Academic term management (semesters/quarters)
- **Danger Zone** - Bulk delete operations

### Authentication (Landing)

**Location:** `packages/landing/pages/`

- Sign In with email/password and Google
- Sign Up with email/password and Google
- Forgot Password flow
- Email verification
- Account management (profile, security, linked accounts, data deletion)

### Shared Modal System

**Location:** `packages/shared/components/modal/`

Comprehensive modal component library:
- ModalContainer, ModalHeader, ModalFooter
- Form inputs (text, date, time, textarea, select)
- Tab system (ModalTab, ModalTabSwitcher, ModalTabPanel)
- Buttons (Submit, Cancel, Delete)

---

## Key Conventions Summary

| Pattern | Convention |
|---------|------------|
| **Package organization** | Monorepo with `academic`, `landing`, `shared` packages |
| **Folder naming** | CamelCase for pages, nested `components/types/hooks` |
| **Component files** | `index.tsx` or `ComponentName.tsx` |
| **Type imports** | `import type { ... } from '@/pages/.../types'` |
| **Color usage** | Page-specific constants (`DASHBOARD`, `CALENDAR`, etc.) |
| **CSS variables** | Use `var(--...)` referenced through colors.ts |
| **State access** | Entity hooks for domain data, contexts for global state |
| **Data persistence** | `useLocalStorage` hook with cross-tab sync |
| **Props typing** | Namespaced interfaces mirroring component tree |
| **Path aliases** | `@/` maps to `app/` (academic/landing) or package root (shared) |
| **Route paths** | Centralized in `app/config/paths.ts` |
| **Entity hooks** | Entity-specific hooks in `app/hooks/entities/` |
| **Authentication** | Firebase Auth via shared AuthContext |
| **Notifications** | Shared ToastContext |
