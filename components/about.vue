<template>
   <v-hover v-slot="{ hover }">
      <v-card  v-intersect="onIntersect" color="#000" height="500px" style="margin:100px auto" max-width="1000px" :elevation="hover ? 10 : 2">
      <v-card-title><v-icon left>mdi-account</v-icon> About</v-card-title>
      <v-divider></v-divider>
      <v-divider></v-divider>
      <v-card-text>
          He is a very passionate developer
      </v-card-text>
  </v-card>
  </v-hover>
</template>

<script>

export default {
  components: {
    // ES6; property shorthand + Vue should automatically dasherize the key for us
  },
  data() {
    return {};
  },
  methods: {
    onIntersect(entries, observer) {
      this.$emit("visible", entries[0].isIntersecting);
    },
  },
};
</script>

<style>

</style>