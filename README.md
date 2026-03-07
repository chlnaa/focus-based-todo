# 📝 Focusdo App — Focus Timer & Productivity Analytics

[English] | [한국어](./README.ko.md) | [日本語](./README.ja.md)

---

FocustDo is a productivity web application that combines task management with focus session tracking and analytics.

The system records focus sessions as raw data in the `focus_sessions` table.
Instead of storing aggregated values, analytics are derived dynamically from session data.

Session records are fetched from Supabase and aggregated on the client using React Query hooks.
Analytics data is then combined with todo statistics and visualized using D3 charts.

This architecture avoids duplicated writes and separates the focus tracking domain from analytics and visualization layers.

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

- **Today Page**  
  Main page for adding, editing, and managing daily todos, with a dashboard summary.

- **Focus Page**  
  Dedicated page for running focus sessions on a selected todo.

- **Focus History Page**  
  Visualizes daily and weekly focus history records.Visualizes weekly focus trends using charts,  
  while daily records are presented as summary cards with detailed views in a modal.

---

## 🛠️ Tech Stack

Frontend

- **React + TypeScript**

Routing

- **React Router**

State Management

- **Zustand**

Server State

- **TanStack Query**

Backend / Database

- **Supabase (PostgreSQL)**

Data Visualization

- **D3.js**

Styling

- **Tailwind CSS**
- **shadcn/ui**

Date Library

- **Day.js**

---

## 📊 Architecture Notes

The application separates data fetching, analytics computation, and visualization.
Focus sessions are stored as raw records and analytics are computed dynamically.

---

## 🏗 Architecture Principles

- **Page-level orchestration**  
  Page components do not implement domain logic directly.  
  Instead, they orchestrate UI flow by composing stores and custom hooks.

- **Domain logic isolation**  
  Todo and focus-related business logic is isolated within stores and hooks.

- **Explicit UI state modeling**  
  Loading, empty, read-only, and error states are intentionally modeled and rendered.

- **No premature optimization**  
  Advanced optimizations such as virtualization or infinite scroll  
  will be introduced only when real usage patterns require them.

---

## 🔄 Data Flow

```
Todo Created (Today Page)
        ↓
Focus Timer (Focus Page)
        ↓
Focus Session Stored
        ↓
Supabase Database (focus_sessions)
        ↓
React Query Data Hooks
(useDailyAggregation)
        ↓
Client-side Aggregation
        ↓
Analytics Hooks
(useHistoryDashboard)
        ↓
Visualization Layer
(D3 Charts + Dashboard UI)
```

---

## 🧩 Analytics Layers

The analytics system is structured into three layers:

Data Fetch Layer

- `useDailyAggregation`
- Fetches session data from Supabase and aggregates focus time.

Analytics Layer

- `useHistoryDashboard`
- Combines focus statistics with todo completion data.

Visualization Layer

- `FocusTrendChart`
- `FocusTimeBarChart`
- `DayHistoryCard`

Charts are implemented using D3.js.

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

Domain logic is separated from UI components to improve scalability and maintainability.

---

## 🧠 Design Decisions

- Read-only dates are modeled as an explicit UI state to prevent misleading interactions.
- Empty states reflect whether the current date context allows user interaction.
- Date navigation logic is kept stateless to avoid hidden coupling across pages.

---

## ⚖️ Trade-offs

- All data is currently stored in memory for faster iteration.
- Focus history visualization prioritizes clarity over performance at scale.
- Mobile UX is functional but not fully optimized for very small screens.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

---

## 📈 Future Improvements

- List virtualization or infinite scroll
- ~~Persistent storage or backend sync~~
- Extended focus analytics
- Further mobile UX refinements
- Dark mode support
- Database view-based aggregation
- Query performance optimization with indexes
- Timer session recovery

---

## 🔗 Live Demo

focus-based-todo.vercel.app

---

## 📄 License

MIT
