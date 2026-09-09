<script setup lang="ts">
import { onMounted } from "vue";
import { gsap } from "gsap";

const { bioSegments } = useBioContent();

useHead({
  title: "Overcomer Emiator - Founder & Engineering Leader",
  meta: [
    {
      name: "description",
      content:
        "Founder of Sleekware. Building intentional software for ambitious businesses. Currently leading frontend engineering at Piggyvest.",
    },
  ],
});

onMounted(() => {
  // Light switch effect - make the lighting come alive
  const photoContainer = document.querySelector(".photo-container");
  const profilePhoto = document.querySelector(".profile-photo");

  if (photoContainer && profilePhoto) {
    // Start with no light
    gsap.set(photoContainer, { "--light-opacity": 0 });
    gsap.set(profilePhoto, { "--shadow-opacity": 0 });

    // After 1 second, turn on the light with a soft fade
    gsap
      .timeline({ delay: 1 })
      .to(photoContainer, {
        "--light-opacity": 1,
        duration: 2,
        ease: "power2.inOut",
      })
      .to(
        profilePhoto,
        {
          "--shadow-opacity": 1,
          duration: 2,
          ease: "power2.inOut",
        },
        "-=1.5",
      ); // Overlap with the backlight animation
  }
});
</script>

<template>
  <div class="business-card">
    <!-- Header -->
    <header class="card-header">
      <div class="header-content">
        <!-- Empty for now -->
      </div>
    </header>

    <!-- Body with Golden Ratio Split -->
    <main class="card-body">
      <!-- Left Side (61.8%) - Text -->
      <div class="body-left">
        <div>
          <h2 class="body-left__text">
            Overcomer<br />
            Emiator
          </h2>
          <p class="body-left__bio">
            <template v-for="(segment, index) in bioSegments" :key="index">
              <AppTooltip 
                v-if="segment.type === 'power-word'" 
                :label="segment.tooltip!"
              >
                <strong class="power-word">{{ segment.text }}</strong>
              </AppTooltip>
              <span v-else>{{ segment.text }}</span>
            </template>
          </p>

          <!-- CTAs -->
          <div class="body-left__ctas">
            <a
              href="#"
              target="_blank"
              rel="noopener"
              class="cta-button cta-button--primary"
            >
              Schedule a Call
            </a>
            <a
              href="mailto:overcomer@emiator.com"
              class="cta-button cta-button--secondary"
            >
              Contact Me
            </a>
          </div>

          <!-- Social Links -->
          <div class="body-left__socials">
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

      <!-- Right Side (38.2%) - Photo -->
      <div class="body-right">
        <div class="photo-container">
          <img
            src="/half-side-profile.png"
            alt="Overcomer Emiator - Side Profile"
            class="profile-photo"
          />
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="card-footer">
      <div class="footer-content">
        <a href="mailto:overcomer@emiator.com" class="footer__email">
          overcomer@emiator.com
        </a>
        <p class="footer__attribution">
          Made with <Icon name="lucide:heart" class="heart" /> by
          <a
            href="https://sleekware.com"
            target="_blank"
            rel="noopener"
            class="footer__link"
            >Sleekware</a
          >
        </p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
// Golden Ratio Constants
$phi: 1.618;
$phi-inverse: 0.618;

// Layout proportions
$col-large: 61.8%;
$col-small: 38.2%;

// Viewport heights
$header-height: 8vh;
$body-height: 82vh;
$footer-height: 10vh;

// Page max-width
$page-max-width: 1400px;

.business-card {
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  background: $bg-color;
  color: $text-color;
  overflow: hidden;
}

// ============================================
// HEADER
// ============================================
.card-header {
  height: $header-height;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
}

.header-content {
  max-width: $page-max-width;
  height: 100%;
  margin: 0 auto;
  padding: 0 clamp(2rem, 5vw, 4rem);
  display: flex;
  align-items: center;
}

.header__name {
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0;
}

// ============================================
// MAIN BODY
// ============================================
.card-body {
  height: $body-height;
  display: flex;
  gap: 1.5rem;
  padding: clamp(2rem, 4vw, 3rem);
  align-items: center;
  justify-content: center;
  overflow: hidden;
  max-width: $page-max-width;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
}

// Left Side (61.8%)
.body-left {
  flex: 0 0 $col-large;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 1024px) {
    flex: 1 1 auto;
  }

  &__text {
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

  &__bio {
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

// Right Side (38.2%)
.body-right {
  flex: 0 0 $col-small;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 1024px) {
    flex: 1 1 auto;
  }
}

.photo-container {
  width: 100%;
  height: 100%;
  max-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  --light-opacity: 0;

  @media (max-width: 1024px) {
    max-height: 50vh;
  }

  // Subtle backlight effect that animates in - more contained
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    background: radial-gradient(
      circle at 55% 45%,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.04) 25%,
      rgba(255, 255, 255, 0.01) 40%,
      transparent 60%
    );
    opacity: var(--light-opacity);
    pointer-events: none;
    z-index: 1;
    transition: opacity 0.3s ease;
  }
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  position: relative;
  z-index: 2;
  --shadow-opacity: 0;
  filter: drop-shadow(
      0 0 calc(40px * var(--shadow-opacity))
        rgba(255, 255, 255, calc(0.06 * var(--shadow-opacity)))
    )
    drop-shadow(
      0 0 calc(20px * var(--shadow-opacity))
        rgba(255, 255, 255, calc(0.03 * var(--shadow-opacity)))
    );
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.02);
  }
}

// ============================================
// FOOTER
// ============================================
.card-footer {
  height: $footer-height;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
    padding: 0 1.5rem;
  }
}

.footer-content {
  max-width: $page-max-width;
  height: 100%;
  margin: 0 auto;
  padding: 0 clamp(2rem, 5vw, 4rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer__email {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: $text-color;
  }
}

.footer__attribution {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
}

.footer__link {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: $text-color;
  }
}

.heart {
  display: inline-block;
  animation: heartbeat 1.5s ease-in-out infinite;
  color: #ff4444;
  vertical-align: middle;

  :deep(svg) {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
}

@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  10%,
  30% {
    transform: scale(1.1);
  }
  20%,
  40% {
    transform: scale(1);
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
