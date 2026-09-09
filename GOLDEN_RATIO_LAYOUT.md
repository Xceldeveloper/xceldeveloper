# xceldeveloper - Golden Ratio Layout System

## The Golden Ratio (φ ≈ 1.618)

**Core Principle:** Divide the page using ratio 1:1.618 for visual harmony

---

## Desktop Layout (1920px × viewport)

### Viewport Division by Golden Ratio

```
Total Height = 100vh

Using φ = 1.618:
├─ Primary Area (61.8vh) ← Larger portion (1.618/2.618 ≈ 0.618)
└─ Secondary Area (38.2vh) ← Smaller portion (1/2.618 ≈ 0.382)
```

### Section Breakdown (One-Page Scroll)

```
┌─────────────────────────────────────────────────┐
│  HERO / IDENTITY                     [100vh]    │ ← Full viewport hero
│  ┌─────────────────────────────┐               │
│  │  Name                       │               │
│  │  Role & Company             │  [61.8%]      │
│  │  Tagline                    │               │
│  └─────────────────────────────┘               │
│  ┌─────────────────────────────┐               │
│  │  Quick Stats / CTAs         │  [38.2%]      │
│  └─────────────────────────────┘               │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  WORK / EXPERTISE                    [100vh]    │
│  ┌──────────────────┬──────────────┐           │
│  │                  │              │           │
│  │  Featured        │   Tech       │           │
│  │  Projects        │   Stack      │ [61.8%]  │
│  │  (3-4 cards)     │   Grid       │           │
│  │                  │              │           │
│  ├──────────────────┴──────────────┤           │
│  │  Experience Timeline             │ [38.2%]  │
│  └──────────────────────────────────┘           │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  ABOUT / PHILOSOPHY              [80-100vh]     │
│  ┌─────────────────────────────┐               │
│  │                             │               │
│  │  The Story                  │  [61.8%]      │
│  │  Engineer → Entrepreneur    │               │
│  │                             │               │
│  ├─────────────────────────────┤               │
│  │  Core Values / Skills       │  [38.2%]      │
│  └─────────────────────────────┘               │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  SLEEKWARE                           [100vh]    │
│  ┌──────────────────┬──────────────┐           │
│  │                  │              │           │
│  │  Philosophy      │  Services    │ [61.8%]  │
│  │  & Approach      │  & Process   │           │
│  │                  │              │           │
│  ├──────────────────┴──────────────┤           │
│  │  Notable Work / Testimonial     │ [38.2%]  │
│  └──────────────────────────────────┘           │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  CONTACT                             [60vh]     │
│  ┌─────────────────────────────┐               │
│  │  Get in Touch               │  [61.8%]      │
│  │  Form / Email               │               │
│  ├─────────────────────────────┤               │
│  │  Social Links / Footer      │  [38.2%]      │
│  └─────────────────────────────┘               │
└─────────────────────────────────────────────────┘
```

---

## Desktop Grid System (Horizontal Golden Ratio)

```
Container: 1440px max-width

┌─────────────────────────────────────────────────┐
│                                                 │
│  ├────────────────────┤├──────────┤            │
│       890px (61.8%)      550px (38.2%)         │
│                                                 │
└─────────────────────────────────────────────────┘

For two-column layouts:
├─ Large Column: 61.8% (890px)
└─ Small Column: 38.2% (550px)
```

---

## Tablet Layout (768px - 1024px)

### Adjusted Sections

```
HERO                               [100vh]
├─ Name/Role              [61.8%]
└─ Stats/CTAs             [38.2%]

WORK                               [120vh]
├─ Projects (2 cols)      [70%]
└─ Timeline               [30%]

ABOUT                              [100vh]
├─ Story                  [61.8%]
└─ Skills                 [38.2%]

SLEEKWARE                          [100vh]
├─ Philosophy             [61.8%]
└─ Services               [38.2%]

CONTACT                            [60vh]
├─ Form                   [61.8%]
└─ Links                  [38.2%]
```

### Tablet Grid

```
Container: 90% width (691px - 922px)

For two-column:
├─ Large: 61.8% (427px - 570px)
└─ Small: 38.2% (264px - 352px)
```

---

## Mobile Layout (< 768px)

### Single Column Stack

```
All sections become single column vertical stack
But maintain golden ratio in:
├─ Section internal spacing
├─ Image aspect ratios (1:1.618)
└─ Content block proportions

HERO                               [100vh]
├─ Name/Identity          [61.8%]
└─ Quick CTA              [38.2%]

WORK                               [Auto]
├─ Featured Project       [Each card follows φ]
├─ Featured Project
└─ View More Link

ABOUT                              [Auto]
├─ Story (main)           [61.8%]
└─ Quick facts            [38.2%]

SLEEKWARE                          [Auto]
├─ What we do             [61.8%]
└─ Contact CTA            [38.2%]

CONTACT                            [Auto]
├─ Form/Email             [61.8%]
└─ Social                 [38.2%]
```

### Mobile Spacing

```
Vertical rhythm based on φ:
├─ Large space: 48px
├─ Medium space: 30px (48/1.618)
└─ Small space: 18px (30/1.618)
```

---

## Content Distribution by Golden Ratio

### Hero Section (100vh)

```
┌─────────────────────────────────────┐ 0vh
│                                     │
│         [Empty Space - 23.6vh]      │ ← Breathing room
│                                     │
├─────────────────────────────────────┤ 23.6vh
│                                     │
│    Overcomer Emiator                │
│    Frontend Engineer & Founder      │
│    "Building intentional software..." │ ← Main content (38.2vh)
│                                     │
│    [Two CTAs]                       │
├─────────────────────────────────────┤ 61.8vh
│                                     │
│    5+ Years  |  Piggyvest  |  Sleekware │ ← Secondary (38.2vh)
│                                     │
│    Scroll indicator ↓               │
└─────────────────────────────────────┘ 100vh
```

