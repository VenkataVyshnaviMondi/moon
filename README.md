# Moon Crafters

The original white, blue and cyan agency template is the active website. It keeps the supplied logo, italic Moon / atom / Crafters title, CEO portraits, service illustrations and six hash-routed pages. The About page matches the user's selected screenshot.

## Run locally

```sh
npm install
npm run dev
```

Open the URL printed by Vite. Home is `#/`; the screenshot's About page is `#/about`. Other routes are `#/services`, `#/clients`, `#/careers` and `#/contact`.

```sh
npm run typecheck
npm run build
npm run preview -- --port 4173
npm run check
```

The development command compiles the original TypeScript before starting Vite. The production build compiles the original scripts and copies the static site to `dist/`. `vercel.json` uses this output. The check command runs the original template smoke checks in `.verify.cjs`.

The restored preview in this session is running at `http://localhost:5174/#/about` because port 5173 was already serving another project. For browser checks, run `npm run check:browser` with `VERIFY_URL` set to the URL printed by Vite (the default is port 5173).

## Active source

- `index.html`: original header, footer, fonts and script entry points.
- `style.css`: original responsive template styles.
- `src/app.ts`: page templates, hash routing, mobile navigation and contact interactions; compiled to `app.js`.
- Other `src/*.ts` helpers: client visualization, About particles, service wheel and careers interactions.
- Root images, `services/` and `video.mp4`: original supplied visual assets.

The React files, including `src/App.tsx`, are inactive reference material. They are not routed, compiled or loaded by the restored site. The earlier React prerender and verification scripts do not describe this template.

## Content and enquiries

Services are Branding, Social Media Marketing, Web Designing, IT Solutions, Google Ads, Meta Ads, Zoho Projects and YouTube Marketing. Company contacts, Swiggy and Ayantech logos, and the portraits of Malla Krishnachaitanya and Chippada Tej Kumar remain in the original template. Startup scenarios are labelled as scenarios, not customer testimonials.

The contact form opens a Gmail draft addressed to `mooncrafters@gmail.com`. The visitor must review and send it; the website does not submit or store an enquiry. Careers applications also prepare an unsent Gmail draft. Email and telephone links provide direct contact options. No live submission endpoint is connected, and the inactive React `VITE_CONTACT_ENDPOINT` configuration does not apply to this template.

The original template includes Google Fonts, a map iframe, video, particles and a WebGL client visualization. Previous navy-template performance measurements are obsolete. See [PERFORMANCE.md](PERFORMANCE.md) for current verification scope and remaining checks.
