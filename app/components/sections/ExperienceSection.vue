<script setup lang="ts">
// Role timeline (shown under Impact)
const experiences = ref([
  {
    id: 1,
    title: 'Founder & CEO',
    company: 'Sleekware',
    period: 'Present',
    description:
      'Turning ambitious product ideas into intentional software systems—owning strategy, architecture, and delivery so businesses ship what actually moves the needle.',
  },
  {
    id: 2,
    title: 'Frontend Engineer',
    company: 'Piggyvest',
    period: 'Dec 2021 - Present',
    location: 'Lagos, Nigeria',
    description:
      'Helping millions of Africans save and invest with confidence—shipping reliable, user-centric interfaces on one of the continent\'s leading fintech platforms.',
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'TransferXO',
    period: '2020 - 2021',
    description:
      'Rebuilt the admin experience and marketing site so operators could move faster and customers could trust the product—core exchange flows included.',
  },
  {
    id: 4,
    title: 'Frontend Developer',
    company: 'Scelloo',
    period: '2019 - 2020',
    description:
      'Shipped product surfaces people could actually use—clean architecture that kept features moving without burying the team in accidental complexity.',
  },
  {
    id: 5,
    title: 'Frontend Developer',
    company: 'Mulaa',
    period: '2018 - 2019',
    description:
      'Laid early frontend foundations—responsive apps and architecture choices that made the next wave of product work cheaper and clearer.',
  },
]);
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
          <p class="timeline-item__description">{{ exp.description }}</p>
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

  &__description {
    font-size: 1rem;
    line-height: 1.72;
    color: $text-muted;
    margin: 0;
  }
}
</style>
