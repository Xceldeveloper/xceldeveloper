<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const requestURL = useRequestURL();
const siteOrigin = computed(() => requestURL.origin);

const title = "Overcomer Emiator";
const description =
  "Overcomer Emiator — builder and solution architect. Founder of Sleekware.";
const shareImage = computed(() => `${siteOrigin.value}/og-image.jpg`);
const shareAlt = "Overcomer Emiator";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Overcomer Emiator` : "Overcomer Emiator";
  },
  link: [{ rel: "canonical", href: siteOrigin }],
});

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: "website",
  ogUrl: siteOrigin,
  ogSiteName: title,
  ogImage: shareImage,
  ogImageWidth: 1080,
  ogImageHeight: 1080,
  ogImageType: "image/jpeg",
  ogImageAlt: shareAlt,
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: shareImage,
  twitterImageAlt: shareAlt,
});
</script>
