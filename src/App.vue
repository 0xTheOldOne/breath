<template>
  <div class="appname">{{ $t("title") }}</div>
  <div class="web">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <div class="alert alert-info" style="font-size: 14px">This app is meant to be used on a smartphone or a tablet...</div>
        </div>
      </div>
    </div>
  </div>
  <div class="mobile">
    <div class="router-view">
      <router-view />
    </div>
  </div>
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
      font-size: 5vw;
      background: url("./assets/background.jpg") center bottom no-repeat;
      background-size: cover;

      * {
        font-family: "Montserrat", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: white;
        text-shadow: 0px 0px 10px fade(black, 50%);
        overflow: hidden;
      }

      .alert {
        font-family: Arial, Helvetica, sans-serif;
      }

      #app {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;

        .appname {
          position: fixed;
          top: 5vh;
          width: 100%;
          text-align: center;
          font-size: 15vw;
          font-family: "Lobster Two", cursive;
        }

        .web {
          display: none;
        }

        .mobile {
          display: block;
          width: 100%;
        }
      }
    }
  }

  @media (min-width: 913px) {
    html {
      body {
        #app {
          .web {
            display: block;
            width: 100%;
          }

          .mobile {
            display: none;
          }
        }
      }
    }
  }
</style>
