<template>
  <div
    class="page pa-md-14 pa-6 gap-10 flex flex-col lg:flex-row"
    style="borer: 1px solid blue"
  >
    <div class="flex-1 h-full">
      <div
        class="w-full h-full flex items-center"
        style="brder: 1px solid yellow"
      >
        <div class="w-full text-center text-md-left">
          <img
            class="md:w-44 w-36 h-36 md:h-44 block mx-auto ma-md-0 rounded-full logo"
            src="/icon.jpg"
            alt=""
          />

          <span class="block text-white text-2xl md:text-4xl mt-6 mt-md-10">
            Overcomer Emiator
          </span>

          <span class="text-gray-400 block text-lg font-semibold mt-1 mb-6">
            {{ dd }}
          </span>

          <span
            class="block max-w-lg mx-auto mx-lg-0 tracking-wider text-gray-400 my-5"
          >
            <vue-typed-js
              :startDelay="3000"
              :typeSpeed="30"
              cursorChar=" _"
              :strings="[
                `  Hi, I am a passionate developer with good experience designing Webapps,
          Blogs, Android Apps, Opensource Projects etc utilizing varieties of Software
          Technologies which include Vuejs, Nuxt, Flutter, Nodejs, Django, JQuery`,
              ]"
            >
              <span class="typing" id="quote-x"></span>
            </vue-typed-js>
          </span>

          <div class="">
            <a href="https://twitter.com/xceldeveloper" target="_blank">
              <v-btn icon>
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
            </a>

            <a
              href="https://www.linkedin.com/in/overcomer-emiator-5573141b2"
              target="_blank"
            >
              <v-btn icon>
                <v-icon>mdi-linkedin</v-icon>
              </v-btn>
            </a>

            <a href="mailto:xceldeveloper@gmail.com" target="_blank">
              <v-btn icon>
                <v-icon>mdi-gmail</v-icon>
              </v-btn>
            </a>

            <a href="https://github.com/xceldeveloper" target="_blank">
              <v-btn icon>
                <v-icon>mdi-github</v-icon>
              </v-btn>
            </a>
          </div>
          <div class="mt-4 md:hidden flex justify-center">
           <a href="https://my.indeed.com/p/overcomere-my85kbn" target="_blank">
            <v-btn elevation="1" dark color="#000" fab >  <v-icon >mdi-arrow-top-right-thick</v-icon></v-btn>
           </a>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 hidden md:block" style="borer: 1px solid blue">
      <div class="flex flex-col h-full w-full">
        <div class="grid grid-cols-3 gap-10">
          <div class="text-center">
            <nuxt-link class="block" to="/">
              <v-btn
                large
                icon
                @click="tab = 0"
                :color="tab != 0 ? 'grey' : '#fff'"
                elevation="0"
              >
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </nuxt-link>
          </div>

          <div>
            <nuxt-link class="text-center" to="/work">
              <i class="md:hidden">
                <v-btn
                  large
                  icon
                  @click="tab = 1"
                  :color="tab != 1 ? 'grey' : '#fff'"
                  elevation="0"
                >
                  <v-icon>mdi-view-comfy</v-icon>
                </v-btn>
              </i>

              <span class="hidden md:block">
                <v-btn
                  large
                  outlined
                  block
                  rounded
                  elevation="0"
                  link
                  @click="tab = 1"
                  :color="tab != 1 ? 'grey' : '#fff'"
                >
                  Work
                </v-btn>
              </span>
            </nuxt-link>
          </div>

          <div>
            <a
              href="https://my.indeed.com/p/overcomere-my85kbn"
              target="_blank"
            >
              <i class="md:hidden">
                <v-btn large icon rounded color="grey" elevation="0">
                  <v-icon>mdi-arrow-top-right-thick</v-icon>
                </v-btn>
              </i>

              <span class="hidden md:block">
                <v-btn text elevation="0" block color="grey" rounded large>
                  Resume
                  <v-icon right>mdi-arrow-top-right-thick</v-icon>
                </v-btn>
              </span>
            </a>
          </div>
        </div>

        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dd: "<Xceldeveloper/>",
      tab: 0,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  min-height: 100vh;
  background-color: #131111;
}

.logo {
  padding: 5px;
  box-shadow: 1px 0px 10px #fff;
  animation: avataranim 4s infinite;
  -webkit-animation: avataranim 4s infinite;
  /* Safari 4+ */
  -moz-animation: avataranim 4s infinite;
  /* Fx 5+ */
  -o-animation: avataranim 4s infinite;
}

@keyframes avataranim {
  0% {
    box-shadow: 0px 1px 8px rgba(255, 255, 255, 0.8);
  }

  30% {
    box-shadow: 0px 1px 18px rgba(255, 255, 255, 0.7);
  }

  70% {
    box-shadow: 0px 1px 5px rgba(255, 255, 255, 0.8);
  }

  100% {
    box-shadow: 0px 1px 18px rgba(255, 255, 255, 0.8);
  }
}

#quote-x {
  font-size: 15px;
  display: block;
}
</style>
