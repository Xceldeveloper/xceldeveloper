<script setup lang="ts">
import { onMounted, ref, onUnmounted, watch, nextTick } from "vue";
import { gsap } from "gsap";
import BioSection from "~/components/sections/BioSection.vue";
import ExperienceSection from "~/components/sections/ExperienceSection.vue";

const currentSection = ref<"bio" | "experience">("bio");
const contentOffset = ref(0);
const isDesktop = ref(true);
const isCalculating = ref(true); // Loading state for drawer
const shouldCenterAlign = ref(false); // Track if content should be centered
const isSectionTransitioning = ref(false); // Track section transitions
const showScrollIndicator = ref(false); // Show scroll hint
let resizeObserver: ResizeObserver | null = null; // Watch for content size changes

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

// Calculate content offset based on image position
const calculateContentOffset = () => {
  const profilePhoto = document.querySelector(".profile-photo") as HTMLImageElement;
  const contentContainer = document.querySelector(".body-left__content");
  const cardBody = document.querySelector(".card-body");
  const activeSection = currentSection.value === 'bio' 
    ? document.querySelector(".bio-section")
    : document.querySelector(".experience-section");
  const mediaQuery = window.matchMedia("(min-width: 1025px)");

  isDesktop.value = mediaQuery.matches;

  if (!isDesktop.value) {
    contentOffset.value = 0;
    shouldCenterAlign.value = false;
    isCalculating.value = false;
    return;
  }

  if (profilePhoto && contentContainer && cardBody && activeSection) {
    const photoRect = profilePhoto.getBoundingClientRect();
    const bodyRect = cardBody.getBoundingClientRect();
    
    // Get ACTUAL content height (the section itself, not the container)
    const sectionHeight = activeSection.scrollHeight;
    const availableHeight = bodyRect.height;
    
    // Check if content needs scrolling (content taller than container)
    const needsScroll = sectionHeight > (availableHeight * 0.8);

    console.log("Content measurement:", {
      sectionHeight,
      availableHeight,
      needsScroll,
      currentSection: currentSection.value,
    });

    if (needsScroll) {
      // Long content: Eye-level alignment (10% below image top)
      const imageTopRelativeToBody = photoRect.top - bodyRect.top;
      const eyeLevelOffset = imageTopRelativeToBody + (photoRect.height * 0.1); // 10% down from image top
      
      contentOffset.value = eyeLevelOffset;
      shouldCenterAlign.value = false;
      
      console.log("Eye-level alignment:", {
        imageTop: imageTopRelativeToBody,
        eyeLevelOffset,
        imageHeight: photoRect.height,
      });
    } else {
      // Short content: Center alignment (no offset needed, CSS handles it)
      contentOffset.value = 0;
      shouldCenterAlign.value = true;
      
      console.log("Center alignment applied");
    }

    // Show scroll indicator on Bio (to hint at Experience section)
    // or on Experience if it has scrollable content
    showScrollIndicator.value = 
      currentSection.value === "bio" || // Always show on bio to hint at more sections
      (currentSection.value === "experience" && needsScroll); // Show on experience if scrollable

    // Release loading state ONLY on initial load
    if (isCalculating.value) {
      setTimeout(() => {
        isCalculating.value = false;
      }, 300); // Smooth initial reveal
    }
  }
};

// Wheel event handler
let isScrolling = false;
const handleWheel = (e: WheelEvent) => {
  console.log("Wheel event fired:", { isScrolling, isDesktop: isDesktop.value, deltaY: e.deltaY });
  
  if (isScrolling || !isDesktop.value || isSectionTransitioning.value) {
    console.log("Wheel blocked:", { isScrolling, isDesktop: isDesktop.value, transitioning: isSectionTransitioning.value });
    return;
  }

  // Get the scrollable content container
  const contentContainer = document.querySelector(".body-left__content");
  if (!contentContainer) return;

  const scrollTop = contentContainer.scrollTop;
  const scrollHeight = contentContainer.scrollHeight;
  const clientHeight = contentContainer.clientHeight;
  const isAtTop = scrollTop === 0;
  const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1; // Allow 1px tolerance

  console.log("Scroll position:", {
    scrollTop,
    scrollHeight,
    clientHeight,
    isAtTop,
    isAtBottom,
    deltaY: e.deltaY,
  });

  // Only switch sections when at scroll boundaries
  let shouldSwitch = false;
  let targetSection: "bio" | "experience" = currentSection.value;

  if (e.deltaY > 0) {
    // Scrolling DOWN
    if (isAtBottom && currentSection.value === "bio") {
      // At bottom of bio, switch to experience
      shouldSwitch = true;
      targetSection = "experience";
    }
  } else if (e.deltaY < 0) {
    // Scrolling UP
    if (isAtTop && currentSection.value === "experience") {
      // At top of experience, switch to bio
      shouldSwitch = true;
      targetSection = "bio";
    }
  }

  if (!shouldSwitch) {
    // Let the content scroll naturally
    console.log("Scrolling within section, not switching");
    return;
  }

  // Start fade-out transition
  isSectionTransitioning.value = true;

  // Switch section after a brief moment (during fade-out)
  setTimeout(() => {
    currentSection.value = targetSection;
  }, 200); // Switch during fade-out

  console.log("Switching to:", targetSection);

  // Set debounce AFTER switching
  isScrolling = true;
  setTimeout(() => {
    isScrolling = false;
    console.log("Debounce released, ready for next scroll");
  }, 800); // Longer debounce to allow full transition
};

