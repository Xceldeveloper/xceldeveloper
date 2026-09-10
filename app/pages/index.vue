<script setup lang="ts">
import { onMounted, ref, onUnmounted, watch, nextTick, computed, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import BioSection from "~/components/sections/BioSection.vue";
import ExperienceSection from "~/components/sections/ExperienceSection.vue";

const sections = ["bio", "experience"] as const;
type Section = (typeof sections)[number];

const currentSection = ref<Section>("bio");
const contentOffset = ref(0);
const isDesktop = ref(
  typeof window !== "undefined"
    ? window.matchMedia("(min-width: 1025px)").matches
    : true,
);
const isCalculating = ref(true); // Loading state for drawer
const shouldCenterAlign = ref(false); // Track if content should be centered
const isSectionTransitioning = ref(false); // Track section transitions
let resizeObserver: ResizeObserver | null = null; // Watch for content size changes

const isLastSection = computed(
  () => currentSection.value === sections[sections.length - 1],
);
const showScrollIndicator = computed(
  () =>
    isDesktop.value &&
    !isLastSection.value &&
    !isSectionTransitioning.value,
);

/** Mobile: true while the bio hero name is still visible */
const isBioTitleInView = ref(true);
let bioTitleObserver: IntersectionObserver | null = null;

const showHeaderName = computed(() => {
  if (isDesktop.value) return currentSection.value !== "bio";
  return !isBioTitleInView.value;
});

const showHeaderCta = computed(() => {
  if (isDesktop.value) return currentSection.value !== "bio";
  return true; // Icon CTA always available on mobile
});

const observeBioTitle = () => {
  bioTitleObserver?.disconnect();
  bioTitleObserver = null;

  if (typeof window === "undefined" || isDesktop.value) {
    isBioTitleInView.value = true;
    return;
  }

  const title = document.querySelector(".bio-section__title");
  if (!title) {
    isBioTitleInView.value = true;
    return;
  }

  bioTitleObserver = new IntersectionObserver(
    ([entry]) => {
      isBioTitleInView.value = Boolean(entry?.isIntersecting);
    },
    {
      // Treat as out of view once it scrolls under the fixed header
      root: null,
      threshold: 0,
      rootMargin: "-10% 0px 0px 0px",
    },
  );
  bioTitleObserver.observe(title);
};

useHead({
  title: "Overcomer Emiator",
  meta: [
    {
      name: "description",
      content:
        "Overcomer Emiator — builder and solution architect. Founder of Sleekware.",
    },
  ],
});

// Calculate content offset based on image position
const calculateContentOffset = () => {
  const profilePhoto = document.querySelector(
    ".profile-photo",
  ) as HTMLImageElement;
  const contentContainer = document.querySelector(".body-left__content");
  const cardBody = document.querySelector(".card-body");
  const activeSection =
    currentSection.value === "bio"
      ? document.querySelector(".bio-section")
      : document.querySelector(".experience-section");
  const mediaQuery = window.matchMedia("(min-width: 1025px)");

  isDesktop.value = mediaQuery.matches;

  if (!isDesktop.value) {
    contentOffset.value = 0;
    shouldCenterAlign.value = false;
    if (isCalculating.value) {
      setTimeout(() => {
        isCalculating.value = false;
      }, 1400);
    }
    nextTick(() => observeBioTitle());
    return;
  }

  // Leaving mobile — reset header name gate
  isBioTitleInView.value = true;
  bioTitleObserver?.disconnect();
  bioTitleObserver = null;

  if (profilePhoto && contentContainer && cardBody && activeSection) {
    const photoRect = profilePhoto.getBoundingClientRect();
    const bodyRect = cardBody.getBoundingClientRect();

    // Get ACTUAL content height (the section itself, not the container)
    const sectionHeight = activeSection.scrollHeight;
    const availableHeight = bodyRect.height;

    // Check if content needs scrolling (content taller than container)
    const needsScroll = sectionHeight > availableHeight * 0.8;

    if (needsScroll) {
      // Long content: Eye-level alignment (10% below image top)
      const imageTopRelativeToBody = photoRect.top - bodyRect.top;
      const eyeLevelOffset = imageTopRelativeToBody + photoRect.height * 0.1;

      contentOffset.value = eyeLevelOffset;
      shouldCenterAlign.value = false;
    } else {
      // Short content: Center alignment (CSS handles it)
      contentOffset.value = 0;
      shouldCenterAlign.value = true;
    }

    // Hold splash long enough for brand mark to land, then lift curtain
    if (isCalculating.value) {
      setTimeout(() => {
        isCalculating.value = false;
      }, 1400);
    }
  }
};

// Wheel event handler
let isScrolling = false;
const handleWheel = (e: WheelEvent) => {
  if (isScrolling || !isDesktop.value || isSectionTransitioning.value) {
    return;
  }

  // Get the scrollable content container
  const contentContainer = document.querySelector(".body-left__content");
  if (!contentContainer) return;

  const scrollTop = contentContainer.scrollTop;
  const scrollHeight = contentContainer.scrollHeight;
  const clientHeight = contentContainer.clientHeight;
  const isAtTop = scrollTop === 0;
  const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;

  // Only switch sections when at scroll boundaries
  let shouldSwitch = false;
  let targetSection: Section = currentSection.value;
  const currentIndex = sections.indexOf(currentSection.value);

  if (e.deltaY > 0) {
    // Scrolling DOWN — next section when at bottom
    if (isAtBottom && currentIndex < sections.length - 1) {
      shouldSwitch = true;
      targetSection = sections[currentIndex + 1];
    }
  } else if (e.deltaY < 0) {
    // Scrolling UP — previous section when at top
    if (isAtTop && currentIndex > 0) {
      shouldSwitch = true;
      targetSection = sections[currentIndex - 1];
    }
  }

  if (!shouldSwitch) {
    return;
  }

  // Start fade-out transition
  isSectionTransitioning.value = true;

  // Switch section after a brief moment (during fade-out)
  setTimeout(() => {
    currentSection.value = targetSection;
  }, 200);

  // Set debounce AFTER switching
  isScrolling = true;
  setTimeout(() => {
    isScrolling = false;
  }, 800);
};

onMounted(() => {
  // Safety: never leave splash stuck if layout/photo load stalls
  const splashFallback = window.setTimeout(() => {
    isCalculating.value = false;
  }, 4000);

  // Light switch effect - make the lighting come alive
  const photoContainer = document.querySelector(".photo-container");
  const profilePhoto = document.querySelector(
    ".profile-photo",
  ) as HTMLImageElement;

  if (photoContainer && profilePhoto) {
    // Start with no light
    gsap.set(photoContainer, { "--light-opacity": 0 });
    gsap.set(profilePhoto, { "--shadow-opacity": 0 });

    // Wait for image to load before calculating
    if (profilePhoto.complete) {
      // Use requestAnimationFrame to ensure layout is complete
      requestAnimationFrame(() => {
        calculateContentOffset();
      });
    } else {
      profilePhoto.addEventListener("load", () => {
        setTimeout(() => {
          requestAnimationFrame(() => {
            calculateContentOffset();
          });
        }, 100);
      });
    }

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
  } else {
    calculateContentOffset();
  }

  // Set up ResizeObserver to watch for content size changes
  const contentContainer = document.querySelector(".body-left__content");
  if (contentContainer) {
    resizeObserver = new ResizeObserver(() => {
      calculateContentOffset();
    });
    resizeObserver.observe(contentContainer);
  }

  // Recalculate on resize (no loader)
  const mediaQuery = window.matchMedia("(min-width: 1025px)");
  mediaQuery.addEventListener("change", () => {
    calculateContentOffset();
  });
  window.addEventListener("resize", () => {
    calculateContentOffset();
  });

  // Attach wheel event listener
  window.addEventListener("wheel", handleWheel, { passive: true });

  nextTick(() => observeBioTitle());

  onBeforeUnmount(() => {
    window.clearTimeout(splashFallback);
  });
});

// Watch for section changes to recalculate alignment (no loader)
watch(currentSection, () => {
  // Wait for DOM to update with new section
  nextTick(() => {
    // Recalculate positioning while faded out
    setTimeout(() => {
      calculateContentOffset();
      observeBioTitle();

      // End transition (fade back in) after positioning is set
      setTimeout(() => {
        isSectionTransitioning.value = false;
      }, 100);
    }, 50);
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", calculateContentOffset);
  window.removeEventListener("wheel", handleWheel);
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  bioTitleObserver?.disconnect();
  bioTitleObserver = null;
});
</script>

<template>
  <div class="business-card">
    <!-- Splash curtain (BIP / Buque pattern) -->
    <Transition name="curtain">
      <div
        v-if="isCalculating"
        class="app-curtain"
        role="status"
        aria-live="polite"
        aria-label="Loading"
      >
        <div class="app-curtain__center">
          <img
            class="app-curtain__img"
            src="/theovercomer.png"
            alt="The Overcomer"
            width="280"
            height="280"
            decoding="async"
            fetchpriority="high"
          />
        </div>
      </div>
    </Transition>

    <!-- Header -->
    <header class="card-header">
      <div class="header-content">
        <Transition name="fade">
          <h2 v-if="showHeaderName" class="header-name">
            Overcomer Emiator
          </h2>
        </Transition>

        <Transition name="fade">
          <div v-if="showHeaderCta" class="header-actions">
            <a
              v-if="!isDesktop"
              href="#"
              target="_blank"
              rel="noopener"
              class="header-cta header-cta--icon"
              aria-label="Schedule Me"
            >
              <Icon name="lucide:calendar" class="header-cta__icon" />
            </a>
            <a
              href="mailto:overcomer@emiator.com"
              class="header-cta"
              :class="{ 'header-cta--icon': !isDesktop }"
              aria-label="Get in Touch"
            >
              <Icon
                v-if="!isDesktop"
                name="lucide:mail"
                class="header-cta__icon"
              />
              <template v-else>
                Get in Touch
                <Icon name="lucide:arrow-right" class="cta-arrow" />
              </template>
            </a>
          </div>
        </Transition>
      </div>
    </header>

    <!-- Body with 62/38 Split -->
    <main class="card-body">
      <!-- Left Side (62%) - Scrollable Sections -->
      <div class="body-left" :class="{ 'eye-level': !shouldCenterAlign }">
        <!-- Scroll fade overlays for smooth content edges -->
        <div class="scroll-fade-overlay scroll-fade-top"></div>
        <div class="scroll-fade-overlay scroll-fade-bottom"></div>
        
        <div
          class="body-left__content"
          :class="{ transitioning: isSectionTransitioning }"
          :style="{
            paddingTop:
              isDesktop && contentOffset > 0 ? `${contentOffset}px` : '0',
          }"
        >
          <!-- Desktop: one section at a time. Mobile: stack all and page-scroll -->
          <template v-if="isDesktop">
            <BioSection v-if="currentSection === 'bio'" />
            <ExperienceSection v-if="currentSection === 'experience'" />
          </template>
          <template v-else>
            <BioSection />
            <ExperienceSection class="mobile-stacked-section" />
          </template>
        </div>

        <!-- Scroll Indicator -->
        <Transition name="indicator-fade">
          <div
            v-if="showScrollIndicator"
            class="scroll-indicator"
          >
            <div class="scroll-indicator__icon">
              <Icon name="lucide:chevrons-down" />
            </div>
            <span class="scroll-indicator__text">Scroll</span>
          </div>
        </Transition>
      </div>

      <!-- Right Side (38%) - Fixed Photo -->
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
        <!-- Left: Calendly link -->
        <a
          href="#"
          target="_blank"
          rel="noopener"
          class="footer__schedule"
        >
          <Icon name="lucide:calendar" class="calendar-icon" />
          Schedule Me
        </a>

        <!-- Right: Made with love -->
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

// Layout proportions (closer to golden ratio)
$col-large: 62%; // Left content area
$col-small: 38%; // Right image area

// Viewport heights
$header-height: 8vh;
$body-height: 82vh;
$footer-height: 10vh;

// Page max-width
$page-max-width: 1400px;

// Image max-width (prevents it from getting too large on ultra-wide screens)
$image-max-width: 420px; // Reduced from 500px

.business-card {
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  background: $bg-color;
  color: $text-color;
  overflow: hidden;

  // Mobile: page can scroll so footer is not locked to the viewport
  @media (max-width: 1024px) {
    max-height: none;
    overflow: visible;
    padding-top: $header-height; // room for fixed header
  }
}

// ============================================
// SPLASH CURTAIN
// ============================================
.app-curtain {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
}

.app-curtain__center {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-curtain__img {
  display: block;
  width: min(280px, 55vw);
  height: auto;
  animation: curtain-logo-enter 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.curtain-leave-active {
  transition: transform 0.72s cubic-bezier(0.76, 0, 0.24, 1);
}

.curtain-leave-active .app-curtain__center {
  opacity: 0;
  transition: opacity 0.18s ease;
}

.curtain-leave-to {
  transform: translateY(-100%);
}

@keyframes curtain-logo-enter {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(6px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

// ============================================
// HEADER
// ============================================
.card-header {
  height: $header-height;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: $bg-color;
  }

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
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0;
  }
}

.header-name {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: $text-color;
  margin: 0;
  opacity: 0.9;
  transition: opacity 0.3s ease;
  min-width: 0;

  @media (max-width: 1024px) {
    font-size: clamp(0.95rem, 3.6vw, 1.15rem);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    opacity: 1;
  }
}

.header-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    padding: 0.4rem 0.85rem;
    font-size: 0.75rem;
    gap: 0.35rem;

    .cta-arrow {
      width: 0.8rem;
      height: 0.8rem;
    }

    &--icon {
      width: 2.25rem;
      height: 2.25rem;
      padding: 0;
      justify-content: center;
      border-radius: 999px;
    }

    .header-cta__icon {
      width: 1.1rem;
      height: 1.1rem;
      opacity: 0.85;
    }
  }

  .cta-arrow {
    transition: transform 0.3s ease;
    width: 0.9rem;
    height: 0.9rem;
    opacity: 0.7;
  }

  &:hover {
    color: rgba(255, 255, 255, 0.95);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.22);

    .cta-arrow {
      transform: translateX(3px);
      opacity: 1;
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

// ============================================
// MAIN BODY
// ============================================
.card-body {
  height: $body-height;
  display: flex;
  gap: 1.5rem;
  padding: clamp(2rem, 4vw, 3rem);
  align-items: flex-start; // Changed from center to flex-start for eye-level alignment
  justify-content: center;
  overflow: visible; // Changed from hidden to visible to allow scrolling
  max-width: $page-max-width;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 1024px) {
    height: auto;
    max-height: none;
    flex-direction: column;
    gap: 0; // Real overlap — gap was canceling the pull-up
    overflow: visible;
    align-items: center; // Center on mobile
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
}

// Left Side (61.8%) - Content Area
.body-left {
  flex: 1 1 auto; // Changed from fixed to flexible - takes remaining space
  display: flex;
  align-items: center; // Center by default for short content
  justify-content: center; // Also center horizontally
  min-height: 100%; // Take full height to enable centering
  position: relative; // For absolute positioned fade overlays

  // Eye-level alignment when content is long (controlled by Vue)
  &.eye-level {
    align-items: flex-start;
    justify-content: flex-start;
  }

  @media (max-width: 1024px) {
    flex: 1 1 auto;
    min-height: 0;
    order: 2; // Content after image on mobile
    align-items: stretch;
    justify-content: flex-start;
    // No z-index / isolation — children must interleave with .body-right
    position: relative;
    z-index: auto;
    width: 100%;
    background: transparent;
    // Light tuck under portrait
    margin-top: -2.85rem;
  }

  &__content {
    width: 100%;
    max-height: calc(82vh - 2rem); // Reduced slightly to ensure footer is always visible
    overflow-y: auto; // Enable vertical scrolling
    overflow-x: hidden;
    padding-right: 1rem;
    padding-bottom: 2rem;
    transition:
      padding-top 0.4s ease,
      opacity 0.4s ease; // Smooth fade transition
    will-change: padding-top, opacity; // Optimize for transitions
    opacity: 1; // Default visible

    @media (max-width: 1024px) {
      max-height: none;
      overflow: visible;
      min-height: 0;
      padding-right: 0;
      // will-change/opacity stacking context blocks z-index under the image
      will-change: auto;
    }

    :deep(.mobile-stacked-section) {
      @media (max-width: 1024px) {
        margin-top: 3rem;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
      }
    }

    // Fade out during transition
    &.transitioning {
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    // Ensure minimum visibility
    min-height: 300px;

    // Custom scrollbar styling (works on all browsers)
    // Firefox
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;

    // Webkit (Chrome, Safari, Edge)
    &::-webkit-scrollbar {
      width: 8px; // Slightly wider for better visibility
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 10px;
      margin: 4px 0;
    }

    &::-webkit-scrollbar-thumb {
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.4) 0%,
        rgba(255, 255, 255, 0.25) 100%
      );
      border-radius: 10px;
      border: 2px solid transparent;
      background-clip: padding-box;
      transition: background 0.2s ease;

      &:hover {
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.6) 0%,
          rgba(255, 255, 255, 0.4) 100%
        );
      }

      &:active {
        background: rgba(255, 255, 255, 0.7);
      }
    }
  }
}

// ============================================
// SCROLL FADE OVERLAYS (for smooth content edges)
// ============================================
.scroll-fade-overlay {
  position: absolute;
  left: 0;
  right: 0;
  height: 60px;
  pointer-events: none;
  z-index: 5;
  transition: opacity 0.3s ease;

  @media (max-width: 1024px) {
    display: none; // Page scroll replaces inner pane on mobile
  }
}

.scroll-fade-top {
  top: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.8) 20%,
    rgba(0, 0, 0, 0) 100%
  );
}

