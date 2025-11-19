# firebase-auth 🚀

A small React + TypeScript app demonstrating Firebase authentication, bootstrapped with Vite.

Quick overview:

- 🔐 Authentication powered by Firebase
- ⚡ Fast dev experience with Vite
- 🧩 TypeScript + React

Getting started

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

Project structure 🗂️

- `index.html` — Vite HTML entry
- `package.json` — scripts & dependencies
- `vite.config.ts` — Vite configuration
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — TypeScript configs
- `src/` — source files
  - `main.tsx` — app bootstrap / mount point
  - `App.tsx` — root React component
  - `firebase.ts` — Firebase initialization and exports
  - `protectedRoute.tsx` — route guard for protected pages
  - `components/` — reusable UI components
  - `pages/` — route pages (home, private, error pages)
  - `assets/` — static assets

Key files 🔑

- `src/firebase.ts`: initialize Firebase using `VITE_` env variables and export `auth` (and other services if needed).
- `src/protectedRoute.tsx`: checks auth state and redirects unauthenticated users.
- `src/pages/private.tsx`: example of a page that requires authentication.

NPM scripts 📦

- `npm run dev` — start Vite dev server
- `npm run build` — build production bundles (TypeScript + Vite)
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint