<script setup lang="ts">
const { bioSegments } = useBioContent();
</script>

<template>
  <div class="bio-section">
    <div class="bio-section__content">
      <h2 class="bio-section__title">
        Overcomer<br />
        Emiator
      </h2>
      
      <p class="bio-section__text">
        <ClientOnly fallback-tag="span">
          <template v-for="(segment, index) in bioSegments" :key="index">
            <AppTooltip 
              v-if="segment.type === 'power-word'" 
              :label="segment.tooltip!"
            >
              <strong class="power-word">{{ segment.text }}</strong>
            </AppTooltip>
            <span v-else>{{ segment.text }}</span>
          </template>
          <template #fallback>
            <template v-for="(segment, index) in bioSegments" :key="'fallback-' + index">
              <strong v-if="segment.type === 'power-word'" class="power-word">{{ segment.text }}</strong>
              <span v-else>{{ segment.text }}</span>
            </template>
          </template>
        </ClientOnly>
      </p>

      <!-- Social Links & Get in Touch side by side -->
      <div class="bio-section__footer">
        <div class="bio-section__socials">
          <a
            href="https://linkedin.com/in/overcomer-emiator-5573141b2"
            target="_blank"
            rel="noopener"
            class="social-link"
          >
            <Icon name="lucide:linkedin" />
          </a>
          <a
            href="https://instagram.com/ovemiator"
            target="_blank"
            rel="noopener"
            class="social-link"
          >
            <Icon name="lucide:instagram" />
          </a>
          <a
            href="https://github.com/Xceldeveloper"
            target="_blank"
            rel="noopener"
            class="social-link"
            aria-label="GitHub"
          >
            <Icon name="lucide:github" />
          </a>
          <a
            href="https://x.com/ovemiator"
            target="_blank"
            rel="noopener"
            class="social-link"
            aria-label="X"
          >
            <Icon name="simple-icons:x" />
          </a>
        </div>

        <!-- Get in Touch CTA -->
        <a
          href="mailto:overcomer@emiator.com"
          class="cta-link"
        >
          Get in Touch
          <Icon name="lucide:arrow-right" class="cta-arrow" />
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bio-section {
  width: 100%;

  &__content {
    max-width: 650px;
  }

  &__title {
    font-size: clamp(2rem, 4vw, 4rem); // Reduced from 2.5rem, 5vw, 5rem
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin: 0 0 1.5rem 0;
    text-transform: uppercase;

    @media (max-width: 1024px) {
      font-size: clamp(2.5rem, 8vw, 4rem);
    }
  }

  &__text {
    font-size: clamp(0.95rem, 1.15vw, 1.15rem); // Reduced from 1rem, 1.25vw, 1.25rem
    line-height: 1.6;
    color: $text-muted;
    margin: 0 0 2.75rem 0;
    max-width: 650px;

    strong {
      font-weight: 600;
      color: $text-color;
    }

    .power-word {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: help;
      padding: 2px 4px;
      border-radius: 3px;

      &:hover {
        background-color: #ffffff;
        color: #000000;
      }
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 0;
    gap: 1.75rem;
    flex-wrap: wrap;
  }

  &__socials {
    display: flex;
    gap: 1.25rem;
  }
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.5);
    transition: width 0.3s ease;
  }

  .cta-arrow {
    transition: transform 0.3s ease;
    width: 0.9rem;
    height: 0.9rem;
    opacity: 0.7;
  }

  &:hover {
    color: rgba(255, 255, 255, 0.85);

    &::after {
      width: calc(100% - 1.35rem); // Exclude arrow width
    }

    .cta-arrow {
      transform: translateX(4px);
      opacity: 1;
    }
  }
}

.social-link {
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  :deep(svg) {
    width: 1.75rem; // Increased from 1.5rem
    height: 1.75rem;
  }

  &:hover {
    color: $text-color;
    transform: translateY(-2px);
  }
}
</style>
