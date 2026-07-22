# Kontap

Marketing site for **Kontap** — an NFC technology company turning physical
interactions into digital experiences with a single tap.

Built to read as a premium technology brand (Apple / Stripe / Linear / Vercel),
not a single-product store. Dark, minimal, high-contrast, generous whitespace,
one ambient light source.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — brand palette locked as design tokens (`app/globals.css`)
- **Motion** (`motion/react`) — scroll reveals and micro-interactions, reduced-motion aware
- **Geist** — typeface
- Zero UI dependencies otherwise: logo, icons and every product visual are hand-built SVG/CSS

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Architecture

```
app/
  layout.tsx        Fonts, metadata, <html> shell
  page.tsx          Section composition
  globals.css       Design tokens (@theme), base styles, keyframes
  icon.svg          Favicon (aperture mark)
components/
  Logo.tsx          Brand wordmark + aperture LogoMark (currentColor)
  Nav.tsx           Sticky glass nav + mobile menu
  Footer.tsx
  HeroVisual.tsx    NFC card with tap ripple
  ProductVisual.tsx Per-product CSS illustrations
  ui/               Container, Section, Button, Card, Eyebrow,
                    SectionHeader, Icon, Reveal, GlowBackdrop
  sections/         Hero, UseCases, WhyKontap, HowItWorks,
                    Products, KontapOS, CTA, FAQ
lib/
  content.ts        Single source of truth for copy & structured content
  cn.ts             Classname helper
```

## Design tokens

Brand colors live once, in the `@theme` block of `app/globals.css`, and are
consumed as Tailwind utilities (`bg-primary`, `text-muted`, `bg-surface`, …).

| Token | Value |
| --- | --- |
| Primary | `#0A36F6` |
| Hover | `#1D4DFF` |
| Background | `#00051B` |
| Surface | `#050D35` |
| Surface+ | `#0A1648` |
| White | `#FFFFFF` |
| Secondary | `#C7D2FE` |
| Muted | `#7C8BCB` |
| Accent | `#76DFFF` |

To adjust copy or products, edit `lib/content.ts` — sections render from it.
