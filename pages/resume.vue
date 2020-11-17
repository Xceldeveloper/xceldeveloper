<template>
  <div id="wrapperx">
      <v-toolbar color="transparent" dense>
          <v-btn icon><v-icon>mdi-chevron-left</v-icon></v-btn>
          <v-toolbar-title>Resume</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text small >Download <v-icon right>mdi-download</v-icon></v-btn>
      </v-toolbar>
      <canvas id="resume-wrapper">
      
  </canvas>
  </div>
</template>

<script>
const pdf = require('pdfjs')
export default {
  data(){
      return{
        pdf: "http://mozilla.github.io/pdf.js/examples/learning/helloworld.pdf"
      }
  },
   mounted(){
      this.initPDF();
   },
     methods:{
         initPDF(){
           // Asynchronous download PDF
PDFJS.getDocument(this.pdf)
  .then((pdf)=> {
    return pdf.getPage(1);
  })
  .then((page)=> {
    // Set scale (zoom) level
    var scale = 1.5;

    // Get viewport (dimensions)
    var viewport = page.getViewport(scale);

    // Get canvas#the-canvas
    var canvas = document.getElementById('resume-wrapper');

    // Fetch canvas' 2d context
    var context = canvas.getContext('2d');

    // Set dimensions to Canvas
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Prepare object needed by render method
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    // Render PDF page
    page.render(renderContext);
  })
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
    
    overflow: auto;
}
</style>