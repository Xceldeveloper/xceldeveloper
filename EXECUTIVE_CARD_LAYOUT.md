# xceldeveloper - Executive Business Card (No Scroll)

**Positioning:** High-value individual - Founder & Engineering Leader
**Style:** TSG.xyz inspired - Dark, minimal, sophisticated
**Key Addition:** Side profile photo (facing left) positioned by golden ratio

---

## Golden Ratio Layout with Photo

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  Overcomer Emiator                               ⚡       ┃  ← Header (10vh)
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                 ┃                        ┃
┃  LEFT (61.8%)                   ┃  RIGHT (38.2%)         ┃
┃                                 ┃                        ┃
┃  Founder & Engineering Leader   ┃  ┌──────────────────┐ ┃
┃  at Sleekware                   ┃  │                  │ ┃
┃                                 ┃  │   [PROFILE]      │ ┃
┃  Building intentional software  ┃  │   PHOTO          │ ┃
┃  for ambitious businesses.      ┃  │   Side view →    │ ┃
┃  Currently leading frontend     ┃  │                  │ ┃
┃  engineering at Piggyvest.      ┃  │   (φ position)   │ ┃
┃                                 ┃  └──────────────────┘ ┃
┃  ─────────────────              ┃                        ┃
┃                                 ┃  ┌──────────────────┐ ┃
┃  EXPERIENCE                     ┃  │                  │ ┃
┃                                 ┃  │   SLEEKWARE      │ ┃  80vh
┃  Piggyvest                      ┃  │   Bespoke        │ ┃  Body
┃  Frontend Engineering Lead      ┃  │   Engineering    │ ┃
┃  2021 - Present                 ┃  │                  │ ┃
┃                                 ┃  └──────────────────┘ ┃
┃  TransferXO                     ┃                        ┃
┃  Frontend Developer             ┃  ┌──────────────────┐ ┃
┃  2020 - 2021                    ┃  │                  │ ┃
┃                                 ┃  │   PIGGYVEST      │ ┃
┃  Prior experience at            ┃  │   FinTech        │ ┃
┃  Scelloo, Mulaa, Amenta AB      ┃  │   Engineering    │ ┃
┃                                 ┃  │                  │ ┃
┃                                 ┃  └──────────────────┘ ┃
┃                                 ┃                        ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  hello@xceldeveloper.com    [LinkedIn][GitHub][X][IG]    ┃  ← Footer (10vh)
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## Photo Placement (Golden Ratio)

### Position in Right Column (38.2% area)

```
Right Area Height: 80vh

Photo positioned at golden ratio point:
├─ From top: 80vh × 0.382 = 30.56vh
├─ Photo height: 80vh × 0.382 = 30.56vh
└─ Photo occupies upper golden section

┌─────────────────────┐ 0vh
│                     │
│   Empty space       │ (breathing room)
│                     │
├─────────────────────┤ 30.56vh (φ point)
│                     │
│   PROFILE PHOTO     │
│   Side view         │
│   Facing left ←     │ 30.56vh height
│                     │
├─────────────────────┤ 61.12vh
│                     │
│   SLEEKWARE CARD    │
│                     │
├─────────────────────┤
│   PIGGYVEST CARD    │
└─────────────────────┘ 80vh
```

---

## Refined Content (High-Value Positioning)

### Header
```
Overcomer Emiator
```

### Left Body - Bio Section (Executive positioning)

**Title (Primary)**
```
Founder & Engineering Leader at Sleekware
```

**Bio (3-4 lines)**
```
Building intentional software for ambitious businesses.
Currently leading frontend engineering at Piggyvest.
5+ years architecting scalable systems.
```

### Left Body - Experience (No tech skills listed)

```
EXPERIENCE

Piggyvest
Frontend Engineering Lead
2021 - Present

TransferXO  
Frontend Developer
2020 - 2021

Prior experience at Scelloo, Mulaa, Amenta AB
```

**Note:** Skills are IMPLIED through roles, not explicitly listed

---

## Right Column Elements

### 1. Profile Photo (Top - Golden Ratio Position)
```
┌──────────────────────┐
│                      │
│   [Your Photo]       │
│   Side profile       │
│   Facing left        │
│   Professional       │
│   Black & white      │
│   or subtle color    │
│                      │
└──────────────────────┘
```

**Photo Specs:**
- Aspect ratio: 1:1.618 (golden rectangle)
- Style: Professional, subtle
- Treatment: B&W or desaturated
- Position: Facing left (draws eye into content)
- Size: Takes 38.2% of right column height

### 2. Sleekware Card
```
┌──────────────────────┐
│                      │
│    SLEEKWARE         │
│    ─────────         │
│    Bespoke           │
│    Engineering       │
│                      │
└──────────────────────┘
```

### 3. Current Role Card
```
┌──────────────────────┐
│                      │
│    PIGGYVEST         │
│    ─────────         │
│    FinTech           │
│    Engineering       │
│                      │
└──────────────────────┘
```

### Footer
```
hello@xceldeveloper.com    [in] [gh] [x] [ig]
```

---

## Voice & Messaging Shift

### ❌ OLD (Developer-focused)
```
"Frontend Engineer with 5+ years experience
Vue.js • Nuxt.js • React • GSAP • Node.js
Building scalable applications"
```

