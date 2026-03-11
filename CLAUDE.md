# CLAUDE.md — AI Assistant Guide for trends-tool

This document describes the codebase architecture, conventions, and workflows for AI assistants working in this repository.

## Project Overview

**trends-tool** is a React + Vite single-page application for discovering and visualizing emerging trends in real-time. It combines live data from Google Trends RSS (via a Vercel serverless function) with curated mock trend data, offering multi-level filtering, bilingual support, and rich charting.

**Deployment target:** Vercel (Zero Config for Vite + serverless `/api` functions)

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19.2.0 |
| Build Tool | Vite 7.3.1 |
| Charts | Recharts 3.8.0 (modal detail), custom SVG sparklines (cards) |
| Icons | Lucide React 0.577.0 |
| Styling | Vanilla CSS with CSS custom properties (no preprocessor) |
| Linting | ESLint 9.39.1 (flat config) |
| Backend | Vercel serverless functions (`/api/*.js`) |
| i18n | Custom React Context (English + French) |

---

## Directory Structure

```
/
├── api/
│   └── discover.js          # Vercel serverless: fetches Google Trends RSS
├── src/
│   ├── components/
│   │   ├── GoogleTrends.jsx  # Embeds live Google Trends widget
│   │   ├── TrendCard.jsx     # Card with inline SVG sparkline
│   │   ├── TrendCard.css
│   │   ├── TrendList.jsx     # Responsive grid wrapper
│   │   ├── TrendList.css
│   │   ├── TrendModal.jsx    # Detail modal: Recharts chart + live widget
│   │   └── TrendModal.css
│   ├── data/
│   │   └── mockTrends.js     # 24 static trend objects
│   ├── App.jsx               # Root component: state, filtering, API fetch
│   ├── i18n.jsx              # LanguageContext + translations (EN/FR)
│   ├── index.css             # Global styles and design tokens
│   └── main.jsx              # React entry point (wraps App in LanguageProvider)
├── index.html
├── vite.config.js
├── eslint.config.js          # Flat config (not .eslintrc)
└── package.json
```

---

## Development Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Production build → dist/
npm run preview   # Serve production build locally
npm run lint      # ESLint validation
```

No test runner is configured. There are no `.test.js` or `.spec.js` files.

---

## Data Flow

```
main.jsx
  └── <LanguageProvider>       # i18n context
        └── <App>
              ├── useEffect → fetch('/api/discover')  # Live RSS trends
              ├── combinedTrends = [...liveTrends, ...mockTrends]
              ├── useMemo → filteredTrends            # Filtered by status/category/search
              └── <TrendList> → <TrendCard> (× N)
                    └── onClick → <TrendModal>
                          ├── Recharts AreaChart (history[])
                          └── <GoogleTrends> (live embed widget)
```

**API endpoint (`/api/discover`):**
- Fetches `https://trends.google.com/trending/rss?geo=US`
- Parses RSS with **regex** (no XML parser — avoids Vercel bundle size issues)
- Simulates 12-month history with exponential growth curves
- Returns up to 10 items; falls back to `[]` on rate-limit errors
- CORS headers: `Access-Control-Allow-Origin: *`

---

## Core Data Schema

Every trend object (mock or live) follows this shape:

```javascript
{
  id: string,           // e.g. "live-rss-0", "trend-deepseek"
  keyword: string,
  category: string,     // "Technology", "Health", "Finance", "Fashion", etc.
  growth: number,       // Percentage integer (425, -25, 0)
  volume: string,       // Human-readable "2.4M", "420K"
  status: 'exploding' | 'growing' | 'stable' | 'declining',
  description: string,  // 1–2 sentence explanation
  history: number[]     // 12 data points (months) for charts
}
```

---

## Filtering Logic (`App.jsx`)

Three independent filters combined with AND logic via `useMemo`:

1. **Status filter** — matches `trend.status`, with one special case:
   - `"new-emerging"` detects trends that started below 1 000 and crossed 10 000 in their `history[]` array (not stored in the object; computed at runtime).
2. **Category filter** — exact match on `trend.category`; the dropdown is built dynamically from `combinedTrends`.
3. **Search filter** — case-insensitive substring match on `keyword + description`.

