---
name: brand-guidelines
description: Applies Anthropic's official brand colors and typography to any sort of artifact that may benefit from having Anthropic's look-and-feel. Use it when brand colors or style guidelines, visual formatting, or company design standards apply. Triggers on "Anthropic brand", "Claude brand", "Anthropic colors", "brand palette", "brand styling", "Anthropic style", "Claude style", "official branding".
license: Complete terms in LICENSE.txt
---

# Anthropic Brand Styling

Apply Anthropic's visual identity when the user explicitly wants Anthropic/Claude branding on an artifact. NOT for general web design or unrelated projects.

## Colors

### Primary Palette

| Role | Hex | Usage |
|------|-----|-------|
| Orange | `#F97316` | Primary accent, CTAs, highlights, links |
| Dark Navy | `#1A1A2E` | Primary dark background |
| Deep Blue | `#16213E` | Secondary dark background, cards |
| Cream | `#FAF9F6` | Light text on dark, light backgrounds |
| White | `#FFFFFF` | Body text on dark, clean backgrounds |

### Supporting Palette

| Role | Hex | Usage |
|------|-----|-------|
| Warm Gray | `#E8E6DC` | Subtle borders, dividers, muted backgrounds |
| Mid Gray | `#B0AEA5` | Secondary text, captions, placeholders |
| Slate | `#64748B` | Tertiary text, disabled states |

### Accent Extensions

| Color | Hex | Use sparingly for |
|-------|-----|-------------------|
| Blue | `#3B82F6` | Secondary accent, info states |
| Green | `#22C55E` | Success states, positive indicators |
| Red | `#EF4444` | Error states, destructive actions |

## Typography

### Font Stack

```css
/* Headings */
font-family: 'Suisse Int\'l', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Body */
font-family: 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace (code) */
font-family: 'Geist Mono', 'JetBrains Mono', 'Fira Code', monospace;
```

### Scale

- Headings: Semi-bold (600), tight letter-spacing (-0.02em)
- Body: Regular (400), normal letter-spacing
- Small/captions: Regular (400), slightly looser (0.01em)

## Usage Rules

### HTML/CSS Artifacts

- Dark backgrounds use `#1A1A2E` or `#16213E` with cream/white text
- Orange (`#F97316`) for primary buttons and interactive highlights
- Rounded corners: `8px` (small), `12px` (cards), `16px` (modals)
- Subtle shadows: `0 1px 3px rgba(0,0,0,0.12)` for elevation

### Presentations (PPTX, slides)

- Dark slide backgrounds with cream headings
- Orange for chart accents and callout boxes
- No gradients; flat solid fills only

### Images and Posters

- Dark base (`#1A1A2E`) with cream typography
- Orange sparingly for focal elements
- Generous whitespace; avoid visual clutter

### General Rules

- Orange is the hero color. Use it for one primary element per view, not everywhere.
- Dark backgrounds should dominate. Light surfaces are for content areas only.
- Never use orange text on dark backgrounds at small sizes (readability). Use cream or white.
- Maintain high contrast ratios (WCAG AA minimum).
