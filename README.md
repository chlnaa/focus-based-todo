# 📝 Focusdo App

[English] | [한국어](./README.ko.md) | [日本語](./README.ja.md)

---

A productivity application that combines daily todo management with a focus timer.  
This project focuses on clear state ownership, predictable UI flows, and a scalable front-end architecture.

Designed for users who want to manage daily tasks with intentional focus,
instead of juggling multiple fragmented productivity tools.

---

## ✨ Features

- 📅 Date-based todo management
- ⏱️ Focus timer with preset and custom durations
- 🧠 Automatic focus time accumulation per task
- 🚫 Read-only mode for past and future dates
- 📊 Daily dashboard (completion rate, total focus time, completed tasks)
- 📈 Focus history view (daily / weekly)
- ⚠️ Explicit Loading / Empty / Error UI states

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

- **React + TypeScript**
- **Zustand** — global state management
- **TanStack Query** — async state handling
- **React Router**
- **Tailwind CSS**
- **shadcn/ui** — accessible UI components
- **Day.js** — date utilities

---

## 🧩 Architecture Notes

State flows are intentionally unidirectional:
user interaction → page orchestration → store mutation → derived UI.

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

## 🧠 Design Decisions

- Read-only dates are modeled as an explicit UI state to prevent misleading interactions.
- Empty states reflect whether the current date context allows user interaction.
- Date navigation logic is kept stateless to avoid hidden coupling across pages.

---

## ⚖️ Known Trade-offs

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

## 📌 Pre-release Scope

The following features are intentionally excluded in the initial release:

- Backend integration
- Authentication
- Persistent storage

These will be introduced incrementally after deployment.

---

## 📈 Future Improvements

- List virtualization or infinite scroll
- Persistent storage or backend sync
- Extended focus analytics
- Further mobile UX refinements

---

## 🔗 Live Demo

focus-based-todo.vercel.app

---

## 📄 License

MIT
