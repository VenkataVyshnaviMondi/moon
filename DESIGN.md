---
name: Mooncrafters
description: Creative thinking and connected technology in a confident navy orbital world.
colors:
  navy: "#101725"
  panel: "#192231"
  paper: "#f5f5ef"
  lime: "#d5f77c"
  cyan: "#8ce0e6"
  coral: "#f0a5a6"
  muted: "#adb5c2"
  line: "#303947"
  text: "#f6f7f2"
  services-surface: "#131c2b"
  service-card: "#1b2534"
  technology-card: "#192532"
  form-paper: "#f8faef"
  footer: "#0d1420"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Sora, Arial, sans-serif"
    fontSize: "clamp(3.2rem, 5.25vw, 5.1rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Sora, Arial, sans-serif"
    fontSize: "clamp(2.1rem, 3.35vw, 3.15rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.04em"
  service-title:
    fontFamily: "Sora, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.5
  service-body:
    fontFamily: "Sora, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.8
  button:
    fontFamily: "Sora, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
  field-label:
    fontFamily: "Sora, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  field: "5px"
  button: "7px"
  orbit-label: "9px"
  client-panel: "10px"
  form: "12px"
  service-group: "13px"
  circle: "50%"
spacing:
  gutter-desktop: "56px"
  gutter-tablet: "36px"
  gutter-mobile: "20px"
  section-desktop: "112px"
  section-tablet: "90px"
  section-mobile: "68px"
  grid-gap: "24px"
  heading-gap: "48px"
components:
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.navy}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "16px 23px"
  button-primary-hover:
    backgroundColor: "#e2ffa0"
  button-contact:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.paper}"
    rounded: "{rounded.button}"
    padding: "16px 23px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.lime}"
    rounded: "{rounded.button}"
    padding: "16px 23px"
  service-group:
    backgroundColor: "{colors.service-card}"
    rounded: "{rounded.service-group}"
    padding: "28px 30px 12px"
  service-group-technology:
    backgroundColor: "{colors.technology-card}"
    rounded: "{rounded.service-group}"
    padding: "28px 30px 12px"
  field-input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.field}"
    padding: "12px"
  contact-form:
    backgroundColor: "{colors.form-paper}"
    textColor: "{colors.navy}"
    rounded: "{rounded.form}"
    padding: "34px"
  client-panel:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.client-panel}"
    padding: "25px 28px"
---

# Design System: Mooncrafters

## Overview

**Creative North Star: "Good Ideas, Connected"**

Mooncrafters brings creative thinking and practical technology into one confident, approachable world. Deep navy gives bright lime, cyan and coral room to speak; oversized Sora headings, clear service groups and generous spacing carry the message.

Static geometric diagrams supply the expressive character. Fine orbital lines, a restrained sphere gradient and small tilted labels create depth while the reading path stays direct. Content is visible immediately; interaction uses short CSS state transitions and respects reduced motion.

**Key Characteristics:**

- Deep navy foundation with lime actions and cyan/coral accents.
- One locally hosted Sora variable font for display, body and controls.
- Generous responsive spacing, fine rules and modest corner radii.
- Static, authored SVG geometry with restrained gradient depth.
- Visible content, explicit labels and clear keyboard focus.

This document describes the implemented world in `src/styles.css` and `src/components/`. It supersedes the earlier white, video, carousel and particle directions. The home composition and visitor story live in `.impeccable/surfaces/home.md`; product facts live in `PRODUCT.md`. The YAML above is the normative primitive token layer.

## Colors

A deep blue-black foundation supports warm lime energy, cool cyan and soft coral without losing a clear reading hierarchy.

### Primary

- **Connected Lime** (`lime`): primary calls to action, the hero's final line, process numbers, selected text and the contact section. On lime surfaces, use navy ink.
- **Deep Navy** (`navy`): the main canvas and dark text on the light sections.

### Secondary

- **Clear Cyan** (`cyan`): technology icons, supporting orbital geometry and keyboard focus against dark backgrounds.
- **Warm Coral** (`coral`): marketing icons and supporting geometric accents.

### Neutral

- **Warm Paper** (`paper`): the light About surface.
- **Bright Text** (`text`) and **Muted Slate** (`muted`): primary and supporting text on dark surfaces.
- **Slate Panel**, **Services Surface**, **Service Card** and **Technology Card**: subtle tonal layers within the navy world.
- **Fine Slate Rule** (`line`): dark-section boundaries and quiet divisions.
- **Form Paper**, **White** and **Footer Navy**: the contact form, client-logo panel/fields, and the deeper footer respectively.

**The Action Accent Rule.** Lime marks primary actions and key emphasis. Cyan and coral distinguish supporting ideas; color never replaces the label.

## Typography

**Display and Body Font:** Sora, with Arial and sans-serif fallback. One local variable WOFF2 serves weights 100–800; the implemented headings use weight 500 and primary controls use 600. The strong impression comes from scale, tight display tracking and short lines rather than extreme weight.

### Hierarchy

- **Display:** the responsive hero heading uses the frontmatter display role. At the large desktop breakpoint it reaches 86px; mobile uses a viewport-based clamp with a 1.15 line height.
- **Headline:** section headings use the frontmatter headline role. Contact and work have deliberate size variations for their shorter copy.
- **Service title and body:** the service hierarchy is a medium title over smaller muted descriptive text. At narrow widths it adjusts without disappearing or requiring hover.
- **Button:** compact, semibold, sentence-case text sits beside a small arrow.
- **Field label:** every form control keeps its label visible. Optional information is lower emphasis, never a replacement for the label.
- **Reading text:** section introductions generally use 13–15px, generous 1.75–1.95 line height and constrained line lengths.

