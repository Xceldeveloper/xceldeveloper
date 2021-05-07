<template>
    <v-app id="app">
      <Nuxt />
    </v-app>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    let eHtml = document.getElementsByTagName("html")[0];
    eHtml.style.overflowY = "auto";
  },
};
</script>


<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  overflow: auto;
}

#app{
  overflow: auto;
}
</style>
