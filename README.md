# Flixo

A Netflix-inspired movie discovery app that lets you browse trending films and get AI-powered recommendations — all in one place.

---

## What is Flixo?

Flixo combines a familiar streaming-style interface with the power of Google Gemini AI. You can browse movies from live TMDB catalogs (Now Playing, Popular, Top Rated, Upcoming, Indian) complete with background trailers — or switch to the AI search mode and describe what you're in the mood for in plain English. Gemini interprets your query, picks relevant titles, and Flixo fetches their full details and posters from TMDB instantly.

---

## Features

- **Authentication** — Sign up / Sign in with email & password via Firebase Auth
- **Browse Page** — Featured movie hero section with auto-playing YouTube trailer in the background
- **Movie Catalogs** — Horizontally scrollable rows: Now Playing, Popular, Top Rated, Upcoming, Indian
- **AI Search** — Type anything ("feel-good 90s comedies") and Gemini returns matching movie suggestions with posters and details
- **Animated UI** — Smooth entrance transitions powered by Framer Motion

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router 7 |
| State | Redux Toolkit + React-Redux |
| Styling | Tailwind CSS 4, Framer Motion |
| Auth | Firebase Authentication |
| Movie Data | TMDB API (proxied via Vercel serverless) |
| AI | Google Gemini (`@google/generative-ai`) |
| Build | Vite 7 |
| Deployment | Firebase Hosting + Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [TMDB API](https://www.themoviedb.org/settings/api) token
- A [Google Gemini API](https://aistudio.google.com/app/apikey) key
- A Firebase project (for Auth)

### Setup

```bash
# 1. Clone and install
git clone <repo-url>
cd flixo
npm install

# 2. Configure environment variables
# Create a .env file in the project root:
VITE_TMDB_KEY=your_tmdb_bearer_token
VITE_GEMINI_KEY=your_gemini_api_key

# 3. Start the dev server
npm run dev
# App runs at http://localhost:5173
```

### Other Commands

```bash
npm run build     # Production build → /dist
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

---

## How It Works

```
User visits /          →  Login page (Firebase Auth)
User signs in          →  Redirected to /browse

On /browse:
  ┌─ Default mode ─────────────────────────────────────────┐
  │  Header + Featured Hero (trailer plays in background)  │
  │  Scrollable movie rows fetched from TMDB               │
  └────────────────────────────────────────────────────────┘
        ↕  toggle via "AI Search" button in Header
  ┌─ AI Search mode ───────────────────────────────────────┐
  │  User types a natural-language query                   │
  │  Gemini returns a list of movie titles                 │
  │  Each title is looked up on TMDB for poster + details  │
  └────────────────────────────────────────────────────────┘
```

TMDB API calls are routed through a Vercel serverless function (`/api/proxy`) so the API token is never exposed on the client.

---

## Deployment

Flixo is configured for two platforms simultaneously:

- **Vercel** — handles the serverless proxy function and SPA routing (`vercel.json`)
- **Firebase Hosting** — static hosting with SPA rewrite rules (`firebase.json`)

Both rewrite all routes to `index.html` so React Router handles client-side navigation.
