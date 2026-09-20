# Mobile Optimization and PWA Upgrade Prompt

Please upgrade this existing Next.js 16.3.1 App Router app for mobile usability and production-quality PWA support.

## Before editing

1. Read `AGENTS.md` and `CLAUDE.md`.
2. Read the relevant Next.js documentation from `node_modules/next/dist/docs/`, especially:
   - `progressive-web-apps.md`
   - `offline-support.md`
   - `manifest.md`
   - `generate-viewport.md`
3. Inspect the current implementation before making changes.

## Project context

- Main page: `src/app/page.tsx`
- Components: `src/components/`
- Data: Firebase Firestore real-time subscriptions
- Image uploads: Cloudinary
- Styling: Tailwind CSS v4
- App name: Top Companies
- Countries: Indonesia and USA
- Existing CRUD behavior must continue working.

## Mobile optimization requirements

- Test at 320x568, 360x800, 390x844, and 412x915.
- Ensure there is no horizontal scrolling.
- Improve mobile padding, typography, spacing, and responsive header layout.
- Make the country tabs fit comfortably on narrow screens.
- Ensure the floating Add Company button does not cover content and respects safe-area insets.
- Make the company cards readable with long company names, leader names, and roles.
- Preserve the existing visual style; do not redesign the whole app.
- Make all tap targets at least approximately 44px high.
- Improve focus-visible states, keyboard accessibility, contrast, and semantic labels.
- Make the edit/add modal mobile-friendly:
  - use a full-height or bottom-sheet layout on small screens;
  - constrain it with `100dvh`;
  - allow internal scrolling;
  - prevent background scrolling while open;
  - support Escape to close;
  - provide an accessible close button;
  - keep action buttons usable when the keyboard is open.
- Stack form fields appropriately on narrow screens.
- Make photo uploading and photo repositioning work well with touch input.
- Do not rely only on hover states.
- Avoid invalid nested interactive elements in the company cards.

## PWA requirements

- Add a Next.js App Router manifest using `src/app/manifest.ts`.
- Configure:
  - `name`: Top Companies
  - `short_name`: Top Companies
  - `start_url`: `/`
  - `scope`: `/`
  - `display`: `standalone`
  - appropriate `theme_color` and `background_color`
- Add valid 192x192, 512x512, and maskable app icons in `public/`.
- Add appropriate metadata and viewport configuration in `src/app/layout.tsx`.
- Use safe-area CSS variables for iOS-style devices.
- Add a lightweight service worker only if it is compatible with the current Next.js setup.
- Register the service worker only in production or otherwise avoid stale development caching.
- Cache only same-origin app-shell/static assets.
- Do not cache Firebase requests, Firestore mutations, Cloudinary uploads, or any POST/PATCH/DELETE requests.
- Use versioned caches and remove old cache versions during activation.
- Provide a clear offline status message.
- Do not claim that Firestore CRUD works offline unless Firebase persistent local caching is explicitly implemented and tested.
- If offline CRUD is not implemented, disable or clearly explain unavailable mutations while offline.
- Do not add push notifications, authentication, or unrelated features.

## Data-safety requirements

- Preserve all existing Firebase collection names and document fields.
- Preserve create, update, delete, country filtering, ranking, and real-time subscription behavior.
- Preserve Cloudinary upload behavior.
- Do not change environment variable names.
- Never expose or modify `.env.local`.
- Avoid adding a large dependency unless it is necessary and compatible with Next.js 16.3.1.
- Do not use deprecated `next-pwa` patterns without first verifying compatibility with the installed Next.js version.

## Verification

- Run `npm run lint` and fix relevant lint errors introduced or exposed by the changes.
- Run `npm run build`.
- Test mobile layouts at the viewport sizes above.
- Test add, edit, delete, country switching, image upload, image repositioning, modal scrolling, keyboard behavior, and offline/online transitions.
- Verify the manifest loads correctly.
- Verify the service worker registers in a production build.
- Verify the app can be installed in a Chromium-based browser.
- Report any verification limitation clearly instead of hiding it.

After making changes, follow the repository workflow in `CLAUDE.md`: commit and push to `main`, without ever committing `.env.local` or credentials.
