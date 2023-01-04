<template>
  <!-- <audio ref="ambiance" id="ambiance_audio" hidden preload loop muted>
    <source src="./assets/loop_forest-stream-birds-sound.mp3" />
  </audio> -->
  <Menu />
  <div class="router-view">
    <router-view />
  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex";
  import { getSupportedLocales } from "./locales/helper";
  import { getBrowserLocale } from "./locales/helper";
  import Menu from "@/components/Menu.vue";

  export default {
    name: "App",
    beforeCreate() {
      this.$store.commit("initializeFromLocalStorage");
    },
    components: {
      Menu,
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

        .router-view {
          position: absolute;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          color: @text-color;
          text-shadow: @shadow;
        }
      }
    }
  }

  @media (max-width: @screen-xs-max) {
    html {
      body {
        .router-view {
          padding: 10px;
        }
      }
    }
  }
</style>
