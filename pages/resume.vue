<template>
  <div id="wrapperx">
    <v-toolbar color="transparent" dense>
      <v-btn icon @click="navBack"><v-icon>mdi-chevron-left</v-icon></v-btn>
      <v-toolbar-title>Resume</v-toolbar-title>
      <v-spacer></v-spacer>
      <a id="downloader" :href="resume">
        <v-btn text small
          ><span v-if="!isMobile">Download</span>
          <v-icon right>mdi-download</v-icon></v-btn
        >
      </a>
      <v-btn text small @click="$refs.pdf_viewer.print()"
        ><span v-if="!isMobile">Print</span>
        <v-icon right>mdi-printer</v-icon></v-btn
      >
    </v-toolbar>
    <div id="resume-wrapper">
      <pdf ref="pdf_viewer" :src="resume"></pdf>
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import device_mixin from '~/mixins/device_mixin.js'
import navigation_mixin from '~/mixins/navigation_mixin.js'
export default {
  mixins: [device_mixin, navigation_mixin],
  components: {
    pdf,
  },
  data() {
    return {
      resume: require('~/static/resumex.pdf'),
    }
  },
  mounted() {
    var dwnloader = document.getElementById('downloader')
    dwnloader.download = 'overcomeremiator_resume'
  },
  methods: {},
}
</script>

<style>
#wrapperx {
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
#resume-wrapper {
  width: 100%;
  height: calc(100vh - 47.8px);
  background-color: #fff;
  color: #000;
  overflow: auto;
}

a {
  text-decoration: none;
}

@media screen and (min-width: 767px) {
  *::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgb(17, 17, 17);
  }

  *::-webkit-scrollbar {
    width: 10px;
    background-color: rgb(17, 17, 17);
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgb(17, 17, 17);
    border: 1px solid #7c7b7b;
    border-radius: 1px;
  }
}
</style>