.scroll-fade-bottom {
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.8) 20%,
    rgba(0, 0, 0, 0) 100%
  );
}

// ============================================
// FADE TRANSITION (for header name)
// ============================================
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

// ============================================
// SCROLL INDICATOR
// ============================================
.scroll-indicator {
  position: fixed;
  bottom: calc(#{$footer-height} + 0.75rem);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  pointer-events: none;
  z-index: 100;
  animation: float 2s ease-in-out infinite;

  &__icon {
    color: rgba(255, 255, 255, 0.4);
    font-size: 1.25rem; // Slightly smaller

    :deep(svg) {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  &__text {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 500;
  }

  @media (max-width: 1024px) {
    bottom: calc(#{$footer-height} + 0.5rem);
    display: none; // Page scroll replaces section switching on mobile
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-6px);
  }
}

// Indicator fade transition
.indicator-fade-enter-active,
.indicator-fade-leave-active {
  transition: opacity 0.5s ease;
}

.indicator-fade-enter-from,
.indicator-fade-leave-to {
  opacity: 0;
}

// Section transitions
.section-fade-enter-active,
.section-fade-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.section-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.section-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

// Right Side (30%) - Fixed Photo
.body-right {
  flex: 0 0 auto; // Changed from $col-small to auto - takes only needed space
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  height: 100%;
  max-height: $body-height;
  width: min($col-small, $image-max-width); // Use whichever is smaller
  @media (max-width: 1024px) {
    flex: 0 0 auto;
    order: 1; // Image first on mobile
    position: sticky;
    top: $header-height; // Sit under fixed header
    z-index: 2; // Above the name, below raised content
    height: auto;
    max-height: none;
    width: 100%;
    align-self: stretch;
    pointer-events: none; // Let taps pass to content under transparent areas
  }
}

.photo-container {
  width: 100%;
  height: fit-content;
  max-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  border-radius: 8px;
  position: relative;
  --light-opacity: 0;

  @media (max-width: 1024px) {
    max-height: min(52vh, 380px);
    height: auto;
    background: transparent;
    justify-content: flex-end; // Push portrait toward the right
    padding-right: 0.25rem;
  }

  // Subtle backlight effect that animates in - very soft, no sharp edges
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%; // Larger area
    height: 120%; // Larger area
    background: radial-gradient(
      ellipse at 35% 40%, // Moved to LEFT where face is (was 60% 40%)
      rgba(255, 255, 255, 0.04) 0%,
      rgba(255, 255, 255, 0.02) 15%,
      rgba(255, 255, 255, 0.01) 30%,
      rgba(255, 255, 255, 0.005) 45%,
      transparent 60%
    );
    opacity: var(--light-opacity);
    pointer-events: none;
    z-index: 1;
    transition: opacity 0.3s ease;
    filter: blur(40px); // Heavy blur to prevent sharp edges
  }
}

.profile-photo {
  width: 100%;
  height: auto;
  max-height: 82vh;
  max-width: $image-max-width; // Additional constraint for ultra-wide screens
  object-fit: contain;
  object-position: center top;
  position: relative;
  z-index: 2;
  --shadow-opacity: 0;
  // Softer rim light - won't reveal sharp edges
  filter: drop-shadow(
      0 0 calc(60px * var(--shadow-opacity))
        rgba(255, 255, 255, calc(0.03 * var(--shadow-opacity)))
    )
    drop-shadow(
      0 0 calc(30px * var(--shadow-opacity))
        rgba(255, 255, 255, calc(0.015 * var(--shadow-opacity)))
    );
  transition: transform 0.5s ease;

  @media (max-width: 1024px) {
    max-height: min(52vh, 380px);
    max-width: min(100%, 380px);
    margin-left: auto;
    transform: translateX(8%);
  }

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 1024px) {
    &:hover {
      transform: translateX(8%) scale(1.02);
    }
  }
}

// ============================================
// FOOTER
// ============================================
.card-footer {
  height: $footer-height;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  // Explicitly in document flow — not fixed/sticky (scrolls away on mobile)
  position: relative;

  @media (max-width: 1024px) {
    z-index: 3; // Stay above sticky portrait
    background: $bg-color;
  }

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

.footer__schedule {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.3s ease;

  .calendar-icon {
    width: 1rem;
    height: 1rem;
  }

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
  color: rgba(255, 255, 255, 0.55);
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
</style>
