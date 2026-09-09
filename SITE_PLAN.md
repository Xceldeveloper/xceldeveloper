# xceldeveloper Portfolio Site Plan

## Strategic Overview

**Core Concept:** A digital complementary card that seamlessly bridges two identities:
1. **Engineering Excellence** - Hireable senior frontend engineer
2. **Entrepreneurial Vision** - Sleekware founder with bespoke engineering philosophy

**Design Philosophy:** 
- Minimal, dark, sophisticated
- Intentional interactions (echoing Sleekware's "built with purpose")
- Smooth animations (showcasing GSAP expertise)
- Fast, performant (demonstrating technical competence)

---

## Site Structure

### 1. **Home / Landing**
**Purpose:** Immediate clarity on who you are and what you offer

**Content Hierarchy:**
```
Hero Section:
├─ "Overcomer Emiator"
├─ "Frontend Engineer & Founder"
├─ Short impactful tagline: "Building intentional software. For businesses. For products. For impact."
└─ Two CTAs: "View Work" | "About Sleekware"

Quick Stats (subtle, scrolling ticker or grid):
├─ 5+ years engineering
├─ Piggyvest (Current)
├─ Founded Sleekware
└─ 50+ projects shipped
```

**Design Notes:**
- Dark background with subtle gradient
- Gradient text for name (like current implementation)
- Micro-interactions on hover
- Smooth scroll indicators

---

### 2. **Work / Experience**
**Purpose:** Prove engineering credibility for hiring managers

**Sections:**

**2.1 Current Role**
- Piggyvest highlight (3+ years)
- FinTech engineering focus
- Key achievements/metrics if possible

**2.2 Selected Projects**
Format: Card-based showcase
- TransferXO admin frontend
- TransferXO marketing site revamp
- Exchange application features
- Notable Sleekware client work (if can be shared)
- Personal projects (vue-theme-manager, etc.)

Each project card:
```
├─ Thumbnail/screenshot
├─ Company/Project name
├─ Role & duration
├─ Tech stack badges (Vue, Nuxt, GSAP, etc.)
├─ 2-3 line impact statement
└─ Link (if available)
```

**2.3 Experience Timeline**
Clean, vertical timeline:
- Piggyvest (2021-Present)
- TransferXO
- Scelloo
- Mulaa
- Amenta AB
- Nodtransfer

---

### 3. **About**
**Purpose:** Tell the transition story + personal brand

**Content Flow:**

**3.1 The Engineer**
"Over 5 years architecting scalable, user-centric web applications. Specialized in Vue.js/Nuxt.js ecosystems with deep experience in React/Next.js. Currently building FinTech experiences at Piggyvest."

**3.2 The Founder**
"Founded Sleekware on the belief that every business deserves software built specifically for it—not adapted, but intentional. We practice bespoke engineering: understanding the business before writing code."

**3.3 The Philosophy**
- Quality over speed
- Intentional design
- Long-term thinking
- Business understanding drives technical decisions

**3.4 Personal Touch**
- Based in Abuja, Nigeria
- Passionate about Nigerian tech ecosystem
- Open source contributor
- Remote work advocate

---

### 4. **Sleekware**
**Purpose:** Business credibility + lead generation

**Content:**

**4.1 What is Sleekware**
"A software engineering studio building bespoke systems for businesses that refuse to compromise."

**4.2 The Approach**
- Discovery before code
- Built from understanding
- 2-year vision planning
- Intentional every decision

**4.3 Services** (if ready to share)
- Custom web application development
- Frontend architecture & engineering
- Technical consulting
- System design & planning

**4.4 Philosophy Showcase**
Pull quotes from LinkedIn posts:
> "Great software does not announce itself. It just works."
> "Every business deserves a system that was made for it."

**4.5 Contact/Inquiry**
- Simple form or email
- LinkedIn link
- "Let's discuss your build"

---

### 5. **Contact**
**Purpose:** Easy reach for both hiring managers and potential clients

**Options:**
- Email: [primary email]
- LinkedIn
- GitHub
- Twitter
- Location: Nigeria (Remote)

**Context selector:**
- "I'm hiring" → Engineer-focused message
- "I need software built" → Sleekware inquiry
- "Let's connect" → General

---

## Technical Stack (Already Set Up)

✅ Nuxt 4.3.1
✅ GSAP for animations
✅ Nuxt Icon
✅ VueUse composables
✅ SCSS with variables
✅ TypeScript

**Additional Considerations:**
- Nuxt Content (for blog/articles if needed)
- Email service (Resend, Nodemailer, etc.)
- Analytics (Umami, Plausible - privacy-focused)
- SEO optimization

---

## Design System

**Colors:**
```scss
// Dark theme
$bg-primary: #000000
$bg-secondary: #0a0a0a
$bg-tertiary: #151515

// Text
$text-primary: #ffffff
$text-secondary: #aaaaaa
$text-muted: #666666

// Accents (consider Sleekware brand colors if they exist)
$accent-primary: [define - maybe blue/green/purple]
$accent-gradient: linear-gradient(135deg, ...)
```

**Typography:**
- Headings: Clean sans-serif (Inter, SF Pro, or custom)
- Body: Readable sans-serif
- Code: Monospace for tech stack badges

**Spacing System:**
- Use consistent spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)

