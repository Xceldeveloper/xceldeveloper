<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const requestURL = useRequestURL();
const siteOrigin = computed(() => requestURL.origin);
const ogImage = computed(() => `${siteOrigin.value}/og-image.png`);

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Overcomer Emiator` : "Overcomer Emiator";
  },
});

useSeoMeta({
  ogImage,
  ogUrl: computed(() => siteOrigin.value),
  twitterImage: ogImage,
});
</script>
