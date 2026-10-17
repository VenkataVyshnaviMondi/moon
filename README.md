# Moon Crafters

A responsive static website with Home, About, Services, Our Clients, Careers and Contact pages. Interactions are authored in strict TypeScript (`src/app.ts`) and compiled to browser-ready `app.js`. The compiled site needs no runtime dependencies.

## Preview

From this directory run `python -m http.server 5173`, then open http://localhost:5173. You can also open `index.html` directly, although a local server is recommended.

## Hero video

The supplied `video.mp4` is used from this directory, beside `index.html`. The hero automatically switches from its light-blue fallback artwork to the video once it loads. The video is muted, loops and plays inline. Reduced-motion preferences pause video and automatic CEO slide changes.

## Enquiries

All contact fields are required. Phone accepts exactly 10 digits. Send enquiry opens a Gmail compose tab with the receiver, subject and form details prefilled. The visitor must sign in if needed, review and click Send in Gmail. A mailto fallback is also provided. The website does not send or store enquiries itself.

The recipient is `mooncrafters@gamil.com`, exactly as supplied. Confirm that the `gamil.com` spelling is intentional before launch; change it throughout `app.js` and `index.html` if needed.

## Careers

Careers accepts general applications by email. No unconfirmed vacancies or experience requirements are advertised.

## Hosting

Upload `index.html`, `style.css`, `app.js`, both CEO portraits, the three logo images, the `services` directory and `video.mp4` (when available) to any static host. Hash navigation works without server rewrite configuration. The site uses Google Fonts and an embedded Google Map, which require internet access.

## TypeScript development

Install dependencies with npm install. Run npm run build after editing src/app.ts, or npm run dev to watch for changes. npm run typecheck validates types without emitting JavaScript. Keep the static HTTP server running separately for preview.

The client animation is authored in src/client-molten.ts and compiles to client-molten.js. Include client-molten.js before app.js when hosting. It needs no React runtime; the supplied shader animation was adapted to the existing TypeScript project.


Testimonials: the home carousel uses clearly labeled illustrative feedback for Zoho Projects, startup IT solutions and digital marketing. Replace clientFeedback in src/app.ts with approved real client feedback when available, then remove the sample disclosure and sample labels. No real clients, identities or performance results are attributed to these samples.


About hero animation: src/about-particles.ts compiles to about-particles.js, which must load before app.js. The effect uses Canvas 2D and local logo1.png; no React runtime or additional dependency is needed.