**The One Font Rule.** Use the local Sora family throughout. Build hierarchy with size, weight, tracking and space rather than additional display faces.

## Layout

The desktop container is capped at 1240px with 56px side gutters. From 1600px it can expand to 1320px with 80px gutters. At 1150px and below the gutters become 36px; at 640px and below they become 20px. The smallest viewport rule uses 16px gutters below 360px.

Sections use the three frontmatter spacing steps across desktop, tablet and mobile. A two-column desktop hero balances a slightly wider text column against the orbital diagram. Two equal service groups, paired About/contact columns and a split client area provide related patterns. Align section copy to common container edges; let whitespace separate the argument before adding containers.

The navigation becomes a toggle at 900px. The process changes from four columns to two at that breakpoint. At 640px the hero, services, About, client area and contact become a clear vertical flow. Contact fields also use one column on mobile. The footer changes from four columns to three at 900px and two at 640px, with the introduction and final contact group spanning as needed.

The sticky header has a solid navy background and a fine bottom rule. Section anchors include scroll offsets so headings remain clear of it. No scroll interception, sticky hero chapters or nested service scrollers are part of this system.

## Elevation & Depth

Tonal changes and fine borders establish most depth. The hero sphere uses a restrained radial gradient; orbital paths and static angled labels create the signature geometry. Diffuse shadows belong to the sphere, its labels and the contact form. Service groups and the client panel stay flat.

### Shadow Vocabulary

- **Sphere:** `0 22px 45px #070c1430`, grounding the central illustration.
- **Orbital label:** `0 12px 30px #070b1325`, separating small diagram labels.
- **Contact form:** `0 15px 40px #3043120a`, a very quiet lift on the lime field.

**The Quiet Depth Rule.** Keep ordinary content flat. Reserve diffuse shadows and gradients for the orbital illustration, its labels and the contact form.

Motion is limited to short state transitions (0.18s): arrow translation, navigation color and the mobile menu icon. Buttons move down one pixel when active. Smooth anchor scrolling is native CSS. Reduced-motion preference disables transitions, animation and smooth scrolling. There are no entrance animations or continuously moving decorative elements.

**The Visible Content Rule.** The initial page content stays visible. Do not introduce entrance gates, opacity-zero reveals or animation dependencies.

## Shapes

Use modest rounded corners: compact controls, labels and larger panels follow the named radius tokens. Hairline rules organize repeated rows. Circles belong to portraits, small status dots, social controls, principle icons and the orbital illustration.

The hero is authored inline SVG plus CSS geometry, not a raster hero or a canvas effect. A lime sphere sits inside thin solid and dashed orbital paths, with Create, Connect and Grow labels. Supporting service illustrations share the same simple stroke vocabulary. Keep decorative geometry outside the accessibility tree; text and actionable service names remain real HTML.

## Components

### Buttons and text links

Primary actions are lime with navy text; the contact form reverses that relationship to navy on paper. The common button has a 54px minimum height, an arrow, modest rounding and a short state transition. Hover lightens the lime button and shifts its arrow slightly. Text links use the same small diagonal arrow without a container. The draft-opening action uses an outlined variant appropriate to the light contact form.

All controls receive a visible focus outline. Dark surfaces use cyan; form fields use a green outline that remains visible against white. Disabled submission controls expose the pending state.

### Navigation

The desktop bar pairs the supplied brand mark and lowercase wordmark with plain section anchors and a consultation action. Mobile uses a labelled 44px menu toggle with `aria-expanded`. Escape closes the menu and returns focus to the toggle; outside pointer interaction and section selection close it. The footer repeats service groups and direct contact links.

### Service groups and rows

The marketing and IT panels share a rounded shell, thin border, simple line illustration and a quiet divider under the heading. Coral identifies marketing; cyan identifies IT. Each linked row contains an icon, a readable title/description pair and a diagonal arrow. Hover changes the title and arrow to lime and shifts the arrow. Selecting a service scrolls to contact and selects that service in the form.

### Inputs and contact form

The paper form sits within the lime section. White fields have visible labels, subtle green-gray borders and compact corner rounding. Labels, placeholders and validation remain distinct. The message field allows vertical resizing. Required fields are name, email and project description; phone is explicitly optional. Inline status messages communicate prepared draft, pending, success and error states without pretending a draft was sent.

### Process and proof

The process is an ordered list with fine top rules, lime numbers and short descriptions. Client logos sit on one white panel to preserve the supplied artwork. The team signoff uses two small, overlapping circular portraits, with names and roles in real text. Neither proof treatment relies on a carousel.

## Do's and Don'ts

### Do:

- **Do** use the navy foundation, lime primary actions and visible focus treatment.
- **Do** keep service names and descriptions readable, with consistent grouped rows.
- **Do** use static SVG geometry and modest gradients for expressive illustration.
- **Do** preserve the responsive single-column reading order and generous section spacing.
- **Do** keep content visible before JavaScript hydration and respect reduced motion.

### Don't:

- **Don't** add autoplay video, particles, WebGL or continuous animation to the loading path.
- **Don't** hide page content behind entrance animations.
- **Don't** replace the local Sora family with multiple remote font families.
- **Don't** use invented client results, testimonials or performance counters as visual proof.
- **Don't** give every content block a glow, gradient or oversized rounded shell.