### Work Section (100vh)

```
┌────────────────┬────────────────┐
│                │                │
│  Project 1     │   Vue.js       │
│  [Card]        │   Nuxt.js      │
│                │   React        │ } 61.8vh
│  Project 2     │   GSAP         │
│  [Card]        │   Node.js      │
│                │   TypeScript   │
├────────────────┴────────────────┤
│  2021-Present: Piggyvest        │
│  2020-2021: TransferXO          │ } 38.2vh
│  [Timeline continues...]        │
└─────────────────────────────────┘
```

---

## Responsive Breakpoints

```scss
// Golden ratio breakpoints
$mobile: 320px;      // Base
$mobile-lg: 518px;   // 320 × φ
$tablet: 838px;      // 518 × φ
$desktop: 1356px;    // 838 × φ
$desktop-lg: 2194px; // 1356 × φ

// Standard breakpoints (adjusted)
$bp-mobile: 375px;
$bp-tablet: 768px;
$bp-desktop: 1440px;
```

---

## Animation Timing (Golden Ratio)

```scss
// Duration based on φ
$duration-fast: 300ms;      // Base
$duration-medium: 486ms;    // 300 × φ
$duration-slow: 786ms;      // 486 × φ

// Delays
$delay-short: 100ms;
$delay-medium: 162ms;       // 100 × φ
$delay-long: 262ms;         // 162 × φ
```

---

## Typography Scale (Golden Ratio)

```scss
// Base: 16px
$text-xs: 10px;      // 16 / φ²
$text-sm: 13px;      // 16 / φ × 1.3
$text-base: 16px;    // Base
$text-lg: 26px;      // 16 × φ
$text-xl: 42px;      // 26 × φ
$text-2xl: 68px;     // 42 × φ
$text-3xl: 110px;    // 68 × φ

// Line heights
$leading-tight: 1.236;   // φ⁻¹
$leading-normal: 1.618;  // φ
$leading-relaxed: 2;     // φ × 1.236
```

---

## Spacing System (Golden Ratio)

```scss
// Base unit: 8px
$space-1: 5px;      // 8 / φ
$space-2: 8px;      // Base
$space-3: 13px;     // 8 × φ
$space-4: 21px;     // 13 × φ
$space-5: 34px;     // 21 × φ
$space-6: 55px;     // 34 × φ
$space-7: 89px;     // 55 × φ
$space-8: 144px;    // 89 × φ
```

---

## Visual Box System for One-Page

### The Golden Rectangle Grid

```
Screen divided into φ rectangles:

┌─────────────────────────────────────────────┐
│ A                           │ B             │
│ Primary Content             │ Accent        │
│ (61.8% width)              │ (38.2%)       │
│                            │               │
│ ┌─────────────┐           │ ┌───────────┐ │
│ │             │           │ │           │ │
│ │  Content    │           │ │  Visual   │ │
│ │  Block      │  (61.8%)  │ │  Element  │ │
│ │             │           │ │           │ │
│ └─────────────┘           │ └───────────┘ │
│ ┌─────────────┐           │               │
│ │  Secondary  │  (38.2%)  │               │
│ └─────────────┘           │               │
└─────────────────────────────────────────────┘
```

---

## Interaction Zones (One-Page Navigation)

```
Fixed Navigation (if needed):
├─ Height: 89px (from φ spacing)
├─ Logo: Left (38.2% point)
└─ Links: Right (61.8% point)

Scroll Progress:
├─ Position: 38.2% from top
└─ Width: 61.8% of viewport

CTAs:
├─ Primary: Larger (φ ratio to secondary)
├─ Secondary: Smaller
└─ Spacing between: φ-based
```

---

## Implementation Strategy

1. **CSS Variables for φ**
```scss
:root {
  --phi: 1.618;
  --phi-inverse: 0.618;
  
  // Derived values
  --section-primary: 61.8vh;
  --section-secondary: 38.2vh;
  
  --col-large: 61.8%;
  --col-small: 38.2%;
}
```

2. **Intersection Observer for Sections**
- Trigger animations at φ scroll points
- Section transitions at golden divisions

3. **Smooth Scroll Snapping**
- Each section = scroll snap point
- Smooth GSAP-driven scrolling

---

## Content Allocation Decision Matrix

### Hero (100vh)
| Area | Size | Content |
|------|------|---------|
| Top breathing | 23.6vh | Empty/subtle animation |
| Main identity | 38.2vh | Name, role, tagline |
| Secondary info | 38.2vh | Stats, CTAs, scroll hint |

### Work (100vh)
| Area | Size | Content |
|------|------|---------|
| Left column | 61.8% | 3-4 featured projects |
| Right column | 38.2% | Tech stack + Skills |
| Bottom strip | Full width | Timeline or "View all" |

### About (100vh)
| Area | Size | Content |
|------|------|---------|
| Main story | 61.8vh | Engineer → Entrepreneur narrative |
| Supporting | 38.2vh | Values, location, contact prompt |

### Sleekware (100vh)
| Area | Size | Content |
|------|------|---------|
| Philosophy | 61.8% | What we do, how we think |
| Services | 38.2% | Offerings, process |
| Bottom | Full | CTA: "Let's discuss your build" |

### Contact (60vh)
| Area | Size | Content |
|------|------|---------|
| Main | 61.8% | Email, form, or direct links |
| Footer | 38.2% | Social, copyright, back to top |

---

## Next Steps

1. **Approve layout divisions**
2. **Assign specific content to each box**
3. **Design/prototype each section**
4. **Implement with GSAP scroll animations**
