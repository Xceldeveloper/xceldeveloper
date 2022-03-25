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
*{
    font-family: 'Nunito Sans', sans-serif !important;

}
</style>
