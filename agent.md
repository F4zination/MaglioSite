# Agent Guide: MaglioSite

## Project Snapshot
- Portfolio website for Elisa Maglio.
- Built with SvelteKit + TypeScript + Tailwind CSS.
- Single-page composition in `src/routes/+page.svelte` from reusable section components.
- Includes local HLS video assets under `videos/hls/` and a conversion script for raw MP4s.

## Tech Stack
- Framework: SvelteKit 2 (`@sveltejs/kit`) with Svelte 5 runes (`$props`, `$state`).
- Language: TypeScript (strict mode enabled via `tsconfig.json`).
- Styling: Tailwind CSS via PostCSS (`@tailwindcss/postcss`, `autoprefixer`).
- Adapter/runtime: `@sveltejs/adapter-node` for Node deployment.
- Tooling: Vite, svelte-check.
- Video tooling: `ffmpeg-static` + `scripts/convert-videos.js`.

## Repo Layout
- `src/routes/+layout.svelte`: loads global CSS and favicon.
- `src/routes/+page.svelte`: assembles page sections in order.
- `src/lib/components/`: content sections and shared UI pieces.
- `src/app.css`: Tailwind directives only.
- `static/`: images and documents referenced by components.
- `videos/raw/`: source MP4 files (gitignored except `.gitkeep`).
- `videos/hls/`: generated HLS playlists/segments (committed).
- `scripts/convert-videos.js`: MP4 -> HLS conversion pipeline.
- `Dockerfile`, `docker-compose.yml`: containerized production deployment.

## Main UX Structure
`+page.svelte` renders:
1. `Header`
2. `WerBinIch`
3. `Studienprojekte`
4. `EigeneProjekte`
5. `BeruflicheErfahrungen`
6. `Ausbildung`
7. `Footer`

Most section data is embedded directly as typed arrays inside each component (`Project`, `Experience`, `Education`) rather than loaded from external JSON/CMS.

## Styling + Design Conventions
- Utility-first classes in components; no global custom CSS except Tailwind imports.
- Dark layout with bordered grid/card language.
- Custom Tailwind color token: `electric-blue` in `tailwind.config.js` (hex `#9D4EDD`).
- Content language is mostly German; keep tone and casing consistent with existing copy.

## Video Workflow
1. Add MP4 files to `videos/raw/`.
2. Run `npm run convert:videos`.
3. Script generates `videos/hls/<video-slug>/playlist.m3u8` and `segment_*.ts`.
4. Components reference HLS via `/videos/hls/<slug>/playlist.m3u8`.

Notes:
- `VideoPlayer.svelte` currently supports native HLS only (Safari path); non-native browsers show an error message unless `hls.js` integration is added.
- `Studienprojekte.svelte` uses a plain `<video src="...m3u8">` modal source, which may not play in all non-Safari browsers.

## Commands
- `npm install`: install dependencies.
- `npm run dev`: start local dev server.
- `npm run check`: run Svelte/TypeScript checks.
- `npm run build`: production build.
- `npm run preview`: preview built output.
- `npm run convert:videos`: convert raw MP4 to HLS assets.

## Deployment
- Docker multi-stage build (`node:20-alpine`).
- Final runtime starts with `node build` on port `3000`.
- Compose service maps `3000:3000` and mounts `static/` plus `videos/hls/` read-only.
- Environment baseline is in `.env.example` (`PORT`, `NODE_ENV`).

## Change Playbook
- New section:
  - Add component in `src/lib/components/`.
  - Import/render in `src/routes/+page.svelte`.
- New portfolio item:
  - Add object to the relevant component array.
  - Add thumbnail/document in `static/`.
  - If video-based, ensure matching HLS slug exists in `videos/hls/`.
- Visual tweaks:
  - Prefer Tailwind utility updates in-place over introducing global CSS.
- Before finishing:
  - Run `npm run check` and `npm run build`.

## Current Risks / Gaps
- Cross-browser HLS playback is incomplete without `hls.js`.
- Content is hardcoded in components, so updates require code changes.
