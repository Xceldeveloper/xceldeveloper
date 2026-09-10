<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import {
  PROFILE,
  contactPoints,
  resolvePublicOrigin,
} from "~/utils/seo";

/** Always production — share cards must not point at localhost / Netlify previews */
const siteOrigin = computed(() => resolvePublicOrigin());

const title = `${PROFILE.name} | ${PROFILE.jobTitle}`;
const description = PROFILE.description;
const shareImage = computed(() => `${siteOrigin.value}${PROFILE.imagePath}`);
const shareAlt = `${PROFILE.name} — ${PROFILE.jobTitle}`;
const robots = useProductionRobots();

useHead({
  // Don't suffix the site name — page title already includes PROFILE.name
  titleTemplate: (titleChunk) =>
    titleChunk || `${PROFILE.name} | ${PROFILE.jobTitle}`,
  link: [{ rel: "canonical", href: siteOrigin }],
  meta: [
    {
      name: "author",
      content: PROFILE.name,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: computed(() =>
        JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${siteOrigin.value}/#website`,
              name: PROFILE.name,
              url: siteOrigin.value,
              description,
              inLanguage: "en",
              publisher: { "@id": `${siteOrigin.value}/#person` },
            },
            {
              "@type": "ProfilePage",
              "@id": `${siteOrigin.value}/#profilepage`,
              url: siteOrigin.value,
              name: title,
              description,
              isPartOf: { "@id": `${siteOrigin.value}/#website` },
              about: { "@id": `${siteOrigin.value}/#person` },
              mainEntity: { "@id": `${siteOrigin.value}/#person` },
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: shareImage.value,
              },
            },
            {
              "@type": "Person",
              "@id": `${siteOrigin.value}/#person`,
              name: PROFILE.name,
              givenName: PROFILE.givenName,
              familyName: PROFILE.familyName,
              url: siteOrigin.value,
              image: shareImage.value,
              email: PROFILE.email,
              jobTitle: PROFILE.jobTitle,
              description: PROFILE.tagline,
              contactPoint: contactPoints,
              worksFor: PROFILE.worksFor.map((org) => ({
                "@type": "Organization",
                name: org.name,
                url: org.url,
              })),
              sameAs: [...PROFILE.sameAs],
              knowsAbout: [
                "Software architecture",
                "Software systems",
                "Product engineering",
                "Frontend engineering",
                "Solution architecture",
              ],
            },
          ],
        }),
      ),
    },
  ],
});

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: "profile",
  ogUrl: siteOrigin,
  ogSiteName: PROFILE.name,
  ogImage: shareImage,
  ogImageWidth: PROFILE.imageWidth,
  ogImageHeight: PROFILE.imageHeight,
  ogImageType: PROFILE.imageType,
  ogImageAlt: shareAlt,
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: shareImage,
  twitterImageAlt: shareAlt,
  robots,
});
</script>
