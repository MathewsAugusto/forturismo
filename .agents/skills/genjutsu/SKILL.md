---
name: genjutsu
description: Creative coding and anti-AI-slop aesthetic finishing system for web and mobile interfaces. Formulates an interaction thesis, distinct visual identity, high-end motion (Framer Motion, CSS, GSAP), tactile micro-interactions, and design audits to eradicate generic AI code appearance.
---

# Genjutsu - Anti-AI-Slop & Visual Refinement

Genjutsu is an aesthetic finishing and interaction design framework created to eliminate the generic, uninspired appearance of AI-generated code ("AI slop") and replace it with bespoke, studio-grade digital experiences.

## Core Philosophy: The Anti-Slop Directive
Generic AI interfaces suffer from predictable defaults:
- Centered cards with purple/blue gradients and 1px border `border-gray-200`
- Inter, Roboto, or generic system sans-serif everywhere
- Cliché metric callouts (e.g., "99.9% uptime", "10k+ users") with gradient text
- Abrupt, un-eased `:hover` transitions (`transition: all 0.2s`)
- Monotonous spacing and lack of tactile hierarchy or physical weight

Genjutsu treats interface design as craft:
1. **Interaction Thesis First**: Never start coding without establishing how the interface *feels*, reacts, and behaves.
2. **Signature Motion**: Cohesive, orchestrated entrance and state transitions respecting `prefers-reduced-motion`.
3. **Tactile Micro-interactions**: Buttons with physical resistance, interactive light/glow, magnetic cursors, fluid card hover states, and layered depth.
4. **Art Direction & Brand Tokens**: Dedicated color story, expressive typography pairings, and layout tension.

---

## 1. The Interaction Thesis
Before writing any UI code, establish the thesis:
- **Concept & Mood**: What sensation should the user feel? (e.g., "Quiet luxury hospitality with tactile paper texture and smooth buttery transitions").
- **Motion Vocabulary**: What is the kinetic personality? (e.g., spring-based dampening, slow dramatic unveilings, or crisp snap precision).
- **Physicality**: How do elements react to cursor / touch? (Glow highlights, 3D tilt, subtle depth elevation, scale easing).
- **Signature Moment**: The one memorable, handcrafted interaction on the screen.

---

## 2. Motion & Micro-Interaction Guidelines
- **Unified Timing**: Use curated cubic-bezier easings (e.g. `cubic-bezier(0.16, 1, 0.3, 1)` for snappy entrance, `cubic-bezier(0.25, 1, 0.5, 1)` for smooth settles).
- **Never `transition: all`**: Explicitly animate `transform`, `opacity`, `background-color`, `box-shadow`, or `border-color`.
- **Staggering**: Grouped elements (cards, lists, navigation items) must enter with subtle staggered delays (20ms–50ms intervals).
- **Layered Depth & Glassmorphism**: Use backdrop filters (`backdrop-blur-md`), specular highlights (subtle 1px inset borders with white/light opacity), and ambient drop shadows with dual layers.

---

## 3. Sub-Skills & Capabilities
- **`genjutsu-paint`**: Full design universe creation, art direction brainstorm, design tokens (`MASTER.md`), and complete page styling.
- **`genjutsu-cast`**: Surgical application of high-end motion and tactile micro-interactions to an existing component or page.
- **`_jutsu` modules**: References for `motion-principles`, `web-motion`, `tells`, `design-audit`, and `css-native`.
