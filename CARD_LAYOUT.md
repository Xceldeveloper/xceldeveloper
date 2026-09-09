# xceldeveloper - Single Screen Card Layout (No Scroll)

**Inspired by:** TSG.xyz
**Concept:** Digital business card - everything in one viewport

---

## Golden Ratio Static Layout (100vh × 100vw)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  HEADER (Full Width)                              [10vh]  ┃
┃  ┌────────────────────────────────────────────────────┐   ┃
┃  │ Overcomer Emiator              [Logo/Link area]    │   ┃
┃  └────────────────────────────────────────────────────┘   ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                               ┃                          ┃
┃  LEFT BODY (61.8%)            ┃  RIGHT AREA (38.2%)      ┃
┃  Main Content                 ┃  Visual Cards            ┃
┃                               ┃                          ┃
┃  ┌─────────────────────────┐ ┃  ┌────────────────────┐ ┃
┃  │                         │ ┃  │                    │ ┃
┃  │  Short Bio              │ ┃  │  Sleekware Card    │ ┃
┃  │  (3-4 lines max)        │ ┃  │                    │ ┃
┃  │                         │ ┃  └────────────────────┘ ┃
┃  └─────────────────────────┘ ┃                          ┃
┃                               ┃  ┌────────────────────┐ ┃
┃  ┌─────────────────────────┐ ┃  │                    │ ┃
┃  │  Work Experience        │ ┃  │  Piggyvest         │ ┃  [80vh]
┃  │  • Piggyvest (Current)  │ ┃  │  Current Role      │ ┃
┃  │  • TransferXO           │ ┃  │                    │ ┃
┃  │  • Scelloo              │ ┃  └────────────────────┘ ┃
┃  └─────────────────────────┘ ┃                          ┃
┃                               ┃  ┌────────────────────┐ ┃
┃  ┌─────────────────────────┐ ┃  │                    │ ┃
┃  │  Tech Stack             │ ┃  │  Tech/Skills       │ ┃
┃  │  Vue • Nuxt • React     │ ┃  │                    │ ┃
┃  └─────────────────────────┘ ┃  └────────────────────┘ ┃
┃                               ┃                          ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  FOOTER (Full Width)                              [10vh]  ┃
┃  ┌────────────────────────────────────────────────────┐   ┃
┃  │ hello@xceldeveloper.com    [LinkedIn] [GitHub] [X]│   ┃
┃  └────────────────────────────────────────────────────┘   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## Detailed Layout Breakdown

### Desktop (1440px+ width)

```
┌────────────────────────────────────────────────────────┐ 0vh
│  HEADER                                                │
│  Overcomer Emiator                    ⚡               │ 10vh
├──────────────────────────────┬─────────────────────────┤
│                              │                         │
│  LEFT (890px / 61.8%)        │  RIGHT (550px / 38.2%)  │
│                              │                         │
│  SHORT BIO                   │  ┌───────────────────┐  │
│  Frontend Engineer &         │  │                   │  │
│  Founder of Sleekware.       │  │   SLEEKWARE       │  │
│  Building intentional        │  │   Card/Logo       │  │
│  software for 5+ years.      │  │                   │  │
│                              │  └───────────────────┘  │
│  ─────────────────────       │                         │
│                              │  ┌───────────────────┐  │
│  WORK                        │  │                   │  │
│  ▸ Piggyvest (2021-Now)      │  │   PIGGYVEST       │  │ 80vh
│    Frontend Engineer         │  │   Current         │  │
│                              │  │                   │  │
│  ▸ TransferXO (2020-21)      │  └───────────────────┘  │
│    Frontend Developer        │                         │
│                              │  ┌───────────────────┐  │
│  ▸ Previous roles...         │  │                   │  │
│                              │  │   VUE · NUXT      │  │
│  ─────────────────────       │  │   GSAP · REACT    │  │
│                              │  │                   │  │
│  SKILLS                      │  └───────────────────┘  │
│  Vue.js · Nuxt · React ·     │                         │
│  GSAP · Node.js              │                         │
│                              │                         │
├──────────────────────────────┴─────────────────────────┤
│  FOOTER                                                │
│  hello@xceldeveloper.com     [in] [gh] [x] [ig]       │ 10vh
└────────────────────────────────────────────────────────┘ 100vh
```

---

## Content Structure (Minimal Essentials)

### Header (10vh)
```
┌─────────────────────────────────────────────┐
│  Overcomer Emiator              ⚡          │
└─────────────────────────────────────────────┘
```

### Left Body (61.8% width, 80vh height)

**1. Short Bio (Top 30%)**
```
Frontend Engineer & Founder of Sleekware.
Building intentional software for 5+ years.
Currently at Piggyvest.
```

**2. Work Experience (Middle 40%)**
```
▸ Piggyvest (2021 - Present)
  Frontend Engineer
  
▸ TransferXO (2020 - 2021)
  Frontend Developer
  
▸ Earlier Roles
  Scelloo, Mulaa, Amenta AB
```

