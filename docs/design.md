---
name: Velvet Slate Neumorphic
colors:
  surface: "#f6f9ff"
  surface-dim: "#d5dae1"
  surface-bright: "#f6f9ff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#eff4fb"
  surface-container: "#e9eef5"
  surface-container-high: "#e4e9f0"
  surface-container-highest: "#dee3ea"
  on-surface: "#171c21"
  on-surface-variant: "#464555"
  inverse-surface: "#2b3136"
  inverse-on-surface: "#ecf1f8"
  outline: "#777587"
  outline-variant: "#c7c4d8"
  surface-tint: "#4d44e3"
  primary: "#3525cd"
  on-primary: "#ffffff"
  primary-container: "#4f46e5"
  on-primary-container: "#dad7ff"
  inverse-primary: "#c3c0ff"
  secondary: "#4648d4"
  on-secondary: "#ffffff"
  secondary-container: "#6063ee"
  on-secondary-container: "#fffbff"
  tertiary: "#00505f"
  on-tertiary: "#ffffff"
  tertiary-container: "#006a7c"
  on-tertiary-container: "#93e8ff"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#e2dfff"
  primary-fixed-dim: "#c3c0ff"
  on-primary-fixed: "#0f0069"
  on-primary-fixed-variant: "#3323cc"
  secondary-fixed: "#e1e0ff"
  secondary-fixed-dim: "#c0c1ff"
  on-secondary-fixed: "#07006c"
  on-secondary-fixed-variant: "#2f2ebe"
  tertiary-fixed: "#acedff"
  tertiary-fixed-dim: "#4cd7f6"
  on-tertiary-fixed: "#001f26"
  on-tertiary-fixed-variant: "#004e5c"
  background: "#f6f9ff"
  on-background: "#171c21"
  surface-variant: "#dee3ea"
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: "700"
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: "700"
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: "600"
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: "600"
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "600"
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 22px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "400"
    lineHeight: 18px
    letterSpacing: 0.015em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "600"
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: "600"
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 0.75rem
  gutter-lg: 2rem
  margin: 2rem
  margin-mobile: 1rem
  margin-tablet: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system delivers a tactile, sculpted Soft UI (Neumorphism) environment engineered specifically for productivity workflows and contact pipeline management. It replaces arbitrary flat borders and floating card abstractions with extruded and debossed physical metaphors, transforming the interface into a continuous, physical slate surface.

The emotional tone balances calm tactile focus with modern executive authority:

- **Tactility:** Surfaces feel carved directly from a single slate slab, evoking physical office stationery, high-end hardware consoles, and desk accessories.
- **Cognitive Ease:** Low-glare off-white background tones reduce prolonged screen fatigue during high-volume contact outreach and follow-up logging.
- **Clarity & Inclusivity:** Neumorphism often struggles with legibility; this system strictly isolates soft extrusion effects to surfaces, using crisp high-contrast slate-indigo and charcoal inks for text elements. Full support for Latin and complex non-Latin scripts (such as Thai) is preserved through disciplined line-height calibration and generous baseline clearance.

## Colors

The palette is derived from an engineered neutral canvas (`#e0e5ec`) optimized for dual-directional light distribution. All UI surfaces emerge from this tone rather than sitting on top of it.

- **Canvas & Surface Base (`#e0e5ec`):** The master ambient tone. All extruded buttons, contact cards, columns, and navigation docks must match this exact hex tone to maintain the illusion of seamless physical deformation.
- **Primary Indigo (`#4f46e5`):** The actionable trigger tone used for key pipeline transitions, active follow-up flags, and primary extrusion accents.
- **Secondary Slate Violet (`#6366f1`):** Auxiliary state indicator for secondary progress stages, hover blooms, and tag indicators.
- **Tertiary Cyan (`#06b6d4`):** High-priority alerts, upcoming scheduled calls, and live connection indicators.
- **Shadow Light Source (`rgba(255, 255, 255, 0.9)`):** Upper-left highlight reflecting an imaginary ambient light source at 315 degrees.
- **Shadow Ambient Occlusion (`rgba(163, 177, 198, 0.6)`):** Lower-right soft dispersion grounding the extrusions.
- **Typography & Foreground Inks:**
  - Ink Display & Heading: `#1e293b` (Slate 800) – guarantees accessible WCAG AAA reading contrast.
  - Ink Body & Labels: `#334155` (Slate 700) – legible across intricate Thai loops and vowel accents.
  - Ink Muted: `#64748b` (Slate 500) – reserved exclusively for metadata, timestamps, and debossed placeholder states.

