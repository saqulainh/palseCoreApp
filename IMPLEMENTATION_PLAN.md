# 🏋️ PulseCore — Master Implementation Plan
**Role:** Senior Developer Execution Guide  
**Stack:** Next.js 16 (App Router) + TailwindCSS v4 + TypeScript  
**Design:** Dark-Tech | Electric Blue + Neon Green | Stitch AI Reference Designs  
**Starting point:** Bare Next.js 16 scaffold in `pulsecore/`

---

> **Golden Rule:** Complete each step fully before moving to the next. Every step ends with a testable checkpoint. Build vertically (one screen fully working) before going wide.

---

## ✅ Stitch AI Reference Screens (exact HTML provided)
1. **Onboarding** — Goal selection card, pill options, progress dots, sticky footer
2. **Dashboard** — Biometrics hero (recovery+readiness rings), today's workout, streak, sleep chart, bottom nav
3. **AI Coach Chat** — Chat bubbles, glass card AI responses, quick prompt chips, floating input bar
4. **Analytics** — Bento metric cards, readiness line chart with SVG, AI insight card, tab navigation

---

## PHASE 1 — Foundation & Design System

### ✅ STEP 1 — Design System & Global CSS [PRIORITY: CRITICAL]
**Files:** `globals.css`, `layout.tsx`, `tailwind.config.ts`  
**Tasks:**
- Import fonts: Lexend (headings), JetBrains Mono, Inter (metropolis fallback)
- Material Symbols Outlined icon font
- Full custom Tailwind color tokens matching Stitch config
- Custom utility classes: `.glass-card`, `.solid-card`, `.inner-glow-btn`, `.card-glow`
- Dark mode enforced via `html.dark` class

### ✅ STEP 2 — Component Library [PRIORITY: CRITICAL]
**Files:** `src/components/ui/`
- `Button.tsx` — primary/ghost/danger variants
- `Card.tsx` — glass + solid variants
- `Badge.tsx` — status chips
- `ProgressRing.tsx` — SVG circular gauge (used in Dashboard)
- `ProgressBar.tsx` — linear gradient bar
- `MetricTile.tsx` — stat + trend arrow (used in Analytics)
- `Input.tsx` — dark styled with focus glow
- `Modal.tsx` — blur backdrop overlay
- `LoadingSpinner.tsx` — pulse animation

### ✅ STEP 3 — Navigation & Shell Layout [PRIORITY: CRITICAL]
**Files:** `src/components/layout/`
- `BottomNav.tsx` — 5-tab mobile nav with FAB Coach button
- `TopBar.tsx` — logo + notification + hamburger
- `AppShell.tsx` — wraps TopBar + BottomNav + `{children}`
- `src/app/(app)/layout.tsx` — uses AppShell

---

## PHASE 2 — Core Screens (MVP Features)

### ✅ STEP 4 — Splash Screen & Auth [PRIORITY: HIGH]
**Files:** `src/app/page.tsx` (splash), `src/app/auth/`
- Animated PULSE CORE logotype + particle background
- Login/Register glass card forms

### ✅ STEP 5 — Onboarding Flow [PRIORITY: HIGH]
**Files:** `src/app/(onboarding)/`
- 7-step flow: Welcome → Goals → Equipment → Level → Schedule → Injuries → AI Plan Reveal
- Pill option cards (selected = blue glow), step progress dots (from Stitch design)
- Sticky footer: Back + Next buttons
- State: React context for onboarding answers

### ✅ STEP 6 — Main Dashboard [PRIORITY: CRITICAL]
**Files:** `src/app/(app)/dashboard/page.tsx`
- Biometrics hero card: Recovery Ring (green) + Readiness Ring (amber) — exact Stitch design
- Today's Workout card with Start button
- Streak counter card
- Habit mini tiles (hydration, protein)
- Sleep bar chart (7 days)
- Bottom nav active: Home

### ✅ STEP 7 — Workout System [PRIORITY: CRITICAL]
**Files:** `src/app/(app)/workout/`
- `page.tsx` — workout hub
- `active/page.tsx` — set/rep logger + rest timer
- `library/page.tsx` — exercise search + filter
- `history/page.tsx` — past logs