onMounted(() => {
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
  }

  // Set up ResizeObserver to watch for content size changes
  const contentContainer = document.querySelector(".body-left__content");
  if (contentContainer) {
    resizeObserver = new ResizeObserver((entries) => {
      // Debounce: only recalculate if size actually changed
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          console.log("Content size changed, recalculating...");
          calculateContentOffset(); // No loader on content resize
        }
      }
    });
    resizeObserver.observe(contentContainer);
  }

  // Recalculate on resize (no loader)
  const mediaQuery = window.matchMedia("(min-width: 1025px)");
  mediaQuery.addEventListener("change", () => {
    calculateContentOffset(); // No loader on screen size change
  });
  window.addEventListener("resize", () => {
    calculateContentOffset(); // No loader on window resize
  });

  // Attach wheel event listener
  window.addEventListener("wheel", handleWheel, { passive: true });
  console.log("Wheel listener attached, isDesktop:", isDesktop.value);
});

// Watch for section changes to recalculate alignment (no loader)
watch(currentSection, () => {
  // Wait for DOM to update with new section
  nextTick(() => {
    // Recalculate positioning while faded out
    setTimeout(() => {
      calculateContentOffset();
      
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
});
</script>

<template>
  <div class="business-card">
    <!-- Loading Drawer (like buque website) -->
    <Transition name="drawer">
      <div v-if="isCalculating" class="loading-drawer">
        <div class="loading-drawer__content">
          <div class="loading-spinner"></div>
        </div>
      </div>
    </Transition>

    <!-- Header -->
    <header class="card-header">
      <div class="header-content">
        <!-- Empty for now -->
      </div>
    </header>

    <!-- Body with 62/38 Split -->
    <main class="card-body">
      <!-- Left Side (62%) - Scrollable Sections -->
      <div class="body-left" :class="{ 'eye-level': !shouldCenterAlign }">
        <div
          class="body-left__content"
          :class="{ 'transitioning': isSectionTransitioning }"
          :style="{
            paddingTop:
              isDesktop && contentOffset > 0 ? `${contentOffset}px` : '0',
          }"
        >
          <!-- Sections with smooth fade -->
          <BioSection v-if="currentSection === 'bio'" />
          <ExperienceSection v-if="currentSection === 'experience'" />
        </div>
        
        <!-- Scroll Indicator -->
        <Transition name="indicator-fade">
          <div v-if="showScrollIndicator && !isSectionTransitioning" class="scroll-indicator">
            <div class="scroll-indicator__icon">
              <Icon name="lucide:chevrons-down" />
            </div>
            <span class="scroll-indicator__text">
              {{ currentSection === 'bio' ? 'Scroll to see more' : 'Scroll to explore' }}
            </span>
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
$image-max-width: 500px;

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
// LOADING DRAWER
// ============================================
.loading-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $bg-color;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: $text-color;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// Drawer transition - slower and smoother
.drawer-enter-active {
  transition: opacity 0.2s ease;
}

.drawer-leave-active {
  transition: opacity 0.4s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
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
  align-items: flex-start; // Changed from center to flex-start for eye-level alignment
  justify-content: center;
  overflow: visible; // Changed from hidden to visible to allow scrolling
  max-width: $page-max-width;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
    overflow-y: auto;
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

  // Eye-level alignment when content is long (controlled by Vue)
  &.eye-level {
    align-items: flex-start;
    justify-content: flex-start;
  }

  @media (max-width: 1024px) {
    flex: 1 1 auto;
    align-items: center; // Always center on mobile
    justify-content: center;
  }

  &__content {
    width: 100%;
    max-height: 82vh; // Constrain height to allow scrolling
    overflow-y: auto; // Enable vertical scrolling
    overflow-x: hidden;
    padding-right: 1rem;
    padding-bottom: 2rem;
    transition: padding-top 0.4s ease, opacity 0.4s ease; // Smooth fade transition
    will-change: padding-top, opacity; // Optimize for transitions
    opacity: 1; // Default visible

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
// SCROLL INDICATOR
// ============================================
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  pointer-events: none;
  z-index: 10;
  animation: float 2s ease-in-out infinite;

  &__icon {
    color: rgba(255, 255, 255, 0.4);
    font-size: 1.5rem;
    
    :deep(svg) {
      width: 1.5rem;
      height: 1.5rem;
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
    display: none; // Hide on mobile
  }
}

@keyframes float {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-8px);
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
  height: auto;
  max-height: $body-height;
  width: min($col-small, $image-max-width); // Use whichever is smaller

  @media (max-width: 1024px) {
    flex: 1 1 auto;
    position: relative;
    height: auto;
    width: 100%;
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
    max-height: 50vh;
    height: 100%;
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
      ellipse at 60% 40%,
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
</style>
