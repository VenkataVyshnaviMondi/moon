# Verification scope - 18 October 2026

The original white, blue and cyan template has been restored as the active site. All previous accessibility and performance measurements for the navy React site are obsolete for this implementation. In particular, its recorded LCP, CLS, bundle size and 17-check result must not be attributed to this template.

## Checks performed

The original template smoke checks (`node .verify.cjs`, exposed through `npm run check`) passed during restoration. They exercise all six page templates, local referenced images, eight services, both CEOs, required contact fields and phone pattern, the contact map, and the existing Operations careers application controls.

Browser verification also passed on the restored site at localhost:5174: all six hash routes render, the About navigation and original branding are present, a service-specific contact link preselects Zoho Projects, the mobile menu opens and closes after following a route, the mobile About page fits its viewport, and no unhandled browser errors were observed. Desktop and mobile captures are in `.impeccable/review/original-template/`. These checks do not establish accessibility conformance or fresh Core Web Vitals.

## Current loading behavior

The active site uses the original HTML shell, CSS and scripts compiled from TypeScript. Page content is selected by JavaScript hash routing. It retains Google Fonts, supplied raster assets, video, particles, a WebGL client visualization, carousel/scroll interactions and a contact map iframe. The inactive React prerender pipeline and its optimized asset measurements do not describe the current site.

Full accessibility, keyboard coverage and throttled loading checks remain outside this template restoration. LCP at or below 2.5 seconds, INP at or below 200 milliseconds and CLS at or below 0.1 remain measurement goals, not guaranteed results. Production field data is required to assess real-user Core Web Vitals.

## Remaining integrations

The contact form and careers application prepare Gmail drafts. Visitors must review and send them; no live submission endpoint or message storage is connected. Direct enquiry submission requires a real backend integration. The inactive React `VITE_CONTACT_ENDPOINT` setting does not configure the restored template.

Actual email delivery, external social account availability and production field performance have not been verified. The deployment configuration uses the static `dist/` output.
