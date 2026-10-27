---
name: frontend-design
description: Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making choices that don't read as templated defaults.
---

# Frontend Design (Anthropic Design Direction)

Approach this as the design lead at a design studio known for giving every client a distinct visual identity that is not mistaken for anyone else's. This client has already rejected proposals that felt cliché or templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take aesthetic risk if justified.

## Ground your designs in the subject matter

If the brief does not identify what the product or subject matter is, identify it yourself before designing, and confirm with the client. You can come up with one concrete subject, the design's audience, and the design's primary job, as a proposal. The subject's industry, subject matter, materials, and vernacular are where distinctive visual choices come from — a design for a travel/tourism luxury agency will be very aesthetically different from a dashboard for financial analysts. Build with the brief's real content and subject matter throughout.

## Design principles

For web designs, the hero is the first thing viewers will see. Open with the most characteristic thing in the subject's world, in the form that is most appropriate: a headline, an image, an animation, a live demo, an interactive moment, or other treatments. Be deliberate with your choice: a big number with a small label, supporting stats, and a gradient accent is the default treatment, so only use it if that's truly the best option.

Typography carries the personality of the page. You don't need a different typeface for display or headline text and body content: use one family or two, and if two, make them clearly distinct.

Choose your typefaces deliberately, not the default families you would reach for on any other project, and set a clear type scale following the default guidance of The Elements of Typographic Style with intentional weights, widths, and spacing. When type is used as a headline or visual element, use the type treatment itself as an active part of the design, not a neutral delivery vehicle for the content.

Default to line lengths of less than 80 characters. Serif typefaces can have slightly longer line lengths; give serif body text slightly more line-height than a sans-serif.

Avoid these default typographic treatments; they are the commonest tells of a generated page:
- Accenting just a single word or phrase in a headline, like putting one word in italic/bold or a different color.
- Using all caps for labels.
- Adding unnecessary typographic labels above content.

Visual structure is information. Structural devices like outlines, borders, numbering, eyebrows, dividers, labels, etc., encode useful information about the content rather than decorate it. Many generic designs use numbered markers (01 / 02 / 03), but that's only appropriate if the content actually is a sequence — like a stepped process or a timeline. Before adding numbered markers, check the content really is a sequence.

Use non-user-triggered motion sparingly and deliberately, only to draw attention. A single orchestrated moment — one page-load sequence or one reveal — lands better than scattered effects; fade-and-rise on scroll is the generic animation treatment, so use it only when that is the right choice, not the default. When using CSS transitions for states like hover or focus, specify the transition property rather than transitioning all, use short durations (under 300ms), and pick an easing that matches the feeling of the interaction.

Layered CSS backgrounds create depth without image assets: subtle radial glows, faint grid lines, soft angular gradients, or overlapping color washes. Match the background treatment to the mood: warm paper grains for editorial, crisp low-opacity grids for technical tools, soft diffuse glows for modern software.

Spend your aesthetic budget intentionally. If you have an illustrative element, you don't need colorful typography; if you have rich photography, keep UI frames minimal; if you have a dense data table, you don't need complex background gradients.

Look at the real world for layout and organizational ideas:
- Editorial: print magazines, books, newspapers, art catalogs
- Physical products: instruments, packaging, hardware interfaces
- Real spaces: galleries, libraries, storefronts, signage

Don't copy digital trends that don't fit the subject just because they're popular.

## Workflow

Begin by clarifying:
1. Product or subject matter: what does it do and who uses it?
2. Tone and mood: should it feel playful, technical, luxurious, utilitarian, friendly, severe?
3. Core action or message: what is the single most important thing a visitor should understand or do?
4. Existing assets or constraints: are there brand colors, logos, fonts, or existing components that must be preserved?

Work in two passes. First, brainstorm a short design plan based on the client's design brief: create a compact token system with color, type, layout, and principles:
- Color: describe the core base palette as 4–6 named hex values.
- Type: the typefaces and their roles.
- Layout: a layout concept, using one-sentence prose descriptions and ASCII wireframes to ideate and compare. Include alignment guidance; should the content be left aligned, center aligned, justified?
- Principles: the high-level guidance for what makes this page unique.

Then review that plan against the brief before building: if any part of it reads like the generic default you would produce for any similar page rather than a choice made for this specific brief — revise that part, say what you changed and why. Only after you've confirmed the relative uniqueness of your design plan should you start to write the code, following the revised plan.

## Restraint and self-critique

Spend your boldness in one place. Let one element be the memorable thing, keep everything around it quiet and disciplined, and cut any decoration that does not serve the brief. Build to a quality floor without announcing it: responsive down to mobile, visible keyboard focus, reduced motion respected, visually accessible, harmonious color palettes.
