<template>
  <div class="business-card">
    <!-- Header -->
    <header class="card-header">
      <h1 class="header__name">Overcomer Emiator</h1>
    </header>

    <!-- Main Content Area -->
    <main class="card-body">
      <!-- Left Column (61.8%) -->
      <section class="content-left">
        <!-- Bio -->
        <div class="bio">
          <h2 class="bio__title">
            Founder & Engineering Leader<br>
            at Sleekware
          </h2>
          <p class="bio__description">
            Building intentional software for ambitious businesses.
            Currently leading frontend engineering at Piggyvest.
            5+ years architecting scalable systems.
          </p>
        </div>

        <!-- Experience -->
        <div class="experience">
          <h3 class="experience__label">EXPERIENCE</h3>
          
          <div class="experience__item">
            <h4 class="experience__company">Piggyvest</h4>
            <p class="experience__role">Frontend Engineering Lead</p>
            <p class="experience__duration">2021 - Present</p>
          </div>

          <div class="experience__item">
            <h4 class="experience__company">TransferXO</h4>
            <p class="experience__role">Frontend Developer</p>
            <p class="experience__duration">2020 - 2021</p>
          </div>

          <div class="experience__item">
            <p class="experience__prior">
              Prior experience at Scelloo, Mulaa, Amenta AB
            </p>
          </div>
        </div>
      </section>

      <!-- Right Column (38.2%) -->
      <aside class="content-right">
        <!-- Photo Placeholder -->
        <div class="photo-container">
          <div class="photo-placeholder">
            <div class="photo-placeholder__content">
              <Icon name="lucide:user" />
              <span>Side Profile</span>
              <span class="photo-placeholder__note">Facing Left</span>
            </div>
          </div>
        </div>

        <!-- Sleekware Card -->
        <div class="info-card">
          <h3 class="info-card__title">SLEEKWARE</h3>
          <div class="info-card__divider"></div>
          <p class="info-card__subtitle">Bespoke</p>
          <p class="info-card__subtitle">Engineering</p>
        </div>

        <!-- Piggyvest Card -->
        <div class="info-card">
          <h3 class="info-card__title">PIGGYVEST</h3>
          <div class="info-card__divider"></div>
          <p class="info-card__subtitle">FinTech</p>
          <p class="info-card__subtitle">Engineering</p>
        </div>
      </aside>
    </main>

    <!-- Footer -->
    <footer class="card-footer">
      <a href="mailto:hello@xceldeveloper.com" class="footer__email">
        hello@xceldeveloper.com
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
$header-height: 10vh;
$body-height: 80vh;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
  gap: clamp(2rem, 4vw, 4rem);
  padding: clamp(2rem, 5vw, 4rem);
  overflow: hidden;
}

// ============================================
// LEFT COLUMN (61.8%)
// ============================================
.content-left {
  flex: 0 0 $col-large;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 4vh, 3rem);
  overflow-y: auto;
  
  // Custom scrollbar
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
}

// Bio Section
.bio {
  &__title {
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    font-weight: 600;
    line-height: 1.3;
    margin: 0 0 1.5rem 0;
    letter-spacing: -0.02em;
  }

  &__description {
    font-size: clamp(1rem, 1.2vw, 1.125rem);
    line-height: 1.6;
    color: $text-muted;
    margin: 0;
  }
}

// Experience Section
.experience {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    margin: 0 0 0.5rem 0;
  }

  &__item {
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    padding-left: 1rem;
  }

  &__company {
    font-size: clamp(1.125rem, 1.5vw, 1.25rem);
    font-weight: 600;
    margin: 0 0 0.25rem 0;
  }

  &__role {
    font-size: clamp(0.938rem, 1.1vw, 1rem);
    color: $text-muted;
    margin: 0 0 0.25rem 0;
  }

  &__duration {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
  }

  &__prior {
    font-size: clamp(0.938rem, 1.1vw, 1rem);
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
  }
}

// ============================================
// RIGHT COLUMN (38.2%)
// ============================================
.content-right {
  flex: 0 0 $col-small;
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vh, 2rem);
}

// Photo Container (Golden Ratio Position)
.photo-container {
  height: 38.2%; // Golden ratio of body height
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 2px dashed rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    color: rgba(255, 255, 255, 0.3);
    font-size: 0.875rem;

    :deep(svg) {
      width: 3rem;
      height: 3rem;
      opacity: 0.3;
    }
  }

  &__note {
    font-size: 0.75rem;
    opacity: 0.5;
  }
}

// Info Cards
.info-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: clamp(1.25rem, 2vw, 1.5rem);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  &__title {
    font-size: clamp(1rem, 1.2vw, 1.125rem);
    font-weight: 600;
    letter-spacing: 0.05em;
    margin: 0 0 0.75rem 0;
  }

  &__divider {
    width: 2rem;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    margin-bottom: 0.75rem;
  }

  &__subtitle {
    font-size: clamp(0.875rem, 1vw, 0.938rem);
    color: $text-muted;
    margin: 0.25rem 0;
  }
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
