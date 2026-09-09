<template>
  <div class="business-card">
    <!-- Header -->
    <header class="card-header">
      <h1 class="header__name">Overcomer Emiator</h1>
    </header>

    <!-- Empty Body (for now) -->
    <main class="card-body">
      <!-- Content will go here -->
    </main>

    <!-- Footer -->
    <footer class="card-footer">
      <a href="mailto:overcomer@emiator.com" class="footer__email">
        overcomer@emiator.com
      </a>
      <div class="footer__socials">
        <a href="https://linkedin.com/in/overcomer-emiator-5573141b2" target="_blank" rel="noopener" class="social-link">
          <Icon name="lucide:linkedin" />
        </a>
        <a href="https://github.com/Xceldeveloper" target="_blank" rel="noopener" class="social-link">
          <Icon name="lucide:github" />
        </a>
        <a href="https://twitter.com/xceldeveloper" target="_blank" rel="noopener" class="social-link">
          <Icon name="lucide:twitter" />
        </a>
        <a href="https://instagram.com/ovemiator" target="_blank" rel="noopener" class="social-link">
          <Icon name="lucide:instagram" />
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Overcomer Emiator - Founder & Engineering Leader',
  meta: [
    {
      name: 'description',
      content: 'Founder of Sleekware. Building intentional software for ambitious businesses. Currently leading frontend engineering at Piggyvest.',
    },
  ],
});
</script>

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
  display: flex;
  align-items: center;
  padding: 0 clamp(2rem, 5vw, 4rem);
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
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 5vw, 4rem);
  
  // Empty for now - content will be added later
}

// ============================================
// FOOTER
// ============================================
.card-footer {
  height: $footer-height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(2rem, 5vw, 4rem);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer__email {
  font-size: clamp(0.875rem, 1vw, 0.938rem);
  color: $text-muted;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: $text-color;
  }
}

.footer__socials {
  display: flex;
  gap: 1.5rem;
}

.social-link {
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;

  :deep(svg) {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover {
    color: $text-color;
    transform: translateY(-2px);
  }
}

// ============================================
// RESPONSIVE
// ============================================
@media (max-width: 1024px) {
  .card-body {
    flex-direction: column;
    overflow-y: auto;
    height: auto;
  }

  .content-left,
  .content-right {
    flex: 1 1 auto;
  }

  .photo-container {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .card-header,
  .card-footer {
    padding: 0 1.5rem;
  }

  .card-body {
    padding: 1.5rem;
  }

  .card-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .footer__socials {
    gap: 1rem;
  }
}
</style>
