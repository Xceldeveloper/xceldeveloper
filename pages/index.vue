<template>
  <div class="wrapper">
    
    <app-header :focus="focusHeader ? false : true" :views="views" />
    <main-cover @hidden="canFocus"/>
     <div id="over-lap">
            <div id="over-wrap">
               <div id="badges" class=" grid grid-cols-3">
                 <div class="badge-class">
                   <div style="width:100%;text-align:center;display:block"><v-icon>mdi-web</v-icon> </div> <br>
                   <div>Web Developer</div>
                   </div>
                 <div class="badge-class ">App Developer <v-icon>mdi-app</v-icon>

                 </div>
                 <div class="badge-class">
                    <span><v-icon>mdi-git</v-icon></span> <br>
                  <span> Open Source Contributor</span></div>
               </div>
            </div>
          </div>

                <about @visible="whichView('about',$event)"/>
                <br>
                <project @visible="whichView('project',$event)"/>
        

          



 

    <div id="box"></div>
  </div>
</template>

<script>
import about from '~/components/about.vue';
import project from '~/components/projects.vue';
import appHeader from '~/components/header.vue';
import mainCover from '~/components/main-cover.vue';

export default {
  components:{appHeader,mainCover,about,project},
  data() {
    return {
      focusHeader:false,
      views:{
        about:false,
        project:false,
        resume:false
      }
    };
  },
  methods:{
    canFocus(val){
      this.focusHeader = val;
    },
    whichView(view,res){
     switch(view){
       case 'about':
         this.views.about = res;
         break;
       case 'project':
         this.views.project = res;
         break;
     }
    }
  }
};
</script>

<style>

*{
  color:#fff;
}
.wrapper{
  width: 100vw;
  height: 100vh;
  overflow: auto;
}

#over-lap {
  width: 100%;
  position: relative;
  height: 120px;
  z-index: 100;
}

#over-wrap{
 position: absolute;
  top: -60px;
  height: 120px;
  width: 100%;
}

#badges{
  margin: auto;
  height: 100%;
  border-radius: 80px;
  background-color: #000;
  width: 60%;
  max-width: 800px;
  box-shadow: 0px 0px 10px #000;
  visibility: hidden;
}


#box{
  height: 200vh;
  width: 100%;
}

.badge-class{
  text-align: center;
  height: 100%;
  line-height: 20px;
}
</style>
