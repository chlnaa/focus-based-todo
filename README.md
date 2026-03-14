# 📝 Focusdo App — Focus Timer & Productivity Analytics

[English] | [한국어](./README.ko.md) | [日本語](./README.ja.md)

---

FocusDo is a productivity web application that combines task management with focus session tracking.
Focus sessions are stored as raw event data in the `focus_sessions` table.
Instead of storing aggregated metrics, analytics are derived dynamically from session records.
Session data is fetched from Supabase using React Query and aggregated on the client to generate daily statistics and productivity insights.
Todo statistics and focus session data power the dashboard and history visualizations.
The system follows a layered client architecture where pages orchestrate UI composition, hooks encapsulate domain logic, and feature modules implement interactive UI components.
This architecture keeps the focus tracking domain simple while separating data storage, analytics computation, and visualization.

---

## 🔗 Live Demo

focus-based-todo.vercel.app

---

## ✨ Features

- ⏱️ Focus Timer
- 📝 Todo Management
- 📊 Daily Productivity Dashboard
- 📈 Weekly Focus Time Analytics
- 🗂️ Focus Session History
- 📉 Data Visualization with D3
- ⚡ Data Fetching & Caching with React Query

---

## 🗂️ Pages

### Today Page

Main productivity hub.

Users can:

- view the weekly calendar
- manage daily todos
- start focus sessions
- see daily productivity metrics

The dashboard summarizes:

- total focus time
- todo completion rate
- completed tasks

---

### Focus Page

Runs a focus timer for a selected todo.
When the timer completes, a focus session record is stored in the database.

Each session stores:

- `user_id`
- `todo_id`
- `duration`
- `start_time`

---

### Focus History Page

Displays historical focus data.

Weekly focus trends are visualized using charts, while daily summaries are presented as cards.
Detailed records can be inspected through modal views.

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript

### Routing

- React Router

### State Management

- Zustand (UI state)

### Server State

- TanStack Query

### Backend / Database

- Supabase (PostgreSQL)

### Visualization

- D3.js

### Styling

- Tailwind CSS
- shadcn/ui

### Date Handling

- Day.js

---

## 📊 Architecture Overview

The application separates UI rendering, domain logic, and server state.
The following diagram illustrates the unidirectional data flow and client-side aggregation pipeline used in the application.

![architecture-diagram-img](./public/images/architecture-diagram.png)

Pages orchestrate application flow and UI composition, while domain logic is encapsulated in reusable hooks.
Feature modules compose these hooks into interactive UI components and implement user-facing interactions.

---

## 🏗 Architecture Principles

### Page-level orchestration

Page components coordinate UI composition but avoid implementing domain logic directly.
Instead, they compose hooks and stores that encapsulate behavior.

---

### Domain logic isolation

Todo operations, focus tracking, and analytics logic are implemented in hooks and feature modules rather than page components.
This improves maintainability and testability.

---

### Explicit UI state modeling

The UI explicitly models important states:

- loading
- empty
- read-only
- error

These states are represented by dedicated UI components.

---

### Avoid premature optimization

Complex optimizations such as virtualization or pagination are intentionally postponed until real usage patterns require them.

---

## 🔄 Data Flow

```
Todo Created (Today Page)
        ↓
Focus Timer (Focus Page)
        ↓
Focus Session Completed
        ↓
Focus Session Stored
        ↓
Supabase Database (focus_sessions)
        ↓
React Query Hooks
        ↓
Client-side Aggregation
        ↓
Dashboard / Analytics Hooks
        ↓
Visualization Components
```

---

## 🧩 Analytics Layers

Analytics are computed on the client from raw session records.

### Data Fetch Layer

- `useTodayFocusTime`
- `useTodoFocusTime`

Fetch focus session records and compute total durations.

---

### Analytics Layer

- `useDayDashboard`

Combines focus statistics and todo completion metrics to generate dashboard data.

---

### Visualization Layer

- Dashboard components
- History charts (D3)

These components present aggregated data in charts and summary cards.

---

## 📂 Project Structure

```
src
 ├ api
 ├ components
 ├ constants
 ├ features
 │   ├ dashboard
 │   ├ date
 │   ├ history
 │   └ todo
 ├ hooks
 ├ lib
 ├ pages
 └ provider
 └ store
 └ types
```

This structure separates UI, domain logic, and data access layers.
Domain logic is separated from UI components to keep the system modular and scalable.

---

## 🧠 Design Decisions

### Read-only date model

Past and future dates are treated as read-only to prevent misleading interactions.
Users can only modify todos for the current day.

---

### Explicit empty states

Empty states are intentionally modeled to communicate whether the user can interact with the current context.

---

### Stateless date navigation

Calendar navigation logic is implemented as stateless utilities to avoid hidden coupling between pages.

---

## ⚖️ Trade-offs

- Analytics are computed on the client instead of using database views.
- Focus history visualization prioritizes clarity over scalability.
- Mobile UX is functional but not fully optimized for small screens.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

---

## 📈 Future Improvements

- List virtualization for large datasets
- Extended productivity analytics
- Improved mobile experience
- Dark mode support
- Database view-based aggregation
- Query performance optimization with indexes
- Timer session recovery

---

## 📄 License

MIT
