<template>
  <div class="title">{{ $t("title") }}</div>
  <div class="web">
    <div class="alert alert-info">This app is meant to be used on a smartphone or a tablet...</div>
  </div>
  <div class="mobile">
    <div class="router-view">
      <router-view />
    </div>
  </div>
  <!-- {{ $i18n.locale }} -->
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
        font-family: "Lobster Two", cursive;
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

        .title {
          position: fixed;
          top: 5vw;
          width: 100%;
          text-align: center;
          font-size: 15vw;
        }

        .web {
          display: none;
        }

        .mobile {
          display: block;
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
          }

          .mobile {
            display: none;
          }
        }
      }
    }
  }
</style>
