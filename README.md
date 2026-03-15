# Eco & Ecology Education Platform

This mono-repo hosts a dual-stack experience:
- **Backend:** Node.js + Express + MongoDB with JWT authentication, quiz engine, gamification, and admin analytics.
- **Frontend:** React + Tailwind + Framer Motion + Chart.js offering 12 pages, nature-inspired UI, dashboards, and interactive quiz flows.

## Folder structure

- `/backend` – Express server, Mongo models (`User`, `Lesson`, `Quiz`, `Question`, `Result`, `Reward`, `Leaderboard`), controllers, routes, middleware, and seed scripts.
- `/frontend` – Vite-powered React app with `components`, `pages`, `context`, `services`, and Tailwind styling.
- `/public/logo.png` & `/public/favicon.ico` – placeholder brand assets used across nav/login/footer.

## Backend overview

### API routes

| Route | Verb | Description |
|---|---|---|
| `/api/auth/signup` | POST | Create user and return JWT. |
| `/api/auth/login` | POST | Authenticate user and issue JWT. |
| `/api/lessons` | GET/POST | List lessons or admin-create with JWT. |
| `/api/lessons/:slug` | GET | Retrieve lesson detail by slug. |
| `/api/quizzes/:slug` | GET | Load quiz questions for a lesson. |
| `/api/quizzes/:id/submit` | POST | Submit answers; rewards, badges, leaderboard update. |
| `/api/results/me` | GET | User quiz history. |
| `/api/results/all` | GET | Admin view of all recent results. |
| `/api/rewards/me` | GET | User reward log. |
| `/api/leaderboard` | GET | Top learners by points. |
| `/api/admin/metrics` | GET | Admin analytics (lessons/quizzes/users/results). Requires admin JWT. |
| `/api/admin/users` | GET | List of registered users for admin oversight. |

### Models

- `User` – tracks identity, password hash, role, reward points, badges, level, streaks, leaderboard rank.
- `Lesson` – title, slug, topic, content, images, key points, duration.
- `Quiz` + `Question` – lesson-linked quiz metadata and 40-question bank per lesson.
- `Result` – per-attempt stats (accuracy, score, time).
- `Reward` – points/badge audit trail.
- `Leaderboard` – cached standings linked to users.

### Seed scripts

- `npm run seed` – runs `src/utils/seedLessons.js` to insert 70+ lessons.
- `node src/utils/seedQuizzes.js` – generate a 40-question quiz for each lesson.

## Frontend overview

### Pages (all under `/src/pages`)

- Home, About, Lessons, Lesson Detail, Quiz, Quiz Result, Leaderboard, Dashboard, Login, Signup, Admin Dashboard, Contact.
- Features include: responsive layout, dark mode toggle, parallax hero, smooth Framer Motion animations, Chart.js progress visualization, gamification cues (levels/badges/streaks), progress bars, and loading states.

### Key utilities

- `AuthContext` – central JWT + user store, persists to `localStorage`.
- `services/api.js` – Axios instance pointing to `VITE_API_URL` or `http://localhost:5000/api` with helper `setAuthToken`.
- Hooks such as `useLessons` centralize data fetching; reusable components (Nav, Footer, LessonPreview) maintain design consistency.

## Setup

### Backend
1. `cd backend`
2. `npm install`
3. Copy `.env.example` → `.env` and set `MONGO_URI`, `JWT_SECRET`, `PORT`.
4. `npm run seed` to populate lessons, `node src/utils/seedQuizzes.js` to create quizzes (optional but recommended).
5. `npm run dev` to start server with `nodemon` (or `npm run start` for production).

### Frontend
1. `cd frontend`
2. `npm install`
3. Set `VITE_API_URL` (e.g., `http://localhost:5000`) in `.env` or via `.env.development`.
4. `npm run dev` to launch Vite dev server.
5. Navigate to http://localhost:5173 to explore pages.

## Deployment

### MongoDB Atlas
1. Create a free cluster on MongoDB Atlas.
2. Add a database user with password.
3. Whitelist your app IP or use `0.0.0.0/0` for testing (less secure).
4. Copy the connection string and override `<password>`; place it into backend `.env` or Render secret `MONGO_URI`.

### Backend on Render
1. Create a new **Web Service** at https://render.com.
2. Connect your GitHub repo and use `backend` as the root directory.
3. Set the build command to `npm install` and start command to `npm run start`.
4. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT` (e.g., `10000` or default Render port).
5. Deploy; Render will expose a public URL (e.g., `https://eco-backend.onrender.com`).

### Frontend on Vercel
1. Create a new **Project** at https://vercel.com/import.
2. Point to the `frontend` directory of the repo.
3. Set build command `npm run build` and output directory `dist`.
4. Add environment variable `VITE_API_URL` with the Render backend URL (without trailing `/api`).
5. Deploy; Vercel provides the production URL for learners.

## Environment variables recap

- `backend/.env` – `MONGO_URI`, `JWT_SECRET`, `PORT`
- `frontend/.env` – `VITE_API_URL` pointing to the rendered backend (e.g., `https://eco-backend.onrender.com`)

## Post-deploy checklist

1. Register and log in to ensure JWT flows work.
2. Seed an admin user manually (e.g., create a user via signup and update `role` to `admin` via MongoDB Atlas).
3. Take a quiz to verify results/reward/leaderboard pipelines.
4. Confirm dashboard charts and progress bars render correctly on Vercel.

Enjoy protecting the planet while learning!
