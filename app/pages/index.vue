<script setup lang="ts">
import { onMounted, ref, onUnmounted, watch, nextTick, computed, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import BioSection from "~/components/sections/BioSection.vue";
import ExperienceSection from "~/components/sections/ExperienceSection.vue";

const sections = ["bio", "impact"] as const;
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
let photoPinRaf = 0;

/** Pin desktop portrait to the right-column spacer — equal top/bottom gaps */
const pinDesktopPhoto = () => {
  if (typeof window === "undefined") return;
  const slot = document.querySelector(".body-right") as HTMLElement | null;
  const root = document.documentElement;
  if (!slot || !window.matchMedia("(min-width: 1025px)").matches) {
    root.style.removeProperty("--photo-left");
    root.style.removeProperty("--photo-width");
    root.style.removeProperty("--photo-height");
    root.style.removeProperty("--photo-top");
    return;
  }
  const rect = slot.getBoundingClientRect();
  const headerH =
    document.querySelector(".card-header")?.getBoundingClientRect().height ?? 0;
  const footerH =
    document.querySelector(".card-footer")?.getBoundingClientRect().height ?? 0;
  // Equal inset above and below inside the band between header and footer
  const band = Math.max(0, window.innerHeight - headerH - footerH);
  const gap = Math.round(band * 0.04); // ~4% breathing room, same top & bottom
  const height = Math.max(200, band - gap * 2);
  const top = Math.round(headerH + gap);
  root.style.setProperty("--photo-left", `${Math.round(rect.left)}px`);
  root.style.setProperty("--photo-width", `${Math.round(rect.width)}px`);
  root.style.setProperty("--photo-height", `${Math.round(height)}px`);
  root.style.setProperty("--photo-top", `${top}px`);
};

const schedulePhotoPin = () => {
  if (photoPinRaf) cancelAnimationFrame(photoPinRaf);
  photoPinRaf = requestAnimationFrame(() => {
    photoPinRaf = 0;
    pinDesktopPhoto();
  });
};

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
    document.documentElement.classList.remove("page-scroll-lock");
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
    // Get ACTUAL content height (the section itself, not the container)
    const sectionHeight = activeSection.scrollHeight;
    // Page scroll: compare against viewport body area, not growing card height
    const availableHeight =
      window.innerHeight -
      (document.querySelector(".card-header")?.getBoundingClientRect().height ??
        0) -
      (document.querySelector(".card-footer")?.getBoundingClientRect().height ??
        0);

    // Check if content needs scrolling (content taller than viewport body)
    const needsScroll = sectionHeight > availableHeight * 0.8;

    if (needsScroll) {
      // Eye-level start for Impact — slightly below the portrait's visual center line
      contentOffset.value = Math.round(window.innerHeight * 0.16);
      shouldCenterAlign.value = false;
    } else {
      contentOffset.value = 0;
      shouldCenterAlign.value = true;
    }

    document.documentElement.classList.toggle(
      "page-scroll-lock",
      shouldCenterAlign.value,
    );

    schedulePhotoPin();

    // Hold splash long enough for brand mark to land, then lift curtain
    if (isCalculating.value) {
      setTimeout(() => {
        isCalculating.value = false;
      }, 1400);
    }
  }
};

