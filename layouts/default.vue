<template>
  <v-app id="app">
    <nuxt keep-alive :keep-alive-props="{ include: cacheStatcks }" />
  </v-app>
</template>

<script>
export default {
  mounted() {
    //polifix for persisent scrollbar
    // let eHtml = document.getElementsByTagName('html')[0]
    // eHtml.style.overflowY = 'hidden'
  },
  computed: {
    Router() {
      return {
        stacks: this.$store.state.routestack.stacks,
        length: this.$store.state.routestack.stacks.length,
        current: this.$store.state.routestack.stacks[
          this.$store.state.routestack.stacks.length - 1
        ],
        previous: this.$store.state.routestack.stacks[
          this.$store.state.routestack.stacks.length - 2
        ],
        paths: this.$store.state.routestack.paths,
      }
    },
    cacheStatcks() {
      return this.Router.stacks.join(',')
    },
  },
}
</script>
<style lang="scss" scoped>
html {
  overflow-y: auto;
}

@media screen and (min-width: 767px) {
  html::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgb(17, 17, 17);
  }

  html::-webkit-scrollbar {
    width: 10px;
    background-color: rgb(17, 17, 17);
  }

  html::-webkit-scrollbar-thumb {
    background-color: rgb(17, 17, 17);
    border: 1px solid #7c7b7b;
    border-radius: 1px;
  }
}
</style>
