<template>
  <div class="home-page">
    <div class="container">
      <div class="hero">
        <h1 class="hero__title">
          Overcomer Emiator
        </h1>
        <p class="hero__subtitle">
          Full Stack Developer & Creative Technologist
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Home',
});
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero {
  text-align: center;

  &__title {
    font-size: clamp(2.5rem, 5vw, 5rem);
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #fff 0%, #888 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__subtitle {
    font-size: clamp(1rem, 2vw, 1.5rem);
    color: #aaa;
    font-weight: 400;
  }
}
</style>