// Wheel event handler — page scroll; switch sections at document boundaries
let isScrolling = false;
const handleWheel = (e: WheelEvent) => {
  if (isScrolling || !isDesktop.value || isSectionTransitioning.value) {
    return;
  }

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = window.innerHeight;
  const isAtTop = scrollTop <= 1;
  const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 2;

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
    window.scrollTo({ top: 0, behavior: "auto" });
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

  // Recalculate when the active section's size changes — not the padded
  // content wrapper (padding updates would feedback-loop and shake sticky).
  const observeSectionSize = () => {
    resizeObserver?.disconnect();
    const section =
      currentSection.value === "bio"
        ? document.querySelector(".bio-section")
        : document.querySelector(".experience-section");
    if (!section) return;
    resizeObserver = new ResizeObserver(() => {
      calculateContentOffset();
    });
    resizeObserver.observe(section);
  };
  observeSectionSize();

  // Recalculate on resize (no loader)
  const mediaQuery = window.matchMedia("(min-width: 1025px)");
  mediaQuery.addEventListener("change", () => {
    calculateContentOffset();
    nextTick(() => observeSectionSize());
  });
  window.addEventListener("resize", () => {
    calculateContentOffset();
    schedulePhotoPin();
  });

  // Attach wheel event listener
  window.addEventListener("wheel", handleWheel, { passive: true });

  nextTick(() => {
    observeBioTitle();
    schedulePhotoPin();
  });

  onBeforeUnmount(() => {
    window.clearTimeout(splashFallback);
  });
});

