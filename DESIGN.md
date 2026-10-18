---
name: Moon Crafters
description: Original white, blue and cyan agency template selected by the user.
colors:
  ink: "#102e38"
  muted: "#526970"
  blue: "#006f8d"
  cyan: "#29d3e5"
  pale: "#effbfe"
  line: "#d7e4e7"
  white: "#ffffff"
  project-button: "#1165c5"
typography:
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    lineHeight: 1.6
  display:
    fontFamily: "Manrope, sans-serif"
  brand-title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontStyle: italic
    color: "#000000"
  service-discovery:
    fontFamily: "Inter, sans-serif"
spacing:
  default-section: "110px 7%"
  header-desktop: "104px"
  header-mobile: "80px"
---

# Moon Crafters Design

The active design is the original template shown in the user's screenshot. Keep its white background, original cyan and teal logo, blue project button, fine borders, broad editorial spacing and supplied service and portrait imagery.

The About route (`#/about`) opens with the large Moon / atom / Crafters title over a subtle cyan gradient, followed by Malla Krishnachaitanya's CEO introduction and portrait. Header navigation is About, Services, Our clients, Careers and Contact, with Start a project as the primary action.

`style.css` is the source of truth for the existing layout and responsive rules. Body and display text use Google-hosted DM Sans and Manrope; the brand title uses italic Cormorant Garamond. Inter appears in the service discovery presentation. Preserve the original template rather than applying the superseded navy React design.

The template retains its original particles, client visualization, video, carousel and scroll interactions, including existing reduced-motion rules. These effects and remote font loading require fresh browser and performance checks; earlier navy-template review results do not apply.
