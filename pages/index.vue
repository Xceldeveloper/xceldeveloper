<template>

  <div class="page p-14 gap-10 grid grid-cols-2">

    <div class="flex items-center">

      <div class="w-full">

        <img class="w-52 h-52 rounded-full logo" src="/icon.jpg" alt="" />

        <span class="block text-white text-4xl mt-5">Overcomer Emiator</span>

        <span class="text-gray-400 block font-semibold"> {{dd}} </span>

        <span class="block tracking-wider text-left text-gray-400 my-5">

          <vue-typed-js
            :startDelay="3000"
            :typeSpeed="30"
            cursorChar=" _"
            :strings="[
              `  Hi, I am a passionate developer with good experience designing Webapps,
          Blogs, Android Apps, Opensource Projects etc utilizing varieties of Software
          Technologies which include Vuejs, Nuxt, Flutter, Nodejs, Django, JQuery,
          Tailwindcss, Scss, Git I have experience working remotely building meaningful
          and productive software with also the ability to work with minimal supervision
          as I have the zeal to tackle any problems I might encounter independently
          to achieve the desired result`,
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

      </div>

    </div>

    <div>

      <div class="grid grid-cols-3 gap-10">

        <v-btn
          large
          text
          @click="tab = 0"
          :color="tab != 0 ? 'grey' : '#fff'"
          elevation="0"
          rounded
        >

          <v-icon>mdi-account</v-icon>

        </v-btn>

        <v-btn
          large
          outlined
          elevation="0"
          @click="tab = 1"
          :color="tab != 1 ? 'grey' : '#fff'"
          rounded
        >
           Work
        </v-btn>

        <a
          href="http://https://my.indeed.com/p/overcomere-my85kbn"
          target="_blank"
        >

          <v-btn text elevation="0" color="grey" rounded large>
             Resume
            <v-icon right>mdi-arrow-top-right-thick</v-icon>

          </v-btn>

        </a>

      </div>

    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      dd: "<A Passionate Programmer/>",
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

