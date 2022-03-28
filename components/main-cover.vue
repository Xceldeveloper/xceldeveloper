<template>
  <div style="width: 100%">
    <v-responsive :aspect-ratio="16 / 9" max-height="80vh">
      <v-card class="cover-area" v-intersect="onIntersect">
        <img class="cover-image" src="~assets/images/cover.jpg" />
        <div class="cover-box">
          <div id="social-box">
            <ul id="soc-btn">
              <li>
                <v-btn
                  color="#fff"
                  icon
                  class="social-btn animate__animated animate__bounceInLeft "
                  ><v-icon large>mdi-twitter</v-icon></v-btn
                >
              </li>
              <li>
                <v-btn
                  color="#fff"
                  icon
                  class="social-btn animate__animated animate__bounceInLeft animate_delay2s 2s"
                  ><v-icon large>mdi-github</v-icon></v-btn
                >
              </li>
              <li>
                <v-btn
                  color="#fff"
                  icon
                  class="social-btn animate__animated animate__bounceInLeft animate_delay3s 3s"
                  ><v-icon large>mdi-gmail</v-icon></v-btn
                >
              </li>
              <li>
                <v-btn
                  color="#fff"
                  icon
                  class="social-btn animate__animated animate__bounceInLeft animate_delay4s 4s"
                  ><v-icon large>mdi-linkedin</v-icon></v-btn
                >
              </li>

              <li>
                <v-btn
                  color="#fff"
                  icon
                  class="social-btn animate__animated animate__bounceInLeft animate_delay5s 5s"
                  ><v-icon large>mdi-phone</v-icon></v-btn
                >
              </li>
            </ul>
          </div>
          <div id="name-cover" class="">
            <img id="avatar" src="/logo.jpg" alt="" />
            <div>
              <vue-typed-js
                :showCursor="false"
                :typeSpeed="50"
                :strings="['Hello, I\'m']"
              >
                <span class="typing" id="greet"></span
              ></vue-typed-js>
              <vue-typed-js
                :showCursor="false"
                :startDelay="1100"
                :typeSpeed="120"
                :strings="['Overcomer Emiator.']"
              >
                <span class="typing" id="my-name"></span
              ></vue-typed-js>
              <vue-typed-js
                :startDelay="3800"
                :typeSpeed="100"
                cursorChar=" _"
                :strings="[
                  'A Passionate Programmer',
                  'I am awesome',
                  'I am Colaborative',
                  'I follow best Practices',
                  'A tech Enthusiats',
                ]"
                :loop="true"
              >
                <span class="typing" id="quote-x"></span>
              </vue-typed-js>
            </div>
          </div>
        </div>
      </v-card>
    </v-responsive>
  </div>
</template>

<script>
import animatecss from "animate.css";
export default {
  components: {
    // ES6; property shorthand + Vue should automatically dasherize the key for us
  },
  data() {
    return {};
  },
  methods: {
    onIntersect(entries, observer) {
      this.$emit("hidden", entries[0].isIntersecting);
      console.log(entries[0].isIntersecting + "...inter");
    },
  },
};
</script>

<style lang="scss" scoped>
.cover-area {
  width: 100%;
  height: 100%;
  position: relative;
}

.cover-image {
  position: absolute;
  width: 100%;
  top: 0p;
  z-index: 5;
  object-fit: cover;
}
.cover-box {
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  top: 0px;
  display: flex;
}

#social-box {
  z-index: 5;
  width: 50px;
  left: 5px;
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 10px 0px 20px;
}

#soc-btn {
  list-style-type: none;
  padding: 0px;
  margin: 0px;
}

#soc-btn li {
  margin: 20px 0px;
}

#name-cover {
  margin: 0px 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 10px 0px 200px;
}

#greet {
  font-size: 25px;
  display: block;
}

#my-name {
  font-size: 50px;
  font-weight: bold;
  display: block;
}

#quote-x {
  font-size: 15px;
  display: block;
}

#avatar {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: #fff;
  padding: 2px;
  border: 5px solid #000;
  box-shadow: 0px 1px 1px #fff;
  display: none;
}

.social-btn {
  padding: 28px;
  box-shadow: 2px 0px 3px #fff;
  outline-style: none;
}
</style>