---

## Internationalization

- **File:** `src/i18n.jsx`
- **Languages:** English (`en`) and French (`fr`)
- **Default:** French (`fr`)
- **API:** React Context (`LanguageContext`)
  - `t(key)` — general UI strings
  - `tCat(key)` — category names
- **Toggle:** Globe icon button in the header; switching is instant (no reload)
- **Convention:** All user-visible strings must be added to both `en` and `fr` translation objects in `i18n.jsx` before use.

---

## Styling Conventions

**Design tokens** in `src/index.css`:

```css
:root {
  --bg-dark: #0f1115;
  --bg-card: rgba(25, 28, 36, 0.6);
  --text-main: #f8f9fa;
  --text-muted: #94a3b8;
  --accent-primary: #6366f1;   /* Indigo */
  --accent-secondary: #ec4899; /* Pink */
  --trend-up: #10b981;         /* Emerald — positive growth */
  --trend-down: #ef4444;       /* Red — negative growth */
  --trend-neutral: #64748b;    /* Slate — stable */
  --radius-lg: 16px;
  --radius-md: 12px;
  --shadow-glow: 0 0 20px rgba(99, 102, 241, 0.15);
}
```

**Rules:**
- Dark theme only — no light mode.
- Glassmorphism via `backdrop-filter: blur(12px)` on `.glass-panel`.
- Each component has a co-located `.css` file (e.g., `TrendCard.jsx` → `TrendCard.css`).
- Global/layout styles go in `src/index.css`.
- No CSS modules or SCSS — plain CSS only.
- Responsive grid breakpoints: 1 col (mobile) → 2 col (768px) → 3 col (1024px) → 4 col (1440px).
- Always use design token variables; avoid hardcoded colour values.

---

## Component Conventions

- **File naming:** PascalCase for components (`TrendCard.jsx`), camelCase for utilities/data (`mockTrends.js`, `i18n.jsx`).
- **CSS co-location:** Every component with styles has a same-name `.css` file in the same directory.
- **State management:** `useState` and `useContext` only — no Redux or Zustand.
- **Performance:** Use `useMemo` for derived/expensive computations (filtering, building category lists).
- **No error boundaries** are currently implemented.

---

## ESLint Configuration

`eslint.config.js` uses the **flat config** format (not `.eslintrc`).

Key rules:
- ESLint recommended + React Hooks plugin + React Refresh plugin.
- `no-unused-vars` ignores capitalized names (allows unused constants).
- JSX is supported via `ecmaFeatures: { jsx: true }`.
- `dist/` is excluded from linting.

---

## Vercel Deployment Notes

- Vite Zero Config is used — **do not add a `vercel.json`** unless strictly necessary (a previous fix removed it to restore proper routing).
- Serverless functions live in `api/` and must use CommonJS (`require`) or native ES modules compatible with the Vercel runtime.
- Avoid adding heavy parsing libraries (e.g., `xml2js`) to `api/` functions — use regex-based parsing to keep bundle size small.
- The `google-trends-api` npm package is listed as a dependency but is **not currently used** in the serverless function (RSS feed is fetched directly).

---

## Known Limitations & Missing Features

- No test framework (Vitest / Jest / React Testing Library).
- No error boundaries in the React tree.
- `google-trends-api` dependency is unused (can be removed if not needed).
- No code splitting or lazy-loaded routes.
- `GoogleTrends.jsx` loads an external script (`ssl.gstatic.com`) that can fail silently in some environments.
- The API falls back to an empty array on rate limiting — the UI shows only mock data in that case (no user-visible error message).

---

## Git Conventions

Commit message format observed in the repository:

```
type(scope): short description
```

Examples from history:
- `feat(v4): Bulletproof Live Trends parsing via Google RSS feed`
- `fix(api): Graceful fallback when Google rate limits Vercel IPs`
- `fix(v4): Remove conflicting vercel.json to restore Vite Zero Config routing`

Use `feat`, `fix`, or `chore` as the type. Keep the scope to the affected layer (e.g., `api`, `v4`, `i18n`, `ui`).