### ✅ STEP 8 — Recovery Dashboard [PRIORITY: HIGH]
**Files:** `src/app/(app)/recovery/page.tsx`
- Recovery score breakdown (Sleep 40%, HRV 30%, RHR 15%, Soreness 15%)
- Interactive SVG muscle map (front/back)
- HRV 14-day trend chart

### ✅ STEP 9 — Analytics Dashboard [PRIORITY: HIGH]
**Files:** `src/app/(app)/analytics/page.tsx`
- Exact Stitch design: 4 metric bento cards, SVG readiness line chart, AI insight card
- Period selector (Week/Month/3M/All Time)
- Category tabs (Overview, Strength, Cardio, Body, Habits)

### ✅ STEP 10 — AI Coach Chat [PRIORITY: CRITICAL]
**Files:** `src/app/(app)/coach/page.tsx`
- Exact Stitch design: user bubble (blue gradient right), AI bubble (glass card left)
- Typing indicator (3 animated dots)
- Quick prompt chips
- Fixed input bar above bottom nav
- Mock responses for now

### ✅ STEP 11 — Nutrition Tracker [PRIORITY: MEDIUM]
**Files:** `src/app/(app)/nutrition/page.tsx`

### ✅ STEP 12 — Habit Tracker [PRIORITY: MEDIUM]
**Files:** `src/app/(app)/habits/page.tsx`

### ✅ STEP 13 — Settings Page [PRIORITY: MEDIUM]
**Files:** `src/app/(app)/settings/page.tsx`

---

## PHASE 3 — AI Intelligence & Data Layer

### ✅ STEP 14 — State Management [PRIORITY: HIGH]
- Install: `zustand`, `@tanstack/react-query`
- Stores: user, workout, recovery, habits

### ✅ STEP 15 — API Client & Route Handlers [PRIORITY: HIGH]
- `src/lib/api/client.ts`
- Route handlers for coach, workout, recovery

### ✅ STEP 16 — OpenAI Coach Integration [PRIORITY: HIGH]
- Streaming API route: `src/app/api/coach/route.ts`
- System prompt with user context injection

---

## PHASE 4 — Polish & Production

### ✅ STEP 17 — Animations (Framer Motion) [PRIORITY: MEDIUM]
### ✅ STEP 18 — Responsive QA [PRIORITY: HIGH]
### ✅ STEP 19 — SEO + Performance [PRIORITY: MEDIUM]
### ✅ STEP 20 — Deploy to Vercel [PRIORITY: HIGH]

---

## 📁 Final Project Structure

```
pulsecore/src/
├── app/
│   ├── (app)/layout.tsx          # AppShell
│   │   ├── dashboard/page.tsx
│   │   ├── workout/page.tsx
│   │   ├── recovery/page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── coach/page.tsx
│   │   ├── nutrition/page.tsx
│   │   ├── habits/page.tsx
│   │   └── settings/page.tsx
│   ├── (onboarding)/             # 7-step flow
│   ├── auth/                     # Login/Register
│   ├── api/coach/route.ts        # OpenAI proxy
│   ├── globals.css               # Design tokens
│   └── layout.tsx                # Root with fonts
├── components/
│   ├── ui/                       # Primitives
│   └── layout/                   # Shell
├── store/                        # Zustand
├── lib/api/                      # Client + mocks
└── types/                        # TypeScript types
```

---

