# ⚙️ PulseCore Final Backend Architecture & Execution Plan

This document serves as the master blueprint for transitioning PulseCore from in-memory client state to a robust, scalable Django backend with RAG AI capabilities.

---

## 1. Target Architecture & Tech Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | **Django (Python)** | Rapid development, built-in admin, excellent ORM, and easy integration with AI/data science libraries. |
| **Database** | **PostgreSQL** | Primary relational store. |
| **Extensions** | **TimescaleDB + pgvector** | TimescaleDB for time-series biometric data; `pgvector` to enable RAG (Retrieval-Augmented Generation) for the AI Coach. |
| **Cache & Sessions** | **Redis** | Fast read/write for session data, rate limiting, and real-time workout tracking state. |
| **Authentication** | **JWT + OAuth** | Secure, stateless API authentication with Google/Apple login support. |

---

## 2. Database Schema

**Users & Auth**
*   `users`: id, email, name, avatar_url, fitness_goal, fitness_level, equipment, schedule, injuries, units, subscription_tier, created_at

**Workouts**
*   `workouts`: id, user_id, name, started_at, finished_at, duration, created_at, embedding (Vector)
*   `exercises`: id, workout_id, name, muscle, target_sets, target_reps
*   `sets`: id, exercise_id, reps, weight, completed, order

**Recovery**
*   `recovery_scores`: id, user_id, score, readiness_level, sleep_quality, hrv, resting_hr, soreness, created_at
*   `muscle_soreness`: id, user_id, muscle_id, soreness, created_at

**Habits**
*   `habits`: id, user_id, name, icon, streak, created_at
*   `habit_completions`: id, habit_id, completed_at

**Chat & AI (RAG)**
*   `conversations`: id, user_id, created_at
*   `messages`: id, conversation_id, role, content, context, created_at
*   *Note:* Workouts and Recovery logs will have corresponding vector embeddings stored via `pgvector`.

**Analytics**
*   `body_measurements`: id, user_id, weight, body_fat, muscle_mass, recorded_at

---

## 3. RAG (Retrieval-Augmented Generation) Strategy

1.  **Vector Database:** Enable the `pgvector` extension in PostgreSQL.
2.  **Embedding Generation:** Auto-trigger async tasks to generate embeddings (via OpenAI `text-embedding-3-small`) when workouts or recovery logs are saved.
3.  **Retrieval:** Embed the user's chat query, perform cosine similarity search in Postgres, and retrieve the top 5 relevant logs.
4.  **Augmentation:** Inject retrieved records into the OpenAI system prompt for context-aware coaching.

---

## 4. API Endpoints

**Auth**
*   `POST /api/v1/auth/register`, `/api/v1/auth/login`, `/api/v1/auth/oauth/google`, `/api/v1/auth/oauth/apple`

**Workouts**
*   `GET /api/v1/dashboard` (Aggregated user data)
*   `GET /api/v1/workouts`, `POST /api/v1/workouts`, `PUT /api/v1/workouts/:id`
*   `POST /api/v1/workouts/:id/sets` (Log set completion)
*   `GET /api/v1/workouts/templates`

**Recovery**
*   `GET /api/v1/recovery`, `PUT /api/v1/recovery`, `POST /api/v1/muscle-soreness`

**Habits**
*   `GET /api/v1/habits`, `POST /api/v1/habits`, `POST /api/v1/habits/:id/toggle`, `DELETE /api/v1/habits/:id`

**Nutrition & Analytics**
*   `GET /api/v1/nutrition`, `POST /api/v1/nutrition`
*   `POST /api/v1/coach` (Chat message - powered by RAG)
*   `GET /api/v1/analytics`

---

## 5. File Structure

```text
backend/
├── pulsecore/
│   ├── core/              # Settings, WSGI
│   ├── accounts/          # Auth, user profiles
│   ├── workouts/          # Workout CRUD
│   ├── recovery/          # Recovery scoring
│   ├── habits/            # Habit tracking
│   ├── nutrition/         # Meal logging
│   ├── coach/             # AI chat & RAG implementation
│   ├── analytics/         # Insights & trends
│   └── common/            # Shared utilities
├── manage.py
├── requirements.txt
└── docker-compose.yml
```

---

## 6. Granular Execution Plan (Weeks 1-6)

### 🟢 Week 1: Infrastructure & Auth
*   **Step 21:** Initialize Django project (`backend/`), set up virtual env, and `requirements.txt` (Django, DRF, SimpleJWT, pgvector, redis).
*   **Step 22:** Create `docker-compose.yml` (Postgres + pgvector + TimescaleDB, Redis).
*   **Step 23:** Generate all Django apps (`accounts`, `workouts`, `recovery`, `habits`, `nutrition`, `coach`, `analytics`).
*   **Step 24:** Build `User` model and JWT/OAuth authentication endpoints.

### 🟡 Week 2: Workouts Core
*   **Step 25:** Define `Workout`, `Exercise`, `Set` models. Build CRUD endpoints.
*   **Step 26:** Update Next.js `useWorkoutStore` to connect to the new Django API.

### 🟠 Week 3: Recovery Engine
*   **Step 27:** Define `RecoveryScore` and `MuscleSoreness` models.
*   **Step 28:** Build recovery scoring API and migrate `recoveryStore`.

### 🔵 Week 4: Habits Tracker
*   **Step 29:** Define Habit models and completion logic.
*   **Step 30:** Build habit toggle API calculating streaks, migrate `habitStore`.

### 🟣 Week 5: Nutrition, Analytics & RAG AI
*   **Step 31:** Add basic nutrition logging API.
*   **Step 32:** Configure `pgvector` models and build the async embedding generator.
*   **Step 33:** Refactor `/api/v1/coach` to perform vector search and stream augmented responses.

### ⚪ Week 6: Polish & Dashboard
*   **Step 34:** Build the `/api/v1/dashboard` aggregator endpoint, complete end-to-end testing, and prepare for deployment/wearable integrations.