**3. Tech Stack (Bottom 30%)**
```
Vue.js · Nuxt.js · React · Next.js
GSAP · Node.js · TypeScript
```

### Right Area (38.2% width, 80vh height)

**3 Stacked Cards (equal height)**

**Card 1: Sleekware**
```
┌─────────────────┐
│  SLEEKWARE      │
│  Bespoke        │
│  Engineering    │
└─────────────────┘
```

**Card 2: Current Role**
```
┌─────────────────┐
│  PIGGYVEST      │
│  Frontend       │
│  Engineer       │
└─────────────────┘
```

**Card 3: Tech Visual**
```
┌─────────────────┐
│  VUE · NUXT     │
│  GSAP · REACT   │
│  NODE · TS      │
└─────────────────┘
```

### Footer (10vh)
```
┌─────────────────────────────────────────────┐
│  hello@xceldeveloper.com    [in][gh][x][ig] │
└─────────────────────────────────────────────┘
```

---

## Golden Ratio Application

### Vertical Division (100vh)
```
Header:  10vh  (fixed)
Body:    80vh  (main area)
Footer:  10vh  (fixed)
```

### Horizontal Division (Body area)
```
Left:    61.8%  (890px at 1440px)
Right:   38.2%  (550px at 1440px)
Gap:     40px   (φ-based spacing)
```

### Right Area Card Heights (80vh ÷ 3)
```
Each card: ~26.67vh
Gaps: 3vh each (φ-based)

Card 1: 26.67vh
Gap:    3vh
Card 2: 26.67vh
Gap:    3vh
Card 3: 26.67vh
Total:  80vh
```

---

## Responsive Breakpoints

### Desktop (1440px+)
```
Left:  890px (61.8%)
Right: 550px (38.2%)
3 cards stacked vertically
```

### Tablet (768px - 1439px)
```
Left:  60%
Right: 40%
Cards slightly smaller
Font sizes scale down
```

### Mobile (< 768px)
```
Single column stack:
├─ Header (10vh)
├─ Bio (auto)
├─ Cards (horizontal scroll or stack)
├─ Experience (auto)
├─ Footer (10vh)
```

---

## Color Palette (Dark Theme)

```scss
$bg-primary: #0a0a0a;      // Main background (like TSG)
$bg-secondary: #1a1a1a;    // Card backgrounds
$bg-tertiary: #151515;     // Hover states

$text-primary: #ffffff;
$text-secondary: #a0a0a0;
$text-muted: #666666;

$accent: #00ff88;          // Links, highlights (adjust to preference)
$border: #2a2a2a;          // Subtle borders
```

---

## Typography Scale (φ-based)

```scss
$text-xs: 13px;     // Footer links
$text-sm: 14px;     // Card text
$text-base: 16px;   // Body text
$text-lg: 20px;     // Section labels
$text-xl: 32px;     // Name in header
```

---

## Implementation Plan

### Phase 1: Structure
```
app/pages/index.vue
├─ <header> (10vh, full width)
├─ <main> (80vh, flex container)
│   ├─ <section class="left"> (61.8%)
│   └─ <aside class="right"> (38.2%)
└─ <footer> (10vh, full width)
```

### Phase 2: Content
- Populate with actual text
- Add cards to right area
- Style with minimal dark theme

### Phase 3: Polish
- Hover states
- Subtle animations
- Link interactions
- Card micro-interactions

---

## Key Differences from TSG.xyz

**TSG.xyz:**
- Video background
- Modal popups
- Venture cards
- Complex navigation

**Your Card:**
- Simpler, personal
- Direct information display
- Dual identity (engineer + founder)
- Static, no popups
- All info visible at once

---

## Content Priorities (What to Include)

### Must Have ✅
- Name
- Current role
- Sleekware mention
- 2-3 key roles
- Contact email
- Social links (LinkedIn, GitHub)
- Tech stack

### Skip ❌
- Long descriptions
- Multiple pages
- Project details
- Blog posts
- Testimonials
- Forms

---

## Example Content

### Bio (Keep it short!)
```
Frontend Engineer & Founder of Sleekware.
5+ years building scalable web applications.
Currently crafting FinTech experiences at Piggyvest.
```

### Work (Minimal)
```
▸ Piggyvest (2021 - Present)
  Frontend Engineer

▸ TransferXO (2020 - 2021)
  Frontend Developer

▸ Earlier: Scelloo, Mulaa, Amenta AB
```

### Footer
```
hello@xceldeveloper.com
[LinkedIn] [GitHub] [Twitter] [Instagram]
```

---

## Next Steps

1. ✅ Approve this single-screen layout
2. 🎨 Finalize color accent (green like TSG, or different?)
3. 📝 Write the exact bio text (3-4 lines max)
4. 🖼️ Design the 3 right-side cards
5. 💻 Build it!

Ready to proceed?
