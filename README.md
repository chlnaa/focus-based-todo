# 📝 FocusDo App — Focus Timer & Productivity Analytics

[English] | [한국어](./README.ko.md) | [日本語](./README.ja.md)

---

FocusDo is a productivity web application that combines task management with focus session tracking.

Focus sessions are stored as raw event data in the `focus_sessions` table.

Instead of storing aggregated metrics, analytics are computed through a hybrid approach:

- Partial aggregation at the API layer (daily grouping)
- Final aggregation on the client (dashboard & history logic)
- Data shaping for visualization (missing date fill-in, D3 format conversion)

Session data is fetched from Supabase using React Query and aggregated on the client to generate productivity insights.

Dashboard metrics are derived from both:

- Todo state (completion rate)
- Focus session data (total focus time)

The system follows a layered client architecture where pages orchestrate UI composition,

hooks encapsulate domain logic, and feature modules implement interactive UI components.

---

## 🔗 Live Demo

focus-based-todo.vercel.app

---

## ✨ Features

- ⏱️ Focus Timer (25min / 50min / Custom)
- 📝 Todo Management
- 📊 Daily Productivity Dashboard
- 📈 Weekly Focus Time Analytics
- 🗂️ Focus Session History
- 📉 Data Visualization with D3
- ⚡ Data Fetching & Caching with React Query
- ♾️ Infinite Scroll (cursor-based pagination)
- ⚡ Optimistic UI updates

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

Past and future dates are displayed in read-only mode.

---

### Focus Page

Runs a focus timer for a selected todo.

When the timer completes or the user stops early, a confirmation modal is shown.

On confirmation, a focus session record is stored in the database.

Each session stores:

- `user_id`, `todo_id`, `start_time`, `end_time`, `duration`

---

### Focus History Page

Displays historical focus data.

- Weekly trends → line chart
- Focus time → bar chart
- Daily summaries → cards

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

- Supabase (PostgreSQL + Auth)

### Visualization

- D3.js

### Styling

- Tailwind CSS
- shadcn/ui

### Date Handling

- Day.js

---

## 📊 Architecture Overview

The application follows a layered architecture with clear separation of concerns.

The system flow below describes the structural data pipeline.

```
Client UI (Pages / Components)
        ↓
React Query Hooks (queries / mutations)
        ↓
API Layer (api/*.ts)
        ↓
Supabase (PostgREST)
        ↓
PostgreSQL (focus_sessions, todo)
        ↓
React Query Cache
        ↓
Client Aggregation Layer (hooks + lib/chart-utils)
        ↓
Derived State (dashboard / history hooks)
        ↓
Visualization (D3 / UI Components)
```

---

## 🏗 Architecture Principles

### Page-level orchestration

Pages coordinate UI composition but avoid domain logic.

---

### Domain logic isolation

Business logic lives in hooks and feature modules.

---

### Explicit UI state modeling

- loading
- empty
- read-only
- error

---

### Hybrid aggregation strategy

- API layer → partial aggregation (daily grouping via client-side reduce inside API functions)
- Client → final computation (completion rate, focus time metrics)

---

## 🔄 Data Flow

The following describes user-driven interaction flow:

```
[User Action]

1. Todo operations
   → useMutation (React Query)
   → Supabase (insert/update/delete)
   → Query invalidation & optimistic updates

2. Focus start (Focus Page)
   → useTimer (client-side state)

3. Focus completed or stopped early
   → Confirmation modal
   → createFocusSession (mutation)
   → Supabase insert

4. Data fetching
   → useQuery / useInfiniteQuery
   → Supabase fetch

5. Client aggregation
   → getDailyAggregation / getAllDailyAggregation (API layer - fetch raw records)
   → client-side reduce (group by date and sum duration)
   → useWeeklyFocusAggregation / useAllFocusAggregation (React Query layer)
   → useDayDashboard / useHistoryDashboard (derive metrics)
   → chart-utils.ts (fill missing dates and shape data for D3)

6. UI rendering
   → Dashboard / Charts (D3)
```

---

## 🧩 Analytics Layers

### Data Fetch Layer

- `useTodayFocusTime`
- `useTodoFocusTime`
- `useWeeklyFocusAggregation`
- `useAllFocusAggregation`

---

### Analytics Layer

- API aggregation (daily grouping)
- Client aggregation (dashboard & history)

---

### Visualization Layer

- Dashboard
- D3 charts

---

## 📂 Project Structure

```
src
 ├── api/
 ├── components/
 ├── constants/
 ├── features/
 │   ├── dashboard/
 │   ├── date/
 │   ├── history/
 │   └── todo/
 ├── hooks/
 ├── lib/
 ├── pages/
 ├── provider/
 ├── stores/
 ├── types/
 ├── App.tsx
 └── main.tsx
```

---

## 🧠 Design Decisions

### Read-only date model

Past and future dates are not editable. Users can only modify todos for the current day.

This is enforced via a `readOnlyVariant` flag in `TodayPage` and an `isReadOnly` flag in `TodoItems`.

---

### Optimistic updates

`useUpdateTodo` and `useDeleteTodo` update the React Query cache immediately before the server responds.

On error, the previous cache state is restored via the `onMutate` / `onError` rollback pattern.

This keeps the UI responsive without waiting for network round-trips.

---

### Wall-clock timer

`useTimer` computes elapsed time from `Date.now()` snapshots rather than decrementing a counter on each interval tick.

This prevents timer drift during tab switches, device sleep, or pauses.

---

### Session management

`SessionProvider` listens to Supabase Auth state changes and writes the session to Zustand.

`GlobalLoader` is shown until the initial session check completes, preventing rendering before auth state is resolved.

---

### Stateless date navigation

`useWeekNavigation` derives all date values from the `currentDate` prop with no internal state,

keeping navigation logic decoupled from UI.

---

### Client-side analytics

Analytics are computed from raw records on the client rather than using database views.

This simplifies the backend but trades some scalability for flexibility.

---

## ⚖️ Trade-offs

- Client-side aggregation instead of precomputed database aggregation
- `FocusHistoryPage` fetches all todos and focus records at once rather than paginating server-side — practical for individual users but not suitable for large data volumes
- The two pagination strategies (cursor-based for Today, client-side slicing for History) are intentionally different based on data access patterns
- Limited mobile UX optimization
- No focus session recovery if the user closes the tab mid-session

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
