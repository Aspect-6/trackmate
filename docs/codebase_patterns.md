# TrackMate Codebase Patterns & Conventions

This document describes the architectural patterns, coding conventions, and "language" used throughout the TrackMate codebase.

---

## Architecture & File Organization

### Top-Level Structure

```
src/
├── app/          # Core application infrastructure (shared)
│   ├── components/   # Global components (modals, sidebar)
│   ├── contexts/     # React contexts (AppContext, ToastContext)
│   ├── layouts/      # Layout components
│   ├── lib/          # Utility functions (utils.ts)
│   ├── styles/       # Global CSS and color system
│   ├── types/        # Core type definitions
│   └── config/       # Config files (brand.ts)
└── pages/        # Feature-based page modules
    ├── Dashboard/
    ├── Calendar/
    ├── My Assignments/
    ├── My Classes/
    ├── My Schedule/
    └── Settings/
```

### Page Module Pattern

Each page follows a consistent structure:

```
pages/<PageName>/
├── index.tsx           # Main page component
├── index.css           # Page-specific CSS variables
├── components/         # Page-specific components (deeply nested)
├── hooks/              # Page-specific hooks (e.g., useCalendar.ts)
└── types/              # Page-specific type definitions (types/index.ts)
```

---

## Component Patterns

### Hierarchical Component Structure

Components are **deeply nested** following a tree structure that mirrors the UI:

```
components/
└── TodaysClasses/
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
2. `useApp` / context imports second
3. `import type { ... }` for types third
4. Other imports (colors, CSS, components)

**Example:**

```tsx
import React, { useState } from 'react'
import { useApp } from '@/app/contexts/AppContext'
import type { TodaysClasses } from '@/pages/Dashboard/types'
import { DASHBOARD } from '@/app/styles/colors'
```

### Component Typing Pattern

Props are defined using **TypeScript namespaces** in `types/index.ts`. Namespaces mirror the component hierarchy exactly.

```typescript
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

Components reference their props like:

```tsx
const ClassItem: React.FC<TodaysClasses.Body.ClassList.ClassItemProps> = ({ ... }) => { ... }
```

---

## Color System

### Two-Layer Architecture

1. **CSS Variables** (`colors.css`) - Theme-aware values (`:root.dark` / `:root.light`)
2. **TypeScript Constants** (`colors.ts`) - Reference CSS variables and export page-specific color objects

### Page-Specific Color Objects

Each page has its own color export that spreads `GLOBAL`:

```typescript
export const DASHBOARD = {
    ...GLOBAL,
    MODULE_BG: 'var(--dashboard-module-bg)',
    CARD_BG: 'var(--dashboard-card-bg)',
    // ...
}
```

### Usage Pattern

Colors are applied via inline styles accessing these constants:

```tsx
<div style={{
    backgroundColor: DASHBOARD.BACKGROUND_PRIMARY,
    borderColor: DASHBOARD.BORDER_PRIMARY,
    color: DASHBOARD.TEXT_PRIMARY
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

### Context Pattern

- Single `AppContext` provides all global state and actions
- Consumed via `useApp()` hook
- Handles: assignments, classes, events, noSchool, schedule, theme, modals

### LocalStorage Persistence

Data is persisted/loaded from localStorage with helper functions.

### Modal State

Modal management is centralized in context:

```typescript
activeModal: string | null
modalData: any
openModal: (modalName: string, data?: any) => void
closeModal: () => void
```

---

## Type Definitions

### Core Types (`app/types/index.ts`)

Well-documented interfaces with JSDoc comments:

- `Assignment`, `Class`, `Event`, `NoSchoolPeriod`, `Schedule`, `AcademicTerm`, `Semester`
- `AppContextType` - the context interface

### Type Aliases

Reusable derived types:

```typescript
export type SemesterName = Semester['name']  // 'Fall' | 'Spring'
export type ScheduleDayType = NonNullable<DayType>  // 'A' | 'B'
export type SemesterScheduleData = Pick<Schedule, 'aDay' | 'bDay'>
```

---

## Custom Hooks

Page-specific logic is extracted into hooks:

```typescript
export const useCalendar = () => {
    const { assignments, events, ... } = useApp()
    // Hook logic
    return { currentDate, selectedDate, calendarCells, ... }
}
```

---

## Utility Functions (`lib/utils.ts`)

| Function | Description |
|----------|-------------|
| `cn()` | Tailwind class merging |
| `generateId()` | Unique ID generation |
| `formatDate()` | Short date format (e.g., "Jan 1") |
| `formatMediumDate()` | Medium date format (e.g., "Jan 1, 2023") |
| `formatFullDate()` | Full date format (e.g., "January 1, 2023") |
| `todayString()` | Current date as YYYY-MM-DD |
| `parseDateLocal()` | Parse YYYY-MM-DD to Date |
| `dateToLocalISOString()` | Date to YYYY-MM-DD |
| `getTextColorForBackground()` | Contrast calculation |

---

## Key Conventions Summary

| Pattern | Convention |
|---------|------------|
| **Folder naming** | CamelCase for pages, nested `components/types/hooks` |
| **Component files** | `index.tsx` or `ComponentName.tsx` |
| **Type imports** | `import type { ... } from '@/pages/.../types'` |
| **Color usage** | Page-specific constants (`DASHBOARD`, `CALENDAR`, etc.) |
| **CSS variables** | Use `var(--...)` referenced through colors.ts |
| **State access** | `useApp()` hook from AppContext |
| **Props typing** | Namespaced interfaces mirroring component tree |
| **Path aliases** | `@/` maps to `src/` |
