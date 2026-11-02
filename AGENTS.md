# AGENTS.md

Repository reference for AI agents working on Rayhan's Portfolio Frontend (`portfolio-fe`).

## Quick Reference Commands

- **Dev Server**: `npm run dev` (starts Vite at `http://localhost:5173`)
- **Production Build**: `npm run build` (outputs to `dist/`, target `es2019`, manual chunks configured in `vite.config.js`)
- **Preview Build**: `npm run preview`
- **Linting**:
  - `npm run lint` (`eslint .`): currently flags `process` in `vite.config.js` because browser globals apply to root configs.
  - Recommended for code changes: `npx eslint src` or `npx eslint src api` (exits 0).
- **Testing**: No test runner is installed. Primary validation is `npx eslint src` followed by `npm run build`.

## Architecture & Data Flow

- **Single Page Application (React 19 + Vite 6)**:
  - Entry point: `src/main.jsx` -> `src/App.jsx`.
  - Routes (`react-router-dom` v7): `/` (`MainPage`), `/portfolio` (`Overview`), `/coding-activity` (`CodingActivity`), `/projects/:slug`, `/certifications/:slug`, `/awards/:slug` (all render `DetailPage`), `*` (`NotFound`).
- **Static Content & Slugs (`src/data/`)**:
  - `projectData.js`, `certificationData.js`, and `awardData.js` are aggregated into `allData.js`.
  - **Slug uniqueness**: Slugs must remain unique across all three collections because `DetailPage.jsx` flattens all collections together to resolve `:slug`.
- **Hydration Quirk (`index.html` + `main.jsx`)**:
  - `index.html` embeds a hidden fallback `<div id="seo-content">` inside `<div id="root">` for web crawlers.
  - `src/main.jsx` checks `rootElement.hasChildNodes()` and invokes `hydrateRoot()` instead of `createRoot()`. Do not delete or alter `#seo-content` without adjusting hydration handling.

## API & Backend Proxying

- **Vercel Serverless Function (`api/wakapi.js`)**:
  - Handles `/api/wakapi` in production (supports `stats_all_time` and `all_time_since_today`).
  - Expects `WAKAPI_API_KEY` (or `VITE_WAKAPI_API_KEY`) environment variable.
- **Vite Dev Proxy (`vite.config.js`)**:
  - In development (`npm run dev`), `/api/wakapi` is proxied directly to `https://wakapi.dev` with `WAKAPI_API_KEY` from `.env`.
- **Coding Activity Page (`src/pages/CodingActivity.jsx`)**:
  - Switches fetch target dynamically: `/api/wakapi/api/compat/...` in dev vs `/api/wakapi?endpoint=stats_all_time` in prod.
  - GitHub username defaults to `rayhanzz772` or can be overridden via `VITE_GITHUB_USERNAME`.

## Routing & Deployment

- **Vercel**: Configured in `vercel.json` with an SPA rewrite rule (`/.*` -> `/index.html`).
- **Production Domain**: Canonical domain and OpenGraph tags point to `https://rayhancreative.web.id`.
