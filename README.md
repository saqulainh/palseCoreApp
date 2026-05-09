# 🏋️‍♂️ PulseCore — Your Intelligent Fitness OS

> "Bhai, this is not just another fitness app. This is a full-blown Fitness OS built for peak performance."

PulseCore is a premium, AI-driven fitness tracking ecosystem. Built with a sleek "Dark-Tech" UI, it doesn't just log sets and reps—it calculates recovery, tracks habits, logs nutrition, and provides an OpenAI-powered RAG Coach that remembers everything you've ever lifted. Ekdum kadak! 🔥

---

## 🚀 Tech Stack (Apun Ka Stack)

We are building this full-stack beast in two phases. Frontend is 100% complete and polished. The backend is next.

### Frontend (Client-Side) 🎨
*   **Framework:** Next.js 16 (App Router)
*   **Styling:** Tailwind CSS v4 (Mobile-first, glass-morphism, custom tokens)
*   **State Management:** Zustand (Optimistic UI updates)
*   **Animations:** Framer Motion (Smooth page transitions)
*   **Typography:** Lexend, Inter, JetBrains Mono
*   **AI Chat:** React Markdown with streaming

### Backend (Server-Side) ⚙️ *(In Progress)*
*   **Framework:** Django + Django REST Framework (DRF)
*   **Database:** PostgreSQL
*   **Time-Series Data:** TimescaleDB (for biometrics & sleep tracking)
*   **AI/RAG:** `pgvector` (Vector database for OpenAI similarity search)
*   **Cache:** Redis
*   **Auth:** JWT + OAuth (Google/Apple) via SimpleJWT

---

## 🧠 The AI Coach (RAG Implementation)
Why use standard ChatGPT when you can give the AI actual memory?
We are using **Retrieval-Augmented Generation (RAG)** built directly into PostgreSQL using `pgvector`. 
Whenever you finish a workout or log recovery, Django generates an embedding using `text-embedding-3-small`. When you chat with the Coach, it searches your vector history instantly so the Coach actually knows how your last leg day went. 

---

## 📁 Project Structure

```text
pulseCoreApp/
├── pulsecore/            # 🟢 NEXT.JS FRONTEND (Completed)
│   ├── src/app/          # Routes (Dashboard, Workout, Analytics)
│   ├── src/components/   # UI components (Button, ProgressRing, GlassCard)
│   ├── src/store/        # Zustand stores
│   └── src/lib/api/      # Next.js Server Actions & API wrappers
│
├── backend/              # 🔵 DJANGO BACKEND (Starting Next)
│   ├── core/             # Base project
│   ├── accounts/         # JWT Auth
│   ├── workouts/         # Sets, reps, volume
│   ├── recovery/         # Sleep, HRV, readiness
│   └── coach/            # RAG AI integration
│
├── IMPLEMENTATION_PLAN.md # Master execution checklist
└── BACKEND_PLAN.md        # DB Schema & Endpoint blueprint
```

---

## 🏃‍♂️ How to Run Locally

### Frontend
```bash
cd pulsecore
npm install
npm run dev
```
*Open `http://localhost:3000` to see the magic.*

### Backend (Coming Soon)
```bash
cd backend
docker-compose up -d  # Boots Postgres (pgvector) and Redis
python manage.py runserver
```

---

*Built with ❤️ by Senior Devs for athletes who want to push the limit.*
