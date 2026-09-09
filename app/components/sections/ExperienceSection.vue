<script setup lang="ts">
// Real experience data from LinkedIn
const experiences = ref([
  {
    id: 1,
    title: 'Founder & CEO',
    company: 'Sleekware',
    period: 'Present',
    description: 'Building intentional software systems for ambitious businesses. Leading product development and technical strategy.',
  },
  {
    id: 2,
    title: 'Frontend Engineer',
    company: 'Piggyvest',
    period: 'Dec 2021 - Present',
    location: 'Lagos, Nigeria',
    description: 'Building scalable fintech solutions for one of Africa\'s leading savings platforms. Working with Vue.js, Nuxt.js, and modern web technologies to deliver user-centric financial products.',
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'TransferXO',
    period: '2020 - 2021',
    description: 'Led admin frontend application development and marketing website revamp. Built robust interfaces using Vue.js/Nuxt.js, SCSS, and GSAP. Implemented key features for the exchange application.',
  },
  {
    id: 4,
    title: 'Frontend Developer',
    company: 'Scelloo',
    period: '2019 - 2020',
    description: 'Developed user-centric web applications with focus on clean architecture and scalable solutions.',
  },
  {
    id: 5,
    title: 'Frontend Developer',
    company: 'Mulaa',
    period: '2018 - 2019',
    description: 'Built responsive web applications and contributed to frontend architecture decisions.',
  },
]);
</script>

<template>
  <div class="experience-section">
    <div class="experience-section__content">
      <h2 class="experience-section__title">
        Experience
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
  }

  &__title {
    font-size: clamp(2rem, 4vw, 4rem); // Reduced from 2.5rem, 5vw, 5rem
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin: 0 0 2.5rem 0; // More spacing below title
    text-transform: uppercase;

    @media (max-width: 1024px) {
      font-size: clamp(2.5rem, 8vw, 4rem);
    }
  }

  &__timeline {
    display: flex;
    flex-direction: column;
    gap: 2.5rem; // Increased spacing between items
  }
}

.timeline-item {
  padding-bottom: 2rem;
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
    margin-bottom: 1rem; // More space before description
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__description {
    font-size: 1rem;
    line-height: 1.7;
    color: $text-muted;
    margin: 0;
  }
}
</style>
