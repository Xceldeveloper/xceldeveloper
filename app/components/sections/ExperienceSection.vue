<script setup lang="ts">
type Experience = {
  id: number;
  title: string;
  company: string;
  period: string;
  location?: string;
  description: string | string[];
};

// Role timeline (shown under Impact)
const experiences = ref<Experience[]>([
  {
    id: 1,
    title: 'Founder & CEO',
    company: 'Sleekware',
    period: 'Present',
    description: [
      'The force behind Sleekware, a software agency that partners with growing and established organisations to build systems that simplify complexity and give teams clarity to scale.',
      'The company runs end to end from this seat: the work we take on, how we deliver, who we bring in, and how we show up for clients. Product and engineering direction, design standards, client conversations, and staying close enough to the build that what ships matches what the business actually needed.',
      'Websites, applications, operational products. Brand and product design beside the engineering. Same point every time: turn a real business problem into software people can run.',
    ],
  },
  {
    id: 2,
    title: 'Senior Frontend Engineer',
    company: 'Piggyvest',
    period: 'Dec 2021 - Present',
    location: 'Lagos, Nigeria',
    description: [
      'Building frontend platforms across the Piggytech ecosystem: Piggyvest, Pocket, Patronize, and Piggyvest Business. More than six million customers on the consumer side. I ship frontend web across those products, and I work with engineers and other teams on the surfaces I own, guiding how the frontend should come together and advising on implementation tradeoffs when a feature has to land cleanly.',
      'The work spans Pocket’s internal tooling, the Pocket payment SDK and checkout that businesses embed to plug into our payments, the Patronize dashboard where merchants confirm and track payments, Piggyvest’s website and internal tools, and the shared UI component library teams reuse so interfaces stay consistent across the house.',
      'At this scale, frontend is part of trust. Clear tools for the people running the products, payment surfaces partners can integrate, and UI millions of customers can rely on.',
    ],
  },
  {
    id: 3,
    title: 'Technical Co-founder',
    company: 'Property',
    period: '2024 - 2025',
    description: [
      'Technical co-founder on Property, a Nigerian real-estate marketplace built from the ground up. Homes to buy, places to rent, and short-lets in the Airbnb sense: search by area, map and filters, listing pages, saved search, messaging, and the tools sellers, hosts, and agents need to put inventory on the market.',
      'I led product and development. Engineering and design answered to that lead: what we built, how it worked, how it looked. I set direction for the engineers and designers on the team, made the hard calls when the product had to choose a path, and stayed in the build until Property was a real marketplace, not a pitch.',
      'Leading that end to end, from blank slate to a working housing platform for Nigeria, is the work.',
    ],
  },
  {
    id: 4,
    title: 'Frontend Architect',
    company: 'Hyphen',
    period: '2021 - 2024',
    description: [
      'Brought into Hyphen to own the systems that made the product configurable: forms and workflows. Worked across the platform dashboard with the team. Those two pieces were largely mine: how businesses collected information, and how they ran the work after that.',
      'Built the form builder from the ground up. Someone could design a form on screen, and the system turned that design into a real working form: fields, tables, rules that matched how the business operated. Different companies needed different shapes, so it had to stay flexible. Also built an SDK so other products could embed that same form system instead of starting over.',
      'Built the workflow builder the same way, from scratch. Companies used it to map how work actually moved: approvals, handoffs, steps that started when a form was submitted, moments where money or a decision had to wait for a person. Forms and workflows were meant to connect. Capture something once, and the flow knew what came next. Stop for approval when only a human should say yes.',
      'Both had to feel clear to people who were not engineers, and solid enough that the next odd request did not mean rebuilding everything.',
    ],
  },
  {
    id: 5,
    title: 'Frontend Engineer',
    company: 'TransferXO',
    period: '2022',
    description: [
      'Engaged to strengthen TransferXO’s frontend, I worked across the surface: internal tools for running the platform, the marketing website, and features on the exchange application customers use to convert and move money.',
      'I led building and maintaining the internal tools operators use every day. I led a full rebuild of the marketing website for clarity, speed on mobile, and animation that made the brand feel alive without getting in the way. And I shipped features on the exchange app itself: the flows customers touch when they trade or move money.',
      'When the platform needed more of that same work, I stayed on it. Same product, longer stretch, still building where it counted.',
    ],
  },
  {
    id: 6,
    title: 'Frontend Engineer',
    company: 'Scelloo',
    period: '2020 - 2021',
    description: [
      'Joined Scelloo to build frontend across a SaaS suite for how businesses run. HR, ERP, and CRM: forms, tables, dashboards, multi-step flows for onboarding, leave, and approvals, plus the quieter admin paths that keep a product usable.',
      'My deepest time was on Cloudenly, the cloud HR platform. People records, leave and approval paths, payroll-facing screens: people ops in one place instead of scattered chase. I also worked on MuleEx, the third-party logistics product: booking and tracking flows, operational UI where a missed state costs real money. And I shipped product surfaces for Scelloo’s clients when the work sat outside the core suite.',
      'Every screen had to earn its place in someone’s daily routine.',
    ],
  },
]);

function descriptionParagraphs(description: string | string[]): string[] {
  return Array.isArray(description) ? description : [description];
}
</script>

<template>
  <div class="experience-section" data-section="impact">
    <div class="experience-section__content">
      <h2 class="experience-section__title">
        Impact
      </h2>

      <div class="experience-section__timeline">
        <div
          v-for="exp in experiences"
          :key="exp.id"
          class="timeline-item"
        >
          <h3 class="timeline-item__title">{{ exp.title }}</h3>
          <div class="timeline-item__company">{{ exp.company }}</div>
          <div class="timeline-item__period">{{ exp.period }}</div>
          <div class="timeline-item__body">
            <p
              v-for="(para, index) in descriptionParagraphs(exp.description)"
              :key="index"
              class="timeline-item__description"
            >
              {{ para }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.experience-section {
  width: 100%;
  padding-bottom: 2rem; // Extra space at bottom

  &__content {
    max-width: 650px;

    @media (max-width: 1024px) {
      position: relative;
      z-index: 3; // One surface above sticky portrait
      background: $bg-color;
      padding: 0.75rem 0 1.5rem;
    }
  }

  &__title {
    font-size: clamp(2rem, 4vw, 4rem); // Reduced from 2.5rem, 5vw, 5rem
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin: 0 0 2.55rem 0;
    text-transform: uppercase;

    @media (max-width: 1024px) {
      font-size: clamp(2.5rem, 8vw, 4rem);
      margin-bottom: 2.35rem;
    }
  }

  &__timeline {
    display: flex;
    flex-direction: column;
    gap: 2.6rem;
  }
}

.timeline-item {
  padding-bottom: 2.05rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: $text-color;
    line-height: 1.3;
  }

  &__company {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.25rem;
    font-weight: 500;
  }

  &__period {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 1.05rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  &__description {
    font-size: 1rem;
    line-height: 1.72;
    color: $text-muted;
    margin: 0;
  }
}
</style>
