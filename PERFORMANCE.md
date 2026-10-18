# Verification — 18 October 2026

The production site passed **17 browser checks** with no failures. Evidence is in [.impeccable/review/checks.json](.impeccable/review/checks.json). The independent visual finish review returned **ship at the reviewed scope** after inspecting desktop, tablet and mobile screenshots and the implementation.

## Checks performed

- TypeScript validation and production build, including full-page static pre-rendering.
- Browser visit with JavaScript disabled: headline, service content and primary calls to action remain present and readable.
- Layout overflow at 360, 390, 768 and 1440 CSS pixels; full-page screenshots at 390, 768 and 1440 pixels.
- Internal anchor destinations, image requests and explicit image dimensions.
- Mobile menu open/close, Escape key and returned keyboard focus, and close after following navigation.
- Service links selecting the corresponding enquiry service.
- Invalid form validation; valid form creates an explicitly unsent draft with the correct recipient and project details. No email was sent and no submission request occurred.
- Axe WCAG 2 A/AA and WCAG 2.1 A/AA scans on desktop and mobile with the menu open and closed: zero violations. Contrast checks that axe could not resolve involved the decorative orbit caption or content occluded by the open menu; text colors on the normal navy surface were checked separately.
- Browser console errors, unhandled page errors, failed requests and HTTP error responses: none observed.
- Reduced-motion mode exercised during functional and screenshot checks; the performance sample used normal motion preferences.
- Image provenance scan: five rasters, zero missing provenance records.

Automated accessibility checks cover a subset of accessibility requirements. Keyboard navigation and visible focus were also reviewed; no assistive-technology user study was performed.

## Measured mobile laboratory sample

One cold Chromium run at 390 × 844, device scale factor 2, 4× CPU slowdown, 150 ms latency, 1.6 Mbps download and 750 Kbps upload. Browser cache was disabled, using the local production preview.

| Measurement | Observed |
|---|---:|
| Largest Contentful Paint | 1.504 seconds, headline |
| Cumulative Layout Shift | 0 |
| Initial network transfer | 129,285 bytes over 5 requests |
| Longest observed synthetic menu event | 120 ms |
| Initial long tasks | 469 ms and 106 ms |

The synthetic event measurement is **not field INP**. These measurements are not production Core Web Vitals or guarantees. Real hosting latency, devices, geography and traffic may change the results. Production field measurement remains necessary to assess the goals of LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1.

## Loading decisions

The complete page is delivered as pre-rendered HTML. Its content never waits for an entrance effect, loading screen, video, or data request. React hydrates the mobile navigation and enquiry interactions. One local Sora variable font is preloaded with font-display swap. The hero uses small inline geometric SVGs and has no raster download; supplied brand images are WebP with fixed dimensions, with below-the-fold images lazy-loaded. Motion is limited to short CSS hover transitions and native smooth scrolling, both disabled for reduced motion. No animation library, analytics, map iframe, third-party font request or continuous animation runs.

The production JavaScript is approximately 76 KB gzipped. There are no heavy optional widgets to split into extra requests. The recorded hydration tasks above remain the principal observed initial main-thread work.

## Remaining integrations and scope

No live enquiry endpoint was available in the reference. The default form prepares an email draft and requires the visitor to send it. A direct submission backend can be connected with `VITE_CONTACT_ENDPOINT`; [README.md](README.md) documents its request contract and delivery requirements. Endpoint delivery, CORS and server-side validation cannot be verified until a real endpoint is configured.

Social links and contact details were preserved from the inspected reference. External social account availability and actual email delivery were not exercised. No deployment or field performance collection was performed. The Vercel build configuration points to `dist/`.
