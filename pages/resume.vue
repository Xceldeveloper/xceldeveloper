<template>
  <div id="wrapperx">
      <v-toolbar color="transparent" dense>
          <v-btn icon><v-icon>mdi-chevron-left</v-icon></v-btn>
          <v-toolbar-title>Resume</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text small >Download <v-icon right>mdi-download</v-icon></v-btn>
      </v-toolbar>
      <div id="resume-wrapper">
     <pdf :src="resume"></pdf>
  </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
    components: {
    pdf
  },
  data(){
      return{
        resume:require("~/static/resumex.pdf")
      }
  }
}
</script>

<style>
#wrapperx{
    width: 100vw;
    height: 100vh;
    overflow: auto;
}
#resume-wrapper{
    width: 100%;
    height:calc(100vh - 47.8px);
    background-color: #fff;
    color: #000;
    overflow: auto;
}
</style>