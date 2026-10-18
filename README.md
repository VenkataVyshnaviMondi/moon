# Mooncrafters

A responsive agency website built with React, TypeScript and Vite. The production build pre-renders the complete page into HTML, then hydrates it for mobile navigation and enquiry interactions. Content, navigation and calls to action are readable before JavaScript runs.

## Develop and build

```sh
npm install
npm run dev
```

Create and preview the production build:

```sh
npm run build
npm run preview -- --port 4173
```

`npm run build` runs TypeScript checks, builds with Vite, and runs `scripts/prerender.mjs`. The deployable output is `dist/`. `npm run typecheck` checks types separately. `vercel.json` configures the production build and output directory; no deployment has been made as part of this implementation.

## Content and components

Business content follows the inspected [Mooncrafters reference website](https://mooncrafters.vercel.app/). Services are Branding, Social Media Marketing, Google Ads, Meta Ads, YouTube Marketing, Web Designing, IT Solutions and Zoho Projects. Work proof is limited to the reference's Swiggy and Ayantech client logos. No testimonials, awards, project outcomes or performance results have been invented.

- [src/content.ts](src/content.ts): service descriptions and verified contact/social details.
- [src/App.tsx](src/App.tsx): page structure, About, Work, Contact and `ProjectCard`.
- [src/components](src/components): `Header`, `Hero`, `ServicesSection`/`ServiceCard`, `ProcessSteps`, `ContactForm`, `Footer` and shared SVG icons.
- [src/styles.css](src/styles.css): responsive layout, typography, focus states and motion preferences.
- [public](public): optimized supplied imagery, favicon and the local font.

Original source files and assets remain in the repository for reference. They are not part of the new production loading path.

## Enquiry delivery

By default, the form prepares a draft addressed to `mooncrafters@gmail.com`. It explicitly says that no enquiry has been sent, and presents an **Open email app to send** link. The visitor must review and send the email in their email app. Without JavaScript, the native form uses a `mailto:` POST fallback with the same review-and-send requirement. No submission is stored by this static site.

To enable direct submissions, copy `.env.example` to `.env.local`, configure a real endpoint, and rebuild:

```dotenv
VITE_CONTACT_ENDPOINT=/api/contact
```

The endpoint may be an HTTPS URL or a same-origin path beginning with a single `/`. This repository does not provide that backend. The form sends `POST` JSON with these fields:

```json
{
  "fullName": "Visitor name",
  "email": "visitor@example.com",
  "phone": "",
  "service": "Web Designing",
  "goals": "The visitor's project description.",
  "website": ""
}
```

The UI reports success only after an HTTP 2xx response; failures and timeouts show an honest error. Before returning 2xx, the endpoint must validate fields, apply rate limiting and spam protection, and persist or deliver the enquiry. Configure CORS for an external endpoint. Browser validation and the honeypot do not replace server validation.

`VITE_` variables are public build-time configuration, never secrets. Keep email-provider credentials and other secrets on the backend. Changes require rebuilding and redeploying the site. If no valid endpoint is configured, the email draft flow remains active.

## Verification and performance

Install Chromium once, build the site, and keep the production preview running on port 4173 in another terminal:

```sh
npx playwright install chromium
npm run build
npm run preview -- --port 4173
```

Then run:

```sh
npm run check
```

The browser checks exercise pre-rendered content, navigation, enquiry behavior, responsive layouts, automated accessibility rules and runtime errors, and collect a throttled mobile performance sample. Results and screenshots are written to `.impeccable/review/`; the machine-readable report is `.impeccable/review/checks.json`. Use `VERIFY_URL` to test another running URL. Consult the generated report and `PERFORMANCE.md` for measurements actually obtained; the presence of a check does not imply it passed.

The production site uses one locally hosted Sora font of about 33 KB, optimized WebP versions of supplied images with explicit dimensions, a raster-free SVG hero, and short CSS transitions with reduced-motion support. It loads no animation library, background video, particles, custom cursor or third-party tracking scripts. Below-fold images are lazy loaded. The full initial HTML contains the headline, services and enquiry form.

LCP ≤ 2.5 seconds, INP ≤ 200 milliseconds and CLS ≤ 0.1 are measurement goals, not guarantees. Local Chromium samples are not field Core Web Vitals; the synthetic interaction timing is not field INP. Real-user monitoring after deployment is needed to assess those goals. External social accounts, email-app delivery and a future submission backend require separate integration checks.
