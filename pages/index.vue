<template>
  <div id="wrapper">
    <!-- navbar-->

    <div class="nav-wrapper">
      <v-app-bar color="#121212" elevation="0" dense>
        <v-toolbar-title data-aos="zoom-in">Xceldeveloper</v-toolbar-title>

        <v-spacer></v-spacer>
        <a href="#profile">
          <v-btn text rounded data-aos="fade-left">
            <span v-if="!isMobile">Me</span>
            <v-icon v-else>mdi-account</v-icon>
          </v-btn>
        </a>
        <a href="#work" v-if="!isMobile">
          <v-btn text rounded data-aos="fade-left">
            <span v-if="!isMobile">Work</span>
            <v-icon v-else>mdi-graph</v-icon>
          </v-btn>
        </a>
        <a href="#project" data-aos="fade-left">
          <v-btn text rounded>
            <span v-if="!isMobile">Projects</span>
            <v-icon v-else>mdi-view-comfy</v-icon>
          </v-btn>
        </a>
        <a href="#contact" data-aos="fade-left">
          <v-btn text rounded>
            <span v-if="!isMobile">Contact</span>
            <v-icon v-else>mdi-chat</v-icon>
          </v-btn>
        </a>
      </v-app-bar>
    </div>

    <div id="wrappery">
      <v-card class="profile">
        <div class="details-wrapper">
          <img
            data-aos="zoom-in"
            id="profile"
            src="~/static/icon.jpg"
            alt="logo"
          />

          <span class="name"> Overcomer Emiator </span>

          <span class="type-of-developer">
            <v-chip link outlined style="margin: 5px auto">
              Frontend Developer
            </v-chip>

            <v-chip link outlined style="margin: 5px auto">
              Backend Developer
            </v-chip>

            <v-chip link outlined style="margin: 5px auto">
              Android Developer
            </v-chip>
          </span>

          <div class="short-info">
            I design simple beautiful software Applications ranging from
            <b>Websites</b>, <b>Blogs</b> to <b>Android</b> Apps using a variety
            software Technologies such as <b>Nuxt/Vuejs</b> , <b>JQuery</b>,
            <b>Nativescript</b>, <b>Django</b>.
            <p>I love talking about tech related topics</p>
          </div>

          <div class="skills">
            <v-chip link outlined style="margin: 5px auto">
              <v-icon left>mdi-vuejs</v-icon> Vue
            </v-chip>
            <v-chip link outlined> <v-icon left>mdi-nuxt</v-icon> Nuxt </v-chip>

            <v-chip link outlined style="margin: 5px auto">
              <v-icon left>mdi-vuetify</v-icon> Vuetify
            </v-chip>
            <v-chip outlined style="margin: 5px auto">
              <v-icon left>mdi-nativescript</v-icon> Nativescript
            </v-chip>
            <v-chip link outlined style="margin: 5px auto">
              <v-icon left>mdi-jquery</v-icon> JQuery
            </v-chip>
            <v-chip link outlined style="margin: 5px auto">
              <v-icon left>mdi-materializecss</v-icon> Materialiizecss
            </v-chip>
            <!-- <v-chip link outlined style="margin: 5px auto">
              <v-icon>mdi-flutter</v-icon> Flutter
            </v-chip> -->
            <v-chip link outlined style="margin: 5px auto">
              <v-icon left>mdi-django</v-icon> Django
            </v-chip>
          </div>

          <div class="languages">
            <v-chip link outlined style="margin: 5px auto">
              <v-icon left>mdi-language-javascript</v-icon> Javascript
            </v-chip>

            <v-chip link outlined style="margin: 5px auto">
              <v-icon left>mdi-language-typescript</v-icon> Typescript
            </v-chip>

            <v-chip link outlined style="margin: 5px auto">
              <v-icon left>mdi-language-java</v-icon> Java
            </v-chip>

            <v-chip link outlined style="margin: 5px auto">
              <v-icon left>mdi-language-kotlin</v-icon> Kotlin
            </v-chip>

            <v-chip link outlined style="margin: 5px auto">
              <v-icon left>mdi-language-python</v-icon> Python
            </v-chip>

            <!-- <v-chip link outlined style="margin: 5px auto">
              <v-icon left>mdi-language-dart</v-icon> Dart
            </v-chip> -->
          </div>

          <v-card-actions>
            <v-btn
              block
              data-aos="flip-up"
              text
              outlined
              rounded
              @click="openNewPage('/resume')"
              ><v-icon left>mdi-account</v-icon> Resume
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>

      <v-card class="work" id="work">
        <v-card-title> <v-icon left>mdi-graph</v-icon>Work</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col
              :cols="isMobile ? 12 : 6"
              :data-aos="isMobile ? 'fade-up' : 'fade-right'"
            >
              <v-hover v-slot:default="{ hover }" close-delay="200">
                <v-card class="box" :elevation="hover ? 16 : 2">
                  <v-card-title>Internship </v-card-title>
                  <v-card-subtitle>2019</v-card-subtitle>
                  <v-card-text>
                    I did my Internship at Ambrose Ali University ICT
                    Department...
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>

            <v-col
              :cols="isMobile ? 12 : 6"
              :data-aos="isMobile ? 'fade-up' : 'fade-left'"
            >
              <v-hover v-slot:default="{ hover }" close-delay="200">
                <v-card class="box" :elevation="hover ? 16 : 2">
                  <v-card-title>FrontEnd Engineer </v-card-title>
                  <v-card-subtitle>2020</v-card-subtitle>
                  <v-card-text>
                    Am a Frontend Developer working at 2GFields... working in a
                    division called Pord
                  </v-card-text>
                  <v-card-actions>
                    <a href="https://pord.com.ng">
                      <v-btn small text link
                        ><v-icon left>mdi-link</v-icon> Link</v-btn
                      >
                    </a>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>

            <v-col
              :cols="isMobile ? 12 : 6"
              :data-aos="isMobile ? 'fade-up' : 'fade-right'"
            >
              <v-hover v-slot:default="{ hover }" close-delay="200">
                <v-card class="box" :elevation="hover ? 16 : 2">
                  <v-card-title>FullStack Engineer </v-card-title>
                  <v-card-subtitle>2020</v-card-subtitle>
                  <v-card-text>
                    Senior Software Engineer at MAwaters Enterprise helping to
                    <b>Build</b> and <b>Manage</b> their <b>Website</b> and
                    <b>Android</b> Applications for their day to day business
                  </v-card-text>
                  <v-card-actions>
                    <a href="https://mawatersapp.web.app/"
                      ><v-btn small text link
                        ><v-icon left>mdi-link</v-icon> Link</v-btn
                      ></a
                    >
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>
            <v-col
              :cols="isMobile ? 12 : 6"
              :data-aos="isMobile ? 'fade-up' : 'fade-left'"
            >
              <v-hover v-slot:default="{ hover }" close-delay="200">
                <v-card class="box" :elevation="hover ? 16 : 2">
                  <v-card-title>Hackathon </v-card-title>
                  <v-card-subtitle>2020</v-card-subtitle>
                  <v-card-text>
                    Team Lead at Saucecode2020 Hackathon Competetion
                  </v-card-text>
                  <v-card-actions>
                    <a href="https://arcadialive.netlify.app/"
                      ><v-btn small text link
                        ><v-icon left>mdi-link</v-icon> Link</v-btn
                      ></a
                    >
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="project" id="project">
        <v-card-title
          ><v-icon left>mdi-view-comfy</v-icon> Projects</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col
              :cols="isMobile ? 12 : 6"
              :data-aos="isMobile ? 'fade-up' : 'fade-right'"
            >
              <v-hover v-slot:default="{ hover }" close-delay="200">
                <v-card class="box" :elevation="hover ? 16 : 2">
                  <v-card-title>Xceldeveloper</v-card-title>
                  <v-card-text> My Website... </v-card-text>
                  <v-card-subtitle>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-vuejs</v-icon> Vuejs
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-nuxt</v-icon> Nuxtjs
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-nuxt</v-icon> Vuetify
                    </v-chip>
                    <!-- <v-chip link outlined small style="margin: 5px auto">
                      <v-icon left small>mdi-firebase</v-icon> Firebase
                    </v-chip> -->
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <!-- <v-btn small text link
                      ><v-icon left>mdi-github</v-icon> github</v-btn
                    > -->
                    <a href="/">
                      <v-btn text link small
                        ><v-icon left>mdi-eye</v-icon> live</v-btn
                      >
                    </a>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>

            <v-col
              :cols="isMobile ? 12 : 6"
              :data-aos="isMobile ? 'fade-up' : 'fade-left'"
            >
              <v-hover v-slot:default="{ hover }" close-delay="200">
                <v-card class="box" :elevation="hover ? 16 : 2">
                  <v-card-title>XcelMusic </v-card-title>
                  <v-card-text>
                    Cool Android Music Player with nice features...
                  </v-card-text>
                  <v-card-subtitle>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-language-java</v-icon> Java
                    </v-chip>
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <!-- <v-btn small text link
                      ><v-icon left>mdi-github</v-icon> github</v-btn
                    > -->
                    <a
                      href="https://appgrooves.com/publisher/Xceldeveloper/xceldeveloper"
                    >
                      <v-btn text link small
                        ><v-icon left>mdi-eye</v-icon> live</v-btn
                      >
                    </a>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>

            <v-col
              :cols="isMobile ? 12 : 6"
              :data-aos="isMobile ? 'fade-up' : 'fade-right'"
            >
              <v-hover v-slot:default="{ hover }" close-delay="200">
                <v-card class="box" :elevation="hover ? 16 : 2">
                  <v-card-title>XcelVideo </v-card-title>
                  <v-card-text>
                    Cool Android Music Player with nice features...
                  </v-card-text>
                  <v-card-subtitle>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-language-kotlin</v-icon> Kotlin
                    </v-chip>
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <!-- <v-btn small text link
                      ><v-icon left>mdi-github</v-icon> github</v-btn
                    > -->
                  </v-card-actions>
                  <span class="dev-mode">under development</span>
                </v-card>
              </v-hover>
            </v-col>

            <v-col
              :cols="isMobile ? 12 : 6"
              :data-aos="isMobile ? 'fade-up' : 'fade-left'"
            >
              <v-hover v-slot:default="{ hover }" close-delay="200">
                <v-card class="box" :elevation="hover ? 16 : 2">
                  <v-card-title>MAwaters webapp </v-card-title>
                  <v-card-text> A Website for a Client Company... </v-card-text>
                  <v-card-subtitle>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-vuejs</v-icon> Vuejs
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-nuxt</v-icon> Nuxtjs
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-nuxt</v-icon> Vuetify
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-database</v-icon> Postgresql
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-digital-ocean</v-icon> Digital
                      Ocean
                    </v-chip>
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <a href="https://mawatersapp.web.app/">
                      <v-btn text link small
                        ><v-icon left>mdi-eye</v-icon> live</v-btn
                      >
                    </a>
                  </v-card-actions>
                  <span class="dev-mode">under development</span>
                </v-card>
              </v-hover>
            </v-col>

            <v-col
              :cols="isMobile ? 12 : 6"
              :data-aos="isMobile ? 'fade-up' : 'fade-right'"
            >
              <v-hover v-slot:default="{ hover }" close-delay="200">
                <v-card class="box" :elevation="hover ? 16 : 2">
                  <v-card-title>MAwaters Androidapp </v-card-title>
                  <v-card-text>
                    An Android App for a Client Company...
                  </v-card-text>
                  <v-card-subtitle>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-language-kotlin</v-icon> Kotlin
                    </v-chip>
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-actions> </v-card-actions>
                  <span class="dev-mode">under development</span>
                </v-card>
              </v-hover>
            </v-col>

            <v-col
              :cols="isMobile ? 12 : 6"
              :data-aos="isMobile ? 'fade-up' : 'fade-left'"
            >
              <v-hover v-slot:default="{ hover }" close-delay="200">
                <v-card class="box" :elevation="hover ? 16 : 2">
                  <v-card-title>Project Amber </v-card-title>
                  <v-card-text>
                    A sleek solo social media webapp...
                  </v-card-text>
                  <v-card-subtitle>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-vuejs</v-icon> Vuejs
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-nuxt</v-icon> Nuxtjs
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-nuxt</v-icon> Vuetify
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-database</v-icon> Postgresql
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-digital-ocean</v-icon> Digital
                      Ocean
                    </v-chip>
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <a href="https://github.com/Xceldeveloper/socials">
                      <v-btn> <v-icon left>mdi-github</v-icon> github</v-btn>
                    </a>

                    <a href="https://xcelsocials.netlify.app/home">
                      <v-btn text link small
                        ><v-icon left>mdi-eye</v-icon> live</v-btn
                      >
                    </a>
                  </v-card-actions>
                  <span class="dev-mode">under development</span>
                </v-card>
              </v-hover>
            </v-col>

            <v-col
              :cols="isMobile ? 12 : 6"
              :data-aos="isMobile ? 'fade-up' : 'fade-right'"
            >
              <v-hover v-slot:default="{ hover }" close-delay="200">
                <v-card class="box" :elevation="hover ? 16 : 2">
                  <v-card-title>Web Video player </v-card-title>
                  <v-card-text>
                    Cool web video player with screenshot capability and other
                    cool features...
                  </v-card-text>
                  <v-card-subtitle>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-language-html5</v-icon>Html 5
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-language-css3</v-icon> Css 3
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left>mdi-language-javascript</v-icon> Vanilla JS
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-jquery</v-icon> JQuery
                    </v-chip>
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <a href="https://github.com/Xceldeveloper/web-videoplayer">
                      <v-btn small text link
                        ><v-icon left>mdi-github</v-icon> github</v-btn
                      >
                    </a>

                    <a href="https://xcelvideoplayer-web.netlify.app/">
                      <v-btn text link small
                        ><v-icon left>mdi-eye</v-icon> live</v-btn
                      >
                    </a>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>

            <v-col
              :cols="isMobile ? 12 : 6"
              :data-aos="isMobile ? 'fade-up' : 'fade-left'"
            >
              <v-hover v-slot:default="{ hover }" close-delay="200">
                <v-card class="box" :elevation="hover ? 16 : 2">
                  <v-card-title>Web Audio player </v-card-title>
                  <v-card-text> Cool web Audio player... </v-card-text>
                  <v-card-subtitle>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-language-html5</v-icon>Html 5
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-language-css3</v-icon> Css 3
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left>mdi-language-javascript</v-icon> Vanilla JS
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-jquery</v-icon> JQuery
                    </v-chip>
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <a href="https://github.com/Xceldeveloper/web-audioplayer">
                      <v-btn small text link
                        ><v-icon left>mdi-github</v-icon> github</v-btn
                      >
                    </a>
                    <a href="https://xcelaudioplayer-web.netlify.app/">
                      <v-btn text link small
                        ><v-icon left>mdi-eye</v-icon> live</v-btn
                      >
                    </a>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>

            <v-col
              :cols="isMobile ? 12 : 6"
              :data-aos="isMobile ? 'fade-up' : 'fade-right'"
            >
              <v-hover v-slot:default="{ hover }" close-delay="200">
                <v-card class="box" :elevation="hover ? 16 : 2">
                  <v-card-title>Text Editor </v-card-title>
                  <v-card-text> Simple text editor... </v-card-text>
                  <v-card-subtitle>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-language-html5</v-icon>Html 5
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-language-css3</v-icon> Css 3
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left>mdi-language-javascript</v-icon> Vanilla JS
                    </v-chip>
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <a href="https://github.com/Xceldeveloper/web-text-editor">
                      <v-btn small text link
                        ><v-icon left>mdi-github</v-icon> github</v-btn
                      ></a
                    >
                    <a href="https://xceldeveloper-web-texteditor.netlify.app/">
                      <v-btn text link small
                        ><v-icon left>mdi-eye</v-icon> live</v-btn
                      >
                    </a>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>

            <v-col
              :cols="isMobile ? 12 : 6"
              :data-aos="isMobile ? 'fade-up' : 'fade-left'"
            >
              <v-hover v-slot:default="{ hover }" close-delay="200">
                <v-card class="box" :elevation="hover ? 16 : 2">
                  <v-card-title>Web Automated Quiz </v-card-title>
                  <v-card-text
                    >Automated quiz with cool questions...
                  </v-card-text>
                  <v-card-subtitle>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-vuejs</v-icon>Vue
                    </v-chip>
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <a href="https://github.com/Xceldeveloper/web-quiz-app">
                      <v-btn small text link
                        ><v-icon left>mdi-github</v-icon> github</v-btn
                      >
                    </a>
                    <a href="https://xcelquiz.netlify.app/">
                      <v-btn text link small
                        ><v-icon left>mdi-eye</v-icon> live</v-btn
                      >
                    </a>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>

            <v-col
              :cols="isMobile ? 12 : 6"
              :data-aos="isMobile ? 'fade-up' : 'fade-right'"
            >
              <v-hover v-slot:default="{ hover }" close-delay="200">
                <v-card class="box" :elevation="hover ? 16 : 2">
                  <v-card-title>GPA Calculator</v-card-title>
                  <v-card-text>Simple GPA calculator... </v-card-text>
                  <v-card-subtitle>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-vuejs</v-icon>Vue
                    </v-chip>
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <a
                      href="https://github.com/Xceldeveloper/web-gpa-calculator"
                    >
                      <v-btn small text link
                        ><v-icon left>mdi-github</v-icon> github</v-btn
                      >
                    </a>
                    <a href="https://xcelgpacalculator.netlify.app/">
                      <v-btn text link small
                        ><v-icon left>mdi-eye</v-icon> live</v-btn
                      >
                    </a>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>

            <v-col
              :cols="isMobile ? 12 : 6"
              :data-aos="isMobile ? 'fade-up' : 'fade-left'"
            >
              <v-hover v-slot:default="{ hover }" close-delay="200">
                <v-card class="box" :elevation="hover ? 16 : 2">
                  <v-card-title>Web Video Camera </v-card-title>
                  <v-card-text
                    >Snap pictures and record videos with cool
                    features...</v-card-text
                  >
                  <v-card-subtitle>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-language-html5</v-icon>Html 5
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left small>mdi-language-css3</v-icon> Css 3
                    </v-chip>
                    <v-chip small link outlined style="margin: 5px auto">
                      <v-icon left>mdi-language-javascript</v-icon> Vanilla JS
                    </v-chip>
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <a href="https://github.com/Xceldeveloper/web-camera">
                      <v-btn small text link
                        ><v-icon left>mdi-github</v-icon> github</v-btn
                      ></a
                    >
                    <a href="https://xceldeveloper-webcam.netlify.app/">
                      <v-btn text link small
                        ><v-icon left>mdi-eye</v-icon> live</v-btn
                      >
                    </a>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <br />
    </div>

    <div class="footerx">
      <v-row class="fill-height ma-0" align="center" justify="center">
        <div class="contact-wrapper" id="contact" data-aos="zoom-in">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a v-on="on" href="mailto:xceldeveloper@gmail.com"
                ><v-btn large icon><v-icon>mdi-gmail</v-icon></v-btn></a
              >
            </template>
            <span>xceldeveloper@gmail.com</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a v-on="on" href="https://twitter.com/xceldeveloper"
                ><v-btn large icon><v-icon>mdi-twitter</v-icon></v-btn></a
              >
            </template>
            <span>xceldeveloper</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a
                v-on="on"
                href="https://linkedin.com/in/overcomer-emiator-5573141b2"
                ><v-btn large icon><v-icon>mdi-linkedin</v-icon></v-btn></a
              >
            </template>
            <span>Overcomer Emiator</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a v-on="on" href="https://instagram.com/xceldeveloper"
                ><v-btn large icon><v-icon>mdi-instagram</v-icon></v-btn></a
              >
            </template>
            <span>xceldeveloper</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a v-on="on" href="https://github.com/xceldeveloper"
                ><v-btn large icon><v-icon>mdi-github</v-icon></v-btn></a
              >
            </template>
            <span>xceldeveloper</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a v-on="on" href="https://wa.me/2348158696460"
                ><v-btn large icon><v-icon>mdi-whatsapp</v-icon></v-btn></a
              >
            </template>
            <span>+2348158696460</span>
          </v-tooltip>
        </div>

        <span class="full-year"
          ><v-icon right>mdi-copyright</v-icon> xceldeveloper
          {{ new Date().getFullYear() }}</span
        >
      </v-row>
    </div>
  </div>
