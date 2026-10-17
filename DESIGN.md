# Moon Crafters visual system

White editorial surfaces, spacious typography, cyan-blue accents from the supplied logo and dark blue-green text. Wide horizontal navigation follows the first reference; small screens use an accessible toggle. White and pale blue dominate, with one dark statement section on About.

Tokens: ink #102e38; muted #526970; blue #006f8d; cyan #29d3e5; pale #effbfe; line #d7e4e7. Display: Manrope, 400–800. Body: DM Sans. Display tracking floor -0.04em, maximum 96px. Section padding 110px/7% desktop, 70px/7% mobile. Responsive grid changes at 1100px and 760px.

Service cards use supplied imagery and shaped image corners inspired by the reference. CEO section pairs portrait with an editorial statement and explicit slide/pause controls. Process uses four numbered steps because sequence is meaningful. Career categories are accordions for general applications. All contact labels remain visible.

Navigation uses hash routes for portable static hosting. Keyboard focus, reduced motion, descriptive image alternatives, field validation and required inputs are included.

The navbar uses a translucent white surface with 22px backdrop blur and a subtle cyan border. Links animate a 2px underline from the centre on hover and keyboard focus; the current page retains the underline. This adapts the supplied React navigation component's behavior to the existing static implementation. Reduced motion disables the transition. Unsupported backdrop filters use a more opaque fallback.

Home logo motion: a decorative logo.png moves with scroll through the hero and clients, changes scale and perspective, and is capped at the CEO section top minus its own height and a 22px gap. It scrolls away with the page after reaching that boundary. Other routes remove its animation listeners. Reduced motion uses a static logo.


The home hero is now a four-chapter sticky logo presentation replacing the video hero. Original Moon Crafters identity and service list are used. Scroll interpolates logo position, scale and 3D tilt while chapters crossfade; chapter buttons support direct navigation. The sticky container ends before the client section and CEO showcase. Reduced-motion users see all chapters in a static accessible flow. Initial logo size is bounded by the title position to avoid overlap.


Our Clients uses the user-supplied MoltenRingCarousel GLSL field solver, adapted to a TypeScript namespace in src/client-molten.ts. Logo artwork is contained on white atlas cells. Drag, swipe, arrow keys and previous/next buttons turn the ring; Shift+wheel is optional, ordinary wheel keeps native page scroll. Offscreen and hidden tabs skip rendering. Static bordered logo panels remain available when reduced motion is requested or WebGL cannot initialize. GPU resources and listeners are cleaned up during navigation.


The second home hero chapter is Our Clients, replacing Design/Build and Connect/Grow. logo1.png remains in the hero, moving above the client carousel. The separate duplicated home client section is removed. Client cards advance every 3.5 seconds while visible; manual input delays advancing, focus pauses it, and an explicit Pause/Play control is provided. Mouse-wheel over the canvas rotates the ring without requiring Shift. The Clients route uses the same carousel.


The home hero Services chapter uses a WorksWheel animation adapted from the user-supplied component: eight supplied service images start in a ring and transition into a perspective drum using wheel, drag, arrow keys or index buttons. Wheel events pass through at either end. Reduced motion uses a static linked image grid. The service page and lower home service cards remain unchanged. src/service-wheel.ts compiles to service-wheel.js, loaded before app.js.


The testimonial section follows the user-supplied overlapping profile-card carousel composition, using supplied service artwork instead of invented client portraits. Desktop image and quote overlap; mobile stacks them. Arrow and dot controls update three sample feedback scenarios, with reduced-motion-aware transitions. Samples are explicitly labeled and must not be treated as real endorsements.


About page: light-blue portrait-led hero inspired by the user's supplied reference, with oversized italic Cormorant Garamond Moon Crafters lettering and both cutout CEO portraits. Followed by the supplied company facts and customer-first statement, then the shared client carousel. Existing home layout is preserved.


Home hero Services now uses a Maayasthra-inspired two-column image-and-index layout. Large Inter Medium service names highlight in blue and update an adjacent full-color preview on hover or keyboard focus. Touch previews before navigation. The list scrolls within the hero to expose all eight services. The brand logo remains smaller in the upper-right so it does not overlap the service list. Other service pages and cards are preserved.


About heading particle effect: src/about-particles.ts samples the rendered Moon/Crafters typography in black and logo1.png in its original colors, then assembles matching particles. Pointer proximity disperses them and spring steering restores the wordmark. Canvas is decorative; real heading text stays in the accessibility tree. Reduced motion and canvas/image failures keep the original static heading. Offscreen work pauses and route changes clean up observers, timers and listeners.

