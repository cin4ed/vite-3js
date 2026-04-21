# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install       # install dependencies
bun run dev       # start dev server with HMR
bun run build     # type-check (tsc) then bundle (vite)
bun run preview   # preview the production build
```

There are no tests or linting scripts configured.

## Architecture

Single-file Three.js app — all scene logic lives in `src/main.ts`.

- `index.html` mounts a `<div id="app">` where `main.ts` appends the canvas.
- `src/main.ts` creates the Three.js scene, renderer, camera, lights, and `OrbitControls`, then runs a `setAnimationLoop`.
- Sizing is handled by both a `resize` window listener and a `ResizeObserver` on `#app` to stay in sync with the DOM.
- `src/style.css` makes `html/body/canvas` fill the full viewport with no margin.

Three.js imports use the `three/examples/jsm/` path for extras (e.g. `OrbitControls`). TypeScript is in bundler mode (`"moduleResolution": "bundler"`) with `noEmit: true` — Vite handles the actual bundling.