**Animations:**
- Page transitions
- Scroll-triggered reveals
- Hover micro-interactions
- Smooth cursor follow (optional, subtle)

---

## Key Differentiators

What makes this portfolio unique:

1. **Dual Identity Handling**
   - Not confusing, clearly bridges both
   - Hiring managers see engineer first
   - Business inquiries see founder/company

2. **Intentional = On Brand**
   - Every animation has purpose
   - Every section tells the story
   - Mirrors Sleekware philosophy

3. **Technical Showcase**
   - Site itself is proof of technical skill
   - Nuxt 4, GSAP, modern practices
   - Fast, accessible, beautiful

4. **Nigerian Tech Voice**
   - Proud Nigerian positioning
   - Remote-first mindset
   - Part of growing ecosystem

---

## Content Priorities

**Must Have (Phase 1):**
- ✅ Clear hero/identity
- ✅ Work experience section
- ✅ About section
- ✅ Contact methods
- ✅ Sleekware introduction

**Nice to Have (Phase 2):**
- Blog/articles (Nuxt Content)
- Case studies (detailed project breakdowns)
- Testimonials (from colleagues/clients)
- Resume download
- Dark/light mode toggle (start with dark only)

**Future Considerations:**
- Newsletter signup
- Speaking engagements
- Open source contributions showcase
- Reading list / recommendations

---

## SEO Strategy

**Target Keywords:**
- "Frontend Engineer Nigeria"
- "Vue.js Developer"
- "Nuxt.js Expert"
- "Software Engineering Lagos"
- "Bespoke Software Development Nigeria"
- "Sleekware"

**Meta Descriptions:**
- Homepage: "Overcomer Emiator - Frontend Engineer & Sleekware Founder. 5+ years building scalable web applications with Vue.js, Nuxt.js, React. Based in Nigeria."
- Work: "Portfolio of frontend engineering projects. Vue.js, Nuxt.js, React, GSAP. FinTech, SaaS, custom applications."
- Sleekware: "Sleekware - Bespoke software engineering studio. Custom web applications built from understanding your business. Nigeria-based."

---

## Success Metrics

**For Job Applications:**
- Hiring managers understand experience level immediately
- Clear technical expertise communication
- Easy access to GitHub, LinkedIn
- Downloadable resume (optional)

**For Business Inquiries:**
- Sleekware value proposition is clear
- Philosophy resonates with quality-focused clients
- Easy inquiry process
- Professional credibility established

**General:**
- Fast load time (<2s)
- Accessible (WCAG AA)
- Mobile responsive
- Memorable experience

---

## Next Steps

1. **Content Gathering**
   - Resume/CV details
   - Project screenshots
   - Company logos (if usable)
   - Sleekware brand assets

2. **Design Phase**
   - Finalize color palette
   - Create component designs
   - Animation planning

3. **Development Phases**
   - Phase 1: Home, About, Contact
   - Phase 2: Work section, Sleekware page
   - Phase 3: Blog, enhancements

4. **Launch Prep**
   - Domain setup
   - Hosting
   - Analytics
   - SEO optimization