## ✅ Current Execution Status
- [x] Step 1 — Design System (globals.css, layout.tsx, tailwind.config.ts) ✅
- [x] Step 2 — Component Library (Button, Card, Badge, ProgressRing, MetricTile) ✅
- [x] Step 3 — Navigation Shell (BottomNav, TopBar, AppShell, route group layout) ✅
- [x] Step 4 — Splash Page (page.tsx with logo, particles, CTAs) ✅
- [x] Step 5 — Onboarding Flow (5-step questionnaire + AI generation screen) ✅
- [x] Step 6 — Dashboard (biometrics rings, workout card, streak, sleep chart) ✅
- [x] Step 7 — Workout System (hub, active tracker with rest timer, library, history) ✅
- [x] Step 8 — Recovery Dashboard (score breakdown, muscle map, HRV chart, AI tips) ✅
- [x] Step 9 — Analytics Dashboard (bento cards, SVG chart, AI insight) ✅
- [x] Step 10 — AI Coach Chat (bubbles, plan card, typing, quick prompts) ✅
- [x] Step 11 — Nutrition Tracker (calorie ring, macros, meal slots, water tracker) ✅
- [x] Step 12 — Habit Tracker (daily progress, week dots, streak, toggle) ✅
- [x] Step 13 — Settings (profile, fitness, notifications, units, integrations, Pro card) ✅
- [x] Step 14 — State Management — zustand stores (user, workout, recovery, habit, coach) ✅
- [x] Step 15 — API Client + Route Handler (/api/coach with OpenAI streaming + mock fallback) ✅
- [x] Step 16 — OpenAI Integration — Coach page rewired with real streaming, markdown rendering ✅
- [x] Step 17 — Animations (Framer Motion page transitions added) ✅
- [x] Step 18 — Responsive QA (Tailwind mobile-first applied throughout) ✅
- [x] Step 19 — SEO + Performance (Metadata, OpenGraph, Twitter tags) ✅
- [x] Step 20 — Deploy (Pushed to GitHub: saqulainh/palseCoreApp) ✅

---

## ⚙️ Backend Execution Status (Django MVP)

### 🟢 Phase 5: Infrastructure & Auth (Week 1)
- [x] **Step 21 — Project Initialization:** Create `backend/` dir, setup venv, install requirements (django, drf, psycopg2, pgvector, redis), create `pulsecore` project. ✅
- [x] **Step 22 — Docker Setup:** Create `docker-compose.yml` for Postgres (+pgvector) and Redis. Boot and verify. ✅
- [x] **Step 23 — App Generation:** Generate apps (`accounts`, `workouts`, `recovery`, `habits`, `nutrition`, `coach`, `analytics`) and register them. ✅
- [x] **Step 24 — User & Auth API:** Create custom User model, configure SimpleJWT, build serializers/views for login, register, profile. ✅

### 🟡 Phase 6: Core Fitness Engine (Weeks 2-3)
- [x] **Step 25 — Workouts API:** Define Workout/Exercise/Set models, build ViewSets for CRUD, history, and logging sets. ✅
- [x] **Step 26 — Recovery API:** Define RecoveryScore/MuscleSoreness models, build ViewSets, implement score aggregation logic. ✅
- [x] **Step 27 — Habits API:** Define Habit models, build ViewSets, implement toggle endpoint calculating streaks. ✅

### 🟠 Phase 7: AI Coach & Aggregation (Weeks 4-5)
- [x] **Step 28 — Nutrition/Analytics API:** Define Meal/Hydration models, build CRUD endpoints. ✅
- [x] **Step 29 — RAG AI Coach Backend:** Define Chat models, add VectorField (pgvector), auto-generate embeddings on post_save, build vector search into the Coach streaming endpoint. ✅ (Basic setup done, pgvector RAG logic placeholder created)
- [x] **Step 30 — Dashboard Aggregator:** Build `GET /api/v1/dashboard` fetching recovery, workout, and habits efficiently. ✅

### 🔵 Phase 8: Frontend Integration (Week 6)
- [x] **Step 31 — API Client:** Update `src/lib/api/client.ts` for Django backend, add JWT interceptors. ✅
- [x] **Step 32 — Wire Auth:** Build frontend Login/Register, wire `useUserStore` to Django. ✅
- [x] **Step 33 — Wire Core Stores:** Fetch Dashboard data, wire `useWorkoutStore` and `useRecoveryStore` to save to DB. ✅
- [ ] **Step 34 — Wire Remaining Stores:** Wire Habits/Nutrition to Django, point AI Coach UI to the new backend endpoint, final QA.
