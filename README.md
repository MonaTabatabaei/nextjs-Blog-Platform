# 📝 Next.js Blog Platform

A production-ready blog application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui** as part of a technical interview task.

👉 **Live demo:** [`https://nextjs-blog-platform-c7ly.vercel.app/`](https://nextjs-blog-platform-c7ly.vercel.app/)

---

## 🚀 Tech Stack

- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- Server Components Architecture
- JSONPlaceholder API
- LocalStorage Persistence

---

## ✨ Features

### 📄 Blog List Page
- Responsive grid layout
- Server-side pagination
- URL-based sorting
- Real-time search (case-insensitive)
- Loading skeletons
- Error boundaries

### 📄 Individual Post Page
- Featured image
- Author information
- Publication date
- Full content
- Comments section
- Accessible semantic markup

### 💬 Add Comment Feature
- Inline form validation
- Email format validation
- Minimum comment length validation
- Optimistic UI updates
- LocalStorage persistence for user comments

### 👤 Author Page
- Dynamic routing (`/authors/[id]`)
- Displays all posts by selected author
- Reuses existing blog grid components
- Fully server-rendered

### 🎛 Sorting Options
- Newest first
- Oldest first
- Title (A-Z / Z-A)
- Most / Least commented

### 🔎 Search
- Real-time filtering
- Case-insensitive
- URL-integrated state

### ⏳ Loading States
- App Router `loading.tsx`
- Skeleton UI
- No layout shift

### ❌ Error Handling
- Route-level error boundaries
- Friendly UI
- Retry mechanism

### 🌙 Dark Mode
- Persistent theme preference
- LocalStorage-based theme state
- System preference fallback

---

## 🧠 Architecture Highlights

- Server-first rendering strategy
- URL-based state management (pagination & sorting)
- Modular component structure
- No unnecessary client-side fetching
- Optimistic UI for better UX
- Accessible components (ARIA roles, semantic HTML)
- Clean separation of concerns

---

## 📦 Project Structure

src/
├── app/
│   ├── page.tsx                     # Home (blog list: search, sort, pagination)
│   ├── layout.tsx                  # Root layout + header + container
│   ├── loading.tsx                 # Global loading skeleton
│   ├── error.tsx                   # Global error boundary
│   ├── icon.tsx                    # Favicon/icon
│   ├── Blog/                       # Blog feature (list view)
│   │   ├── Blog.tsx                # Blog route wrapper (optional)
│   │   └── components/
│   │       ├── BlogHome/           # Home composition (SearchBar + Sort + Grid)
│   │       ├── PostGrid/           # Post cards grid
│   │       ├── SearchBar/          # Client search input (URL-synced)
│   │       ├── SortDropdown/       # Sort selector (URL-driven)
│   │       ├── Pagination/         # Accessible pagination controls
│   │       └── EmptyState/         # “No results” state
│   ├── posts/[id]/                 # Single post page
│   │   ├── page.tsx                # Server component: fetch post + comments
│   │   └── components/             # Post detail UI, loading, error
│   └── authors/[id]/               # Author page
│       ├── page.tsx                # Server component: author + posts by author
│       └── components/             # Author header + author posts section
│
├── components/
│   ├── layout/                     # Header, Container, ThemeToggle, layout types
│   ├── ui/                         # shadcn-style primitives (button, card, input, …)
│   ├── LoadingSkeleton/            # Shared skeleton for blog list
│   └── providers/QueryProvider.tsx # React Query client provider
│
├── lib/
│   ├── api.ts                      # Server-side blog/author helpers (JSONPlaceholder)
│   ├── sortPosts.ts                # Pure sort utilities
│   ├── filterPosts.ts              # Pure search/filter utilities
│   ├── usePersistedComments.ts     # LocalStorage-backed comments hook
│   ├── useLocalCommentCounts.ts    # Local comment counts for sorting
│   ├── generated/                  # Orval + React Query API client
│   ├── fetcher.ts                  # Custom fetcher used by Orval client
│   ├── swagger.yaml                # OpenAPI spec for Orval
│   └── utils.ts                    # Shared utility helpers

---

## 🧩 Getting Started

### Requirements

- **Node.js** 18+ (tested with Node 18/20)
- **npm** (or a compatible package manager)

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Lint & type-check

```bash
npm run lint
```

### Production build

```bash
npm run build
npm start
```

---

## 🌐 API & Codegen (Orval + React Query)

This project consumes the public **JSONPlaceholder** API and generates a typed React Query client using **Orval**:

- OpenAPI spec: `src/lib/swagger.yaml`
- Orval config: `orval.config.ts`
- Generated client: `src/lib/generated/blog-api.ts`
- Custom fetcher: `src/lib/generated/fetcher.ts`

Regenerate the client after changing the OpenAPI spec:

```bash
npm run swagger:run
```

Example usage of the generated **create comment** mutation:

```ts
import { useCreateComment } from "@/lib/generated/blog-api";

const createCommentMutation = useCreateComment();

createCommentMutation.mutate({
  data: {
    postId: 1,
    name: "John Doe",
    email: "john@example.com",
    body: "Nice post!",
  },
});
```

The UI-level data flow for comments is:

1. Server renders initial comments from JSONPlaceholder.
2. `usePersistedComments` merges them with `localStorage` comments.
3. `useCreateComment` posts to the API and drives optimistic updates.

---

## 🧩 Design & Architecture Decisions

- **Server-first rendering**: Home and author pages fetch and process data on the server, then hydrate only interactive pieces on the client.
- **URL as state**: `?page=`, `?sort=`, and `?q=` encode pagination, sorting, and search so state is shareable and bookmarkable.
- **Modular composition**: Route-level pages are thin and composed from small, reusable components (`BlogHome`, `PostGrid`, `AuthorHeader`, etc.).
- **Local-only enhancements**: Comments are persisted in `localStorage` and merged with server data for a smoother UX without maintaining a real backend.

---

## ⚠️ Known Limitations

- Data comes from **JSONPlaceholder**, which is a read-only fake API:
  - New comments are **not** actually persisted on the server.
  - Comments are stored locally in `localStorage` and will disappear if storage is cleared.
- There is no authentication or authorization; every route is public.
- The project focuses on the blog experience rather than a full CMS (no admin UI for creating posts).

---