# 🏛️ ForTurismo — Master Design System & Interaction Thesis
*Generated via Genjutsu + Anthropic Frontend Design + UI/UX Pro Max*

---

## 1. Interaction & Visual Thesis

### Concept & Art Direction: "Quiet International Luxury & Private Concierge"
- **Industry & Domain:** High-end international private tourism connecting discerning global travelers with accredited local guides in Thailand, Dubai (UAE), and Brazil.
- **Atmospheric Palette:** Warm silk alabaster grounds, deep obsidian charcoal, burnished champagne gold, and subtle amber accents. Eliminates generic neon emerald gradients, raw slate grays, and template cards.
- **Physicality & Tactility:** Buttons exhibit subtle physical compression (`btn-tactile` active state `scale(0.975)`), specular light highlights on glassmorphic navigation (`glass-luxury`), and official government licenses displayed as embossed accreditation seals (`badge-accreditation`).
- **Typography Direction:** Editorial dual-stack featuring **Playfair Display** (luxury high-contrast serif for headings and pull quotes), **Plus Jakarta Sans** (contemporary geometric sans-serif for UI and readability), and **JetBrains Mono** for accreditation numbers and protocol IDs.

---

## 2. Design Tokens Dictionary

### Typography
| Role | Family | Fallback | Usage |
|---|---|---|---|
| **Editorial Display** | `Playfair Display` | Georgia, serif | Hero titles, destination cards, section headlines |
| **Interface & Body** | `Plus Jakarta Sans` | system-ui, sans-serif | Navigation, descriptions, bio copy, form controls |
| **Tabular / Monospace** | `JetBrains Mono` | monospace | Credentials (`TAT 11/04582`), Protocol (`#FOR-2026-XXXX`) |

### Color Story
| Token | Hex Value | Role |
|---|---|---|
| `--color-alabaster` | `#FAF8F5` | Primary background (Warm silk ivory, non-sterile) |
| `--color-navy-950` | `#06090F` | Deep luxury contrast ground (Hero backdrop, Footer) |
| `--color-gold-400` | `#D4AF37` | Burnished Champagne Gold (Accreditation seals, active glows) |
| `--color-gold-500` | `#C59B27` | Amber Gold accent (Icons, hover highlights, ratings) |
| `--color-gold-900` | `#5D401C` | Deep Bronze (High-contrast text on gold pills) |
| `--color-stone-900` | `#1C1917` | Obsidian Charcoal (Tactile luxury buttons, primary text) |

### Kinetic & Motion Principles (Genjutsu)
- **Entrance Curves:** `cubic-bezier(0.16, 1, 0.3, 1)` (snappy ease-out settle, no cheap spring bounce).
- **Transitions:** Explicit CSS properties (`transform`, `opacity`, `border-color`, `box-shadow`) — strictly avoiding `transition: all`.
- **Reduced Motion:** Fully conforms to `prefers-reduced-motion: reduce`.

---

## 3. Installed AI Skills Catalog

Located in [`.agents/skills/`](file:///c:/Projetos/forturismo/.agents/skills):

1. **`genjutsu` & `genjutsu-paint` / `genjutsu-cast`:**
   - Source: `AThevon/genjutsu`
   - Role: Anti-AI-slop framework, interaction thesis enforcement, kinetic polish, and tactile micro-interactions.
2. **`frontend-design`:**
   - Source: `anthropics/claude-plugins-official`
   - Role: Studio design lead art direction, bespoke typography hierarchy, and rejection of templated cliches.
3. **`ui-ux-pro-max`:**
   - Source: `nextlevelbuilder/ui-ux-pro-max-skill`
   - Role: Design intelligence database (192 reasoning rules, 79 UI styles, accessible contrast standards).

---

## 4. Components Refined in this Run

- [x] [`src/app/globals.css`](file:///c:/Projetos/forturismo/src/app/globals.css): Luxury tokens, Tailwind v4 `@theme`, glassmorphism, tactile button active states, and custom discreet scrollbar.
- [x] [`src/app/layout.tsx`](file:///c:/Projetos/forturismo/src/app/layout.tsx): `Playfair_Display`, `Plus_Jakarta_Sans`, and `JetBrains_Mono` font variables injected.
- [x] [`src/components/Navbar.tsx`](file:///c:/Projetos/forturismo/src/components/Navbar.tsx): Specular glass luxury bar, bespoke jewel brand mark, and refined concierge CTA.
- [x] [`src/components/ParallaxHero.tsx`](file:///c:/Projetos/forturismo/src/components/ParallaxHero.tsx): Editorial serif headlines, tactile floating search bar with brass accents, and video selector.
- [x] [`src/components/DestinationCard.tsx`](file:///c:/Projetos/forturismo/src/components/DestinationCard.tsx): Layered ambient shadows, frosted glass credential pills, and smooth carousel controls.
- [x] [`src/components/GuideCard.tsx`](file:///c:/Projetos/forturismo/src/components/GuideCard.tsx): Gold-embossed accreditation badge (`badge-accreditation`), verified seal, and tactile profile button.
- [x] [`src/components/TourCard.tsx`](file:///c:/Projetos/forturismo/src/components/TourCard.tsx): Editorial typography, duration pill, and bespoke booking button.
- [x] [`src/app/page.tsx`](file:///c:/Projetos/forturismo/src/app/page.tsx): Redesigned section rhythm, trust proposition cards, and 4-phase concierge journey.
- [x] [`src/components/Footer.tsx`](file:///c:/Projetos/forturismo/src/components/Footer.tsx): Deep obsidian footer with warm amber gold highlights.
- [x] [`src/app/guides/page.tsx`](file:///c:/Projetos/forturismo/src/app/guides/page.tsx): Directory filter bar with warm alabaster styling.
- [x] [`src/app/booking/page.tsx`](file:///c:/Projetos/forturismo/src/app/booking/page.tsx): Concierge protocol badges and refined booking experience.
- [x] [`src/app/destinations/[slug]/DestinationDetailClient.tsx`](file:///c:/Projetos/forturismo/src/app/destinations/[slug]/DestinationDetailClient.tsx): Editorial destination showcase.
- [x] [`src/app/guides/[slug]/GuideDetailClient.tsx`](file:///c:/Projetos/forturismo/src/app/guides/[slug]/GuideDetailClient.tsx): Elite guide portfolio view.