// Watch for section changes to recalculate alignment (no loader)
watch(currentSection, () => {
  // Wait for DOM to update with new section
  nextTick(() => {
    if (isDesktop.value) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    // Recalculate positioning while faded out
    setTimeout(() => {
      calculateContentOffset();
      observeBioTitle();
      schedulePhotoPin();
      const section =
        currentSection.value === "bio"
          ? document.querySelector(".bio-section")
          : document.querySelector(".experience-section");
      if (resizeObserver && section) {
        resizeObserver.disconnect();
        resizeObserver.observe(section);
      }

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
  if (photoPinRaf) cancelAnimationFrame(photoPinRaf);
  document.documentElement.classList.remove("page-scroll-lock");
  document.documentElement.style.removeProperty("--photo-left");
  document.documentElement.style.removeProperty("--photo-width");
  document.documentElement.style.removeProperty("--photo-height");
  document.documentElement.style.removeProperty("--photo-top");
});
</script>

<template>
  <div
    class="business-card"
    :class="{ 'business-card--fit': isDesktop && shouldCenterAlign }"
  >
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
            draggable="false"
            @contextmenu.prevent
            @dragstart.prevent
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
              aria-label="Coffee Chat"
            >
              <Icon name="lucide:coffee" class="header-cta__icon" />
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
            <ExperienceSection v-if="currentSection === 'impact'" />
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
            draggable="false"
            @contextmenu.prevent
            @dragstart.prevent
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
          <Icon name="lucide:coffee" class="calendar-icon" />
          Coffee Chat
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

// Viewport chrome — matched so the portrait can sit with equal top/bottom air
$header-height: 8vh;
$footer-height: 8vh;
$body-height: 84vh;

// Page max-width
$page-max-width: 1400px;

// Shared horizontal inset — header, body, and footer must match
$page-inline-padding: clamp(2rem, 4vw, 3rem);

// Image max-width (prevents it from getting too large on ultra-wide screens)
$image-max-width: 420px; // Reduced from 500px

.business-card {
  min-height: 100dvh;
  max-height: none;
  display: flex;
  flex-direction: column;
  background: $bg-color;
  color: $text-color;
  overflow: visible;
  // Room for fixed header + footer (desktop); mobile footer stays in flow
  padding-top: $header-height;
  padding-bottom: $footer-height;

  @media (max-width: 1024px) {
    min-height: 100vh;
    padding-bottom: 0;
  }

  // Short sections (Bio): lock to the viewport so wheel only switches sections
  &--fit {
    height: 100dvh;
    max-height: 100dvh;
    overflow: hidden;
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
  user-select: none;
  -webkit-user-drag: none;
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: $bg-color;
}

.header-content {
  max-width: $page-max-width;
  height: 100%;
  margin: 0 auto;
  padding: 0 $page-inline-padding;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
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
  // Fill the area between fixed chrome without exceeding it (avoids bio overscroll)
  flex: 1 1 auto;
  min-height: calc(100dvh - #{$header-height} - #{$footer-height});
  height: auto;
  display: flex;
  gap: 1.5rem;
  padding: $page-inline-padding;
  align-items: flex-start;
  justify-content: center;
  overflow: visible;
  max-width: $page-max-width;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    min-height: 0;
    flex-direction: column;
    gap: 0; // Real overlap — gap was canceling the pull-up
    align-items: center; // Center on mobile
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
}

// Left Side (61.8%) - Content Area
.body-left {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  // Stretch within card-body only — do not add another viewport min-height
  align-self: stretch;
  min-height: 0;
  position: relative;

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
    max-height: none;
    overflow: visible;
    padding-right: 0;
    padding-bottom: 0;
    transition: opacity 0.4s ease;
    opacity: 1;
    min-height: 0;

    @media (max-width: 1024px) {
      padding-bottom: 1rem;
      will-change: auto;
    }

    :deep(.mobile-stacked-section) {
      @media (max-width: 1024px) {
        margin-top: 3.1rem;
        padding-top: 1.55rem;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
      }
    }

    // Fade out during transition
    &.transitioning {
      opacity: 0;
      transition: opacity 0.3s ease;
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
  display: none; // Page scroll — no inner pane fades
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

// Right Side — desktop: width spacer + fixed photo (constant viewport height)
.body-right {
  flex: 0 0 min(#{$col-small}, #{$image-max-width});
  width: min(#{$col-small}, #{$image-max-width});
  align-self: stretch;
  min-height: 1px;
  position: relative;
  pointer-events: none;

  @media (max-width: 1024px) {
    flex: 0 0 auto;
    order: 1;
    position: sticky;
    top: $header-height;
    z-index: 2;
    height: auto;
    max-height: none;
    width: 100%;
    align-self: stretch;
    min-height: 0;
    pointer-events: none;
  }
}

.photo-container {
  position: fixed;
  top: var(--photo-top, #{$header-height});
  left: var(--photo-left, auto);
  width: var(--photo-width, min(#{$col-small}, #{$image-max-width}));
  height: var(
    --photo-height,
    calc(100dvh - #{$header-height} - #{$footer-height})
  );
  max-height: var(
    --photo-height,
    calc(100dvh - #{$header-height} - #{$footer-height})
  );
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  border-radius: 8px;
  --light-opacity: 0;
  z-index: 40;
  pointer-events: none;
  transform: translateZ(0);
  backface-visibility: hidden;

  @media (max-width: 1024px) {
    position: relative;
    top: auto;
    left: auto;
    width: 100%;
    height: auto;
    max-height: min(52vh, 380px);
    z-index: auto;
    transform: none;
    backface-visibility: visible;
    background: transparent;
    justify-content: flex-end;
    padding-right: 0.25rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%;
    height: 120%;
    background: radial-gradient(
      ellipse at 35% 40%,
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
    filter: blur(40px);
  }
}

.profile-photo {
  width: 100%;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  object-position: center center;
  position: relative;
  z-index: 2;
  --shadow-opacity: 0;
  user-select: none;
  -webkit-user-drag: none;
  filter: drop-shadow(
      0 0 calc(60px * var(--shadow-opacity))
        rgba(255, 255, 255, calc(0.03 * var(--shadow-opacity)))
    )
    drop-shadow(
      0 0 calc(30px * var(--shadow-opacity))
        rgba(255, 255, 255, calc(0.015 * var(--shadow-opacity)))
    );
  transition: none;
  pointer-events: none;

  @media (max-width: 1024px) {
    height: auto;
    max-height: min(52vh, 380px);
    max-width: min(100%, 380px);
    margin-left: auto;
    object-position: center top;
    transform: translateX(8%);
    transition: transform 0.5s ease;
  }

  @media (min-width: 1025px) {
    &:hover {
      transform: none;
    }
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
  background: $bg-color;

  // Desktop: fixed while page scrolls. Mobile: stays in document flow.
  @media (min-width: 1025px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  @media (max-width: 1024px) {
    position: relative;
    z-index: 3; // Stay above sticky portrait
  }
}

.footer-content {
  max-width: $page-max-width;
  height: 100%;
  margin: 0 auto;
  padding: 0 $page-inline-padding;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
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
