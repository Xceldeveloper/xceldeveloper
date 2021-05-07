<template>
  <v-app-bar class="header" :color="focus ? '#000' : 'transparent'" :elevation="focus ? 5 : 0">
     <img id="avatar" src="~assets/images/icon.jpg" alt="" />

     <v-toolbar-title v-if="focus">Xceldeveloper</v-toolbar-title>
    <v-spacer></v-spacer> 
       <v-hover v-slot="{ hover }">
        <v-btn class="mr-2"  rounded  :outlined="hover ? true : views.about ? false : true" color="rgba(255,255,255,0.9)" :text="views.about ? false : true" :light="views.about ? true : hover ? true : false">About</v-btn>
     </v-hover>
            <v-hover v-slot="{ hover }">
        <v-btn class="mr-2"  rounded  :outlined="hover ? true : views.project ? false : true" color="rgba(255,255,255,0.9)" :text="views.project ? false : true" :light="views.project ? true : hover ? true : false">Projects</v-btn>
     </v-hover>
   
  </v-app-bar>
</template>

<script>
export default {
  props:{
    focus:{
      default:false
    },
    views:{
      type:Object,
    }
  },
  name: "app-header",
  mounted() {},
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0px;
  z-index: 100;
  box-shadow: 0px 0px 3px #101010;
}

#avatar{
  height: 48px;
  width: 48px;
  border-radius: 50%;
  margin-left: 11px;
  margin-right: 10px;
  border: 2px solid snow ;
}
</style>