# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

No test suite is configured.

## Architecture

This is a single-page marketing landing page for NexoShop, a Costa Rica-focused e-commerce SaaS platform. The entire UI lives in two files:

- `src/Nexoshoplanding.jsx` — monolithic landing page component
- `src/Nexoshoplanding.css` — all styles

**Entry point:** `index.html` → `src/main.jsx` → `<Nexoshoplanding />`

### Component structure (all in Nexoshoplanding.jsx)

Static data arrays at the top of the file (`PLANS`, `FEATURES`, `TESTIMONIALS`, `FAQS`, `HERO_STATS`) drive the rendered content. Small sub-components (`AnimatedSection`, `Logo`, `CheckIcon`, `StarIcon`, `FaqItem`) are defined inline.

`useInView()` is a custom hook wrapping IntersectionObserver, used by `AnimatedSection` to trigger scroll-based fade-in animations.

Navigation is anchor-based (`#features`, `#precios`, `#testimonios`, `#faq`, `#waitlist`) — no React Router.

The waitlist form is local state only; no backend integration exists yet.

### Styling conventions

CSS custom properties define the design system in `Nexoshoplanding.css`:
- Colors: `--green`, `--green-dark`, `--bg-primary`, `--text-*`, `--border-*`
- Fonts: `--font-body` (Inter), `--font-display` (Space Grotesk)
- Dark theme only (no light mode)
- Glassmorphism navbar with `backdrop-filter: blur()`

### Tech notes

- React Compiler is enabled via Babel preset — avoid manual `useMemo`/`useCallback` unless profiling shows a real need
- ESLint uses flat config format (v9) — config is in `eslint.config.js`, not `.eslintrc`
- Content is in Spanish; currency is Costa Rican Colón (₡); SINPE Movil is the target payment method
