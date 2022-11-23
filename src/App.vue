<template>
  <!-- <audio ref="ambiance" id="ambiance_audio" hidden preload loop muted>
    <source src="./assets/loop_forest-stream-birds-sound.mp3" />
  </audio> -->
  <div class="appname">{{ $t("title") }}</div>
  <div class="router-view">
    <router-view />
  </div>
  <div class="disclaimer">I was greatly inspired by the famous relaxation application called <a href="https://www.calm.com/fr" target="_blank" rel="noopener noreferrer">Calm</a> when i wrote this app.</div>
</template>

<script>
  import { mapState, mapGetters } from "vuex";
  import { getSupportedLocales } from "./locales/helper";
  import { getBrowserLocale } from "./locales/helper";

  export default {
    name: "App",
    beforeCreate() {
      this.$store.commit("initializeFromLocalStorage");
    },
    data() {
      return {
        locales: getSupportedLocales(),
        browserLocale: getBrowserLocale({ countryCodeOnly: true }),
      };
    },
    methods: {
      setLocale(locale) {
        console.debug("🌐 Previous $i18n.locale : " + this.$i18n.locale);
        this.$store.commit({
          type: "setUserLocale",
          locale: locale,
        });
        this.$i18n.locale = locale;
      },
    },
    mounted() {
      console.debug("🌐 userLocale = " + this.$store.state.userLocale + " / i18n.locale = " + this.$i18n.locale);
      if (this.userLocale !== "" && this.userLocale != undefined && this.userLocale != null) {
        console.debug("🌐 using userLocale");
        this.setLocale(this.userLocale);
      } else {
        console.debug("🌐 using browserLocale");
        this.setLocale(this.browserLocale);
      }
    },
    computed: {
      ...mapState({
        userLocale: (state) => state.userLocale,
        breathTechnique: (state) => state.breathTechnique,
        breathTechniques: (state) => state.breathTechniques,
      }),
    },
  };
</script>

<style lang="less">
  @import url("@/assets/style/variables.less");

  html,
  body {
    padding: 0px;
    margin: 0px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  html {
    body {
      font-size: @font-size;
      background: url("./assets/images/background.jpg") center bottom no-repeat;
      background-size: cover;

      * {
        font-family: @font-text;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow: hidden;
      }

      #app {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;

        .appname {
          text-align: center;
          font-size: 5rem;
          font-family: @font-title;

          color: @text-color-light;
          text-shadow: @shadow-light;
        }

        .router-view {
          width: 100%;
          color: @text-color;
          text-shadow: @shadow;
        }

        .disclaimer {
          font-size: 1rem;
          text-align: center;
          padding: 10px;
          color: @text-color-light;
          text-shadow: @shadow-light;

          a {
            color: inherit;
            text-decoration: none;
            font-size: inherit;
          }
        }
      }
    }
  }

  @media (max-width: @screen-xs-max) {
    html {
      body {
        #app {
          padding: 10px;

          .disclaimer {
            font-size: 0.7rem !important;
          }
        }
      }
    }
  }
</style>