</template>

<script>
import device_mixin from '~/mixins/device_mixin.js'
import navigation_mixin from '~/mixins/navigation_mixin.js'

export default {
  mixins: [device_mixin, navigation_mixin],
  data() {
    return {
      avatar: require('~/static/icon.jpg'),
    }
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
#wrapper {
  width: 100%;
  height: 100vh;
  background-color: transparent;
}

#wrappery {
  width: 100%;
  background-color: #121212;
  // min-height: calc(100vh - 50px);
  height: auto;
  margin: 50px 0px 0px 0px; //faker for navbar so animtion can work
}

.nav-wrapper {
  padding: 0px;
  height: 50px;
  width: 100%;
  position: fixed;
  z-index: 100;
  top: 0px;
  padding: 0px;
  margin: 0px;
  height: 50px;
}

.footerx {
  width: 100%;
  height: auto;
  padding: 50px 0px;
  background-color: #101010;
}

.contact-wrapper {
  border: 1px solid #fff;
  padding: 3px 10px;
  border-radius: 30px;
}

.full-year {
  display: block;
  width: 100%;
  text-align: center;
  margin: 20px auto;
}

a {
  text-decoration: none;
}

.details-wrapper .name {
  display: block;
  width: 100%;
  font-size: 20px;
  font-weight: block;
  font-family: sans-serif;
  text-align: center;
  margin: 25px auto;
}

