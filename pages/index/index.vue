<template>

  <div class="home items-center flex-wrap justify-center">

    <img
      class="iconx"
      src="https://nuxtjs.org/design-kit/colored-logo.svg"
      alt="Nuxtjs"
    />

    <img
      class="iconx"
      src="https://brandeps.com/logo-download/V/Vue-JS-logo-vector-01.svg"
      alt="VueJS"
    />

    <img
      class="iconx"
      src="https://brandeps.com/logo-download/S/Sass-logo-vector-01.svg"
      alt="SCSS"
    />

    <img
      class="iconx"
      src="https://brandeps.com/icon-download/T/Tailwindcss-icon-vector-01.svg"
      alt="Tailwindcss"
    />

    <img
      class="iconx"
      src="https://cdn.worldvectorlogo.com/logos/vuetify.svg"
      alt="Vuetify"
    />

    <img
      class="iconx"
      src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png"
      alt="Git"
    />

    <img
      class="iconx"
      src="https://code.visualstudio.com/assets/images/code-stable.png"
      alt="Vscode"
    />

    <img
      class="iconx"
      src="https://brandeps.com/logo-download/N/Npm-logo-vector-01.svg"
      alt="NPM"
    />

    <img
      class="iconx"
      src="https://brandeps.com/logo-download/Y/Yarn-logo-vector-01.svg"
      alt="yarn"
    />

    <img
      class="iconx"
      src="https://brandeps.com/logo-download/F/Figma-logo-vector-01.svg"
      alt="Figma"
    />

    <img
      class="iconx"
      src="https://brandeps.com/icon-download/F/Flutter-icon-vector-02.svg"
      alt="Flutter"
    />

    <img
      class="iconx"
      src="https://brandeps.com/icon-download/G/Github-icon-vector-22.svg"
      alt="Github"
    />

    <img
      class="iconx"
      src="https://brandeps.com/icon-download/B/Bitbucket-icon-vector-04.svg"
      alt="Bitbucket"
    />

    <img
      class="iconx"
      src="https://brandeps.com/icon-download/N/Notion-icon-vector-01.svg"
      alt="Notion"
    />

    <img
      class="iconx"
      src="https://asset.brandfetch.io/idU6lzwMYA/idMaCKxlWy.svg"
      alt="Clickup"
    />

  </div>

</template>

<script>
const { gsap } = require("gsap/all");

function tweenProperty(target, prop, min, max) {
  var randomDur = gsap.utils.random(3, 6, 0.2, true);
  var randomDelay = gsap.utils.random(0.6, 2, 0.2, true);

  gsap.to(target, {
    [prop]: gsap.utils.random(min, max),
    duration: randomDur(),
    delay: randomDelay(),
    ease: "none",
    onComplete: tweenProperty,
    onCompleteParams: [target, prop, min, max],
  });
}

export default {
  mounted() {
    gsap.utils.toArray(".iconx").forEach((star) => {
      //   tweenProperty(star, "scale", 0.5, 4);
      tweenProperty(star, "x", -30, 30);
      tweenProperty(star, "y", -250, 200);
    });
  },
  methods: {},

  //  background(){

  //   var next = gsap.utils.random(3, 6, 0.5, true);
  //   var opa = gsap.utils.random(0.2, 1, 0.1, true);

  //   gsap.to('#svg01', {opacity:opa, duration:3, ease:'none'});

  //   var delayedCall = gsap.delayedCall(next, background);

  // }
};
</script>

<style lang="scss" scoped>
.home {
  boder: 1px solid red;
  height: 100%;
  overflow: hidden;
  display: flex;
}

svg {
  background: black;
  //   height: 100%;
  //   width: 100%;
}

circle {
  fill: green;
  r: 30;
  opacity: 0.6;
}

.iconx {
  width: auto;
  height: 40px;
  object-fit: cover;
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);

  &:hover {
    -webkit-filter: grayscale(0%); /* Safari 6.0 - 9.0 */
    filter: grayscale(0%);
    cursor: crosshair;
  }
}
</style>
