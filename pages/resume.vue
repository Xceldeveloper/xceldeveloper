<template>
  <div id="wrapperx">
      <v-toolbar color="transparent" dense>
          <v-btn icon><v-icon>mdi-chevron-left</v-icon></v-btn>
          <v-toolbar-title>Resume</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text small >Download <v-icon right>mdi-download</v-icon></v-btn>
      </v-toolbar>
      <div id="resume-wrapper">
      
  </div>
  </div>
</template>

<script>
export default {

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
    
    overflow: auto;
}
</style>