.short-info {
  word-spacing: 0px;
}

.short-info b {
  color: #fff;
}

.box {
  height: auto;
  background-color: #121212;
}

.dev-mode {
  color: #eeddee;
  font-size: 12px;
  display: block;
  width: 100%;
  text-align: right;
  padding: 5px;
}

@media screen and (min-width: 767px) {
  *::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgb(17, 17, 17);
  }

  *::-webkit-scrollbar {
    width: 10px;
    background-color: rgb(17, 17, 17);
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgb(17, 17, 17);
    border: 1px solid #7c7b7b;
    border-radius: 1px;
  }

  .profile {
    margin: 50px auto;
    margin-top: 200px;
    width: 90%;
    max-width: 850px;
    height: 700px;
    background-color: #101010;
    position: relative;
  }

  .project,
  .work {
    margin: 50px auto;
    margin-top: 50px;
    width: 90%;
    max-width: 850px;
    height: auto;
    background-color: #101010;
  }

  .details-wrapper {
    width: 100%;
    height: 300px;
    position: absolute;
    top: -100px;
  }

  .profile img {
    display: block;
    height: 250px;
    width: 250px;
    border-radius: 50%;
    margin: auto;
    box-shadow: 0px 2px 3px rgba(255, 255, 255, 0.6);
  }

  .type-of-developer,
  .short-info,
  .skills,
  .languages {
    text-align: center;
    display: block;
    margin: 30px auto;
    width: 70%;
    word-spacing: 5px;
    color: rgb(201, 201, 201);
  }
}

@media screen and (min-width: 320px) and (max-width: 767px) {
  .profile {
    margin: 50px auto;
    margin-top: 60px;
    width: 99%;
    height: auto;
    padding: 5px;
    background-color: #101010;
  }

  .project,
  .work {
    margin: 50px auto;
    margin-top: 50px;
    width: 99%;
    max-width: 850px;
    height: auto;
    background-color: #101010;
  }

  .details-wrapper {
    width: 100%;
    height: auto;
  }

  .profile img {
    display: block;
    height: 150px;
    width: 150px;
    border-radius: 50%;
    margin: auto;
    box-shadow: 0px 2px 3px rgba(255, 255, 255, 0.6);
  }

  .type-of-developer,
  .short-info,
  .skills,
  .languages {
    text-align: center;
    display: block;
    margin: 30px auto;
    width: 95%;
    word-spacing: 3px;
    color: rgb(201, 201, 201);
  }
}
</style>