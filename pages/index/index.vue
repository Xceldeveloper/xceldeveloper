<template>
  <div class="home flex items-center justify-center">
    <img class="iconx" src="/logos/nuxtjs.svg" alt="Nuxtjs" />

    <img class="iconx" src="/logos/vuejs.svg" alt="VueJS" />

    <img class="iconx" src="/logos/scss.svg" alt="SCSS" />

    <img class="iconx" src="/logos/tailwindcss.svg" alt="Tailwindcss" />

    <img class="iconx" src="/logos/vuetify.svg" alt="Vuetify" />

    <img class="iconx" src="/logos/git.png" alt="Git" />

    <img class="iconx" src="/logos/vscode.png" alt="Vscode" />

    <!-- <img class="iconx" src="/favicon.png" alt="Vuetify" /> -->

    <img class="iconx" src="/logos/npm.svg" alt="NPM" />

    <img class="iconx" src="/logos/yarn.svg" alt="yarn" />

    <img class="iconx" src="/logos/figma.svg" alt="Figma" />

    <img class="iconx" src="/logos/flutter.svg" alt="Flutter" />

    <img class="iconx" src="/logos/github.svg" alt="Github" />

    <img class="iconx" src="/logos/jest.png" alt="Jest" />

    <img class="iconx" src="/logos/bitbucket.svg" alt="Bitbucket" />

    <img class="iconx" src="/logos/notion.svg" alt="Notion" />

    <img class="iconx" src="/logos/clickup.svg" alt="Clickup" />
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
