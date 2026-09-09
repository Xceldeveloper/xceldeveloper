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

      <!-- CTAs -->
      <div class="bio-section__ctas">
        <a
          href="#"
          target="_blank"
          rel="noopener"
          class="cta-button cta-button--primary"
        >
          Schedule a Call
        </a>
        <a href="mailto:overcomer@emiator.com" class="cta-button cta-button--secondary">
          Contact Me
        </a>
      </div>

      <!-- Social Links -->
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
        >
          <Icon name="lucide:github" />
        </a>
        <a
          href="https://twitter.com/xceldeveloper"
          target="_blank"
          rel="noopener"
          class="social-link"
        >
          <Icon name="simple-icons:x" />
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
    font-size: clamp(2.5rem, 5vw, 5rem);
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
    font-size: clamp(1rem, 1.25vw, 1.25rem);
    line-height: 1.6;
    color: $text-muted;
    margin: 0 0 1.5rem 0;
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

  &__ctas {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  &__socials {
    display: flex;
    gap: 1.25rem;
    margin-top: 1.5rem;
  }
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.938rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;

  &--primary {
    background: rgba(255, 255, 255, 0.1);
    color: $text-color;
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
  }

  &--secondary {
    background: transparent;
    color: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      color: $text-color;
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
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
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    color: $text-color;
    transform: translateY(-2px);
  }
}
</style>