### ✅ NEW (High-value individual)
```
"Founder & Engineering Leader at Sleekware
Building intentional software for ambitious businesses.
Currently leading frontend engineering at Piggyvest."
```

**Key Differences:**
- Lead with **Founder** title
- Emphasize **leadership** and **business impact**
- No tech stack listing
- Skills implied through **experience & outcomes**
- More **strategic**, less **tactical**

---

## Typography Hierarchy (Executive Style)

```scss
// Header
$name: 32px;           // Bold, prominent

// Left body
$title: 24px;          // "Founder & Engineering Leader"
$body: 16px;           // Bio text
$label: 14px;          // "EXPERIENCE" label
$role: 18px;           // Company names (Piggyvest, TransferXO)
$role-desc: 15px;      // Job titles
$dates: 14px;          // Years (2021 - Present)

// Right cards
$card-title: 20px;     // SLEEKWARE, PIGGYVEST
$card-subtitle: 14px;  // "Bespoke Engineering", "FinTech"

// Footer
$footer: 14px;         // Email and social links
```

---

## Color Palette (Executive Dark)

```scss
// Backgrounds
$bg-primary: #0a0a0a;       // Main dark
$bg-card: #1a1a1a;          // Cards
$bg-photo: #151515;         // Photo container

// Text
$text-primary: #ffffff;     // Main text
$text-secondary: #b0b0b0;   // Job titles, dates
$text-muted: #707070;       // Labels

// Accents (subtle, not bright)
$accent: #a0a0a0;           // Minimal accent
$link-hover: #ffffff;       // Links on hover

// Borders (very subtle)
$border: rgba(255,255,255,0.08);
```

---

## Experience Section Format (No Skills)

### Current Format (Developer)
```
▸ Piggyvest (2021 - Present)
  Frontend Engineer
  Vue.js, Nuxt.js, GSAP ← Remove this
```

### New Format (Executive)
```
Piggyvest
Frontend Engineering Lead
2021 - Present

[Empty line for breathing room]

TransferXO
Frontend Developer  
2020 - 2021
```

**Skills Implied Through:**
- Company prestige (Piggyvest = FinTech)
- Role title (Engineering **Lead**)
- Sleekware (Bespoke Engineering)
- Duration (5+ years, current 3+ years)

---

## Photo Guidelines

### Ideal Photo Characteristics:
1. **Orientation:** Side profile facing LEFT
2. **Style:** Professional but approachable
3. **Treatment:** B&W or subtle desaturation
4. **Background:** Dark or removed/blurred
5. **Lighting:** Dramatic, side-lit preferred
6. **Crop:** Head and shoulders, not just face
7. **Expression:** Thoughtful, confident
8. **Dress:** Professional (jacket/shirt)

### Photo Placement Magic:
- Positioned at **38.2%** from top of right column
- Creates visual anchor point
- Faces left → draws eye toward main content
- Golden ratio sizing creates natural focal point

---

## Complete Content (Final Copy)

### LEFT COLUMN

**Bio:**
```
Founder & Engineering Leader at Sleekware

Building intentional software for ambitious 
businesses. Currently leading frontend engineering 
at Piggyvest. 5+ years architecting scalable systems.
```

**Experience:**
```
EXPERIENCE

Piggyvest
Frontend Engineering Lead
2021 - Present

TransferXO
Frontend Developer
2020 - 2021

Prior experience at Scelloo, Mulaa, Amenta AB
```

### RIGHT COLUMN

**Photo:** [Your side profile headshot]

**Card 1:**
```
SLEEKWARE
─────────
Bespoke
Engineering
```

**Card 2:**
```
PIGGYVEST
─────────
FinTech
Engineering
```

### FOOTER
```
hello@xceldeveloper.com    [LinkedIn] [GitHub] [Twitter] [Instagram]
```

---

## Why This Works (High-Value Positioning)

### 1. **Founder First**
- Lead with Sleekware founder identity
- Shows entrepreneurial ambition
- Not "just" an employee

### 2. **Leadership Language**
- "Engineering Leader" not "Engineer"
- "Leading" not "working as"
- "Architecting" not "building"

### 3. **Business Impact**
- "For ambitious businesses"
- "Intentional software"
- Strategic focus

### 4. **Skills Through Context**
- FinTech = complex systems
- Piggyvest = scale & quality
- Sleekware = bespoke engineering
- No need to list technologies

### 5. **Photo Placement**
- Side profile = contemplative, strategic
- Facing left = directs attention to content
- Golden ratio = natural eye flow
- Professional but human

---

## Implementation Phases

### Phase 1: Structure & Layout ✅
- Set up golden ratio grid
- Position photo area
- Create card containers

### Phase 2: Content & Photo
- Add final bio copy
- Insert profile photo
- Populate experience section

### Phase 3: Polish
- Refine typography
- Add subtle hover states
- Perfect spacing
- Test responsiveness

---

## Next Steps

1. **Approve this executive positioning?**
2. **Do you have a side profile photo ready?**
   - If not, we can plan the photo session
3. **Finalize exact bio wording?**
4. **Ready to build?**

This positions you as a **founder and engineering leader** who happens to work at Piggyvest, not just an employee. The photo adds personality and humanity while maintaining executive presence.

Thoughts?