## Typography

Inter serves as the primary typographic foundation across display, interface labels, and dense body text. Its neutral, systematic geometry balances the organic softness of Neumorphic convex and concave surfaces.

### Script & Thai Typesetting Requirements

- **Tall Glyphs & Diacritics:** Thai script uses complex above-vowels (ไม้เอก, ไม้โท) and below-vowels (สระอุ, สระอู). The line-heights across `body-lg` (26px for 16px font) and `body-md` (22px for 14px font) are strictly padded to eliminate glyph clipping inside debossed input troughs and extruded contact cards.
- **Optical Weight Selection:** To combat soft shadow bleed around containers, never use weights below 400 (Regular). Critical interface states and Thai labels must be rendered at 500 (Medium) or 600 (Semi-Bold) to ensure high contour definition against `#e0e5ec`.

## Layout & Spacing

Neumorphic designs require breathing room; dual opposing shadows require negative space to decay naturally without clipping adjacent components.

### Layout Philosophy

- **Board Grid Structure:** The follow-up contact view utilizes a responsive multi-lane Kanban and split-pane architecture. Columns use a fluid flex structure with minimum column widths of `320px` to prevent card pinching.
- **Desktop (>= 1280px):** Multi-column follow-up stage layout (Lead, Reached, Follow-Up Scheduled, Won) with `margin: 2rem` and `gutter: 1.5rem`.
- **Tablet (768px - 1279px):** Horizontally scrolling lane layout with docked status filters; margins step down to `1.5rem` with `gutter-sm: 0.75rem`.
- **Mobile (< 768px):** Single-column stacked stack view with swipeable contact follow-up tabs, relying on `margin-mobile: 1rem`.

Component padding must never collapse below `space-md` (`1rem`) on extruded interactive elements, ensuring the visual rise of the surface does not encroach on text baselines.

## Elevation & Depth

Visual hierarchy is constructed purely through light, shadow, and physical displacement against `#e0e5ec`. Flat boundaries, 1px solid stroke outlines, and generic black drop-shadows are strictly prohibited.

### 1. Extruded Surface (Convex / Resting State)

Used for resting cards, column trays, and unpressed pill triggers. The surface projects upward toward the viewer.

- **Formula:**
  `box-shadow: -6px -6px 12px rgba(255, 255, 255, 0.9), 6px 6px 12px rgba(163, 177, 198, 0.6);`
- **Behavior:** Background must match canvas `#e0e5ec` exactly.

### 2. High Extrusion (Floating Modals & Active Drag Cards)

Elevated higher off the board plane to communicate active manipulation or focus.

- **Formula:**
  `box-shadow: -10px -10px 20px rgba(255, 255, 255, 1.0), 10px 10px 20px rgba(163, 177, 198, 0.75);`

### 3. Debossed Surface (Concave / Pressed / Inset State)

Carved inward below the canvas plane. Mandatory for text entry fields, search bars, checkbox tracks, and active/toggled filter buttons.

- **Formula:**
  `box-shadow: inset -4px -4px 8px rgba(255, 255, 255, 0.9), inset 4px 4px 8px rgba(163, 177, 198, 0.6);`

### 4. Interactive Tactile Transition

Buttons and selectable board items transition from Extruded (`-6px/-6px, 6px/6px`) to Debossed (`inset -3px/-3px, inset 3px/3px`) upon `:active` or checked conditions. Transitions must run on `cubic-bezier(0.4, 0, 0.2, 1)` across `150ms` to evoke a physical tactile switch.

## Shapes

The geometric framework uses fluid, organic radiuses (`roundedness: 2`) that accentuate how light curves around continuous surfaces:

- **Base Components (Inputs, Small Triggers):** `rounded-md` (`0.5rem` / 8px).
- **Cards & Module Containers:** `rounded-lg` (`1rem` / 16px) to `rounded-xl` (`1.5rem` / 24px) for prominent board lanes and floating detail panels.
- **Pills & Status Tags:** Fully rounded pill-shapes (`rounded-full`) are reserved for contact status chips, tag triggers, and icon-only round action buttons.
- **Avoid Hard Edges:** 0px sharp corners break the fluid illusion of molded slate and cause dual shadows to clip unnaturally at perpendicular intersections.

## Components

### Buttons

- **Primary Extruded Button:** Surface `#e0e5ec`, text `#4f46e5` (Semi-Bold). Extruded dual shadow (`-5px -5px 10px #ffffff`, `5px 5px 10px #a3b1c6`). On `:hover`, slightly heighten light blur; on `:active`, instantly flip to debossed inset shadow with text scale transform down `0.98`.
- **Primary Accent CTA:** Surface gradient `linear-gradient(135deg, #4f46e5, #4338ca)`, text `#ffffff`. Shadow: `-4px -4px 10px rgba(255,255,255,0.7)`, `4px 4px 12px rgba(79, 70, 229, 0.4)`.
- **Ghost/Pencil Action Triggers:** Flat background on rest; reveals a `-3px -3px 6px #fff, 3px 3px 6px #a3b1c6` extrusion on hover.

### Inputs & Search Bars

- **Debossed Form Wells:** Container utilizes inset shadow (`inset 4px 4px 8px #a3b1c6`, `inset -4px -4px 8px #ffffff`). No border.
- **Focus Ring:** When focused, do not add standard blue browser outlines. Instead, overlay a delicate inner glow: `inset 2px 2px 4px rgba(79, 70, 229, 0.25), inset -2px -2px 4px rgba(255, 255, 255, 0.9)` paired with a soft caret color `#4f46e5`.
- **Text Sizing:** Font size set to `14px` (`body-md`) with `line-height: 22px` to accommodate accented Thai strings comfortably without clipping.

### Contact Cards (Board Items)

- **Resting:** Smooth extruded rounded panel (`rounded-xl`), background `#e0e5ec`, dual shadows `-6px -6px 12px rgba(255,255,255,0.9)`, `6px 6px 12px rgba(163,177,198,0.6)`.
- **Card Content Structure:**
  - Header: Contact display name (`headline-sm`, `#1e293b`), accompanied by a circular embossed avatar holder.
  - Sub-row: Company or title in `body-sm` (`#64748b`).
  - Next Follow-Up Indicator: Debossed inset pill displaying scheduled date and countdown badge.
- **Dragging / Focus:** Translates `-2px` along the Y-axis with High Extrusion shadows.

### Chips & Filter Pills

- **Filter Inactive:** Extruded convex pill (`rounded-full`), text `#334155`.
- **Filter Active:** Debossed concave pill (`box-shadow: inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff`), text `#4f46e5`, accompanied by a primary indigo status dot.

### Checkboxes & Stage Toggles

- **Checkbox:** Carved square well (`20px x 20px`, `rounded-md`, inset shadow). When checked, an extruded slate-indigo check indicator elevates from the hollow base.
- **Segmented Stage Controls:** A large debossed track housing sliding extruded pills that physically "click" into the selected follow-up stage.

### Lists & Timeline Activity

- Activity log items connect along a subtle debossed vertical groove etched into the background slate canvas.
- Event markers use convex circular rivets with primary indigo center accents indicating call completions, emails sent, and scheduled meetings.
