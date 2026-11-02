<template>
  <div class="menu-container">
    <div class="appname">{{ $t("title") }}</div>
    <button type="button" class="menu-toggle" :aria-label="$t(open ? 'actions.closeMenu' : 'actions.openMenu')" :aria-expanded="open" aria-controls="menu-content" v-on:click="open = !open">
      <PhX v-if="open" />
      <PhList v-else />
    </button>
    <div id="menu-content" :class="menuContentClass">
      <div class="container">
        <!-- <div class="row">
          <div class="col-xs-12">
            <SoundSelector />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <div class="separator"></div>
          </div>
        </div> -->
        <div class="row">
          <div class="col-xs-12">
            <div class="disclaimer">
              <h3>{{ $t("disclaimer.title") }}</h3>
              <i18n-t keypath="disclaimer.text" tag="span" scope="global">
                <template #calm>
                  <a href="https://www.calm.com/fr" target="_blank" rel="noopener noreferrer">Calm</a>
                </template>
              </i18n-t>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { PhList, PhX } from "@phosphor-icons/vue";
  import SoundSelector from "@/components/SoundSelector.vue";

  export default {
    name: "Menu",
    components: {
      // eslint-disable-next-line vue/no-unused-components -- kept while its block is commented out in the template
      SoundSelector,
      PhList,
      PhX,
    },
    data() {
      return {
        open: false,
      };
    },
    computed: {
      ...mapState({}),
      menuContentClass() {
        var cssClass = "menu";
        if (this.open) {
          cssClass += " show";
        }
        return cssClass;
      },
    },
    methods: {},
  };
</script>

<style lang="less" scoped>
  @import url("@/assets/style/variables.less");

  .menu-container {
    @hamburger-size: 1.75rem;
    width: 100%;

    .appname {
      text-align: center;
      font-size: 5rem;
      font-family: @font-title;

      color: @text-color-light;
      text-shadow: @shadow-light;
    }

    .menu-toggle {
      .reset-button();
      position: absolute;
      display: block;
      top: 1rem;
      right: 1rem;
      z-index: 500;
      font-size: @hamburger-size;
      color: @text-color-light;
      filter: drop-shadow(@shadow-light);
    }

    .menu {
      @blur: 10px;
      display: none;
      transition: all ease-in-out 1s;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 499;
      padding: 1rem;

      background: rgba(255, 255, 255, 0);
      backdrop-filter: blur(@blur);
      -webkit-backdrop-filter: blur(@blur);

      > div {
        font-size: 1.5rem;
        font-family: @font-text;
        color: @text-color;
        text-shadow: @shadow;
      }

      &.show {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .separator {
        height: 1rem;
      }

      .disclaimer {
        font-size: 1rem !important;
        text-align: justify;
        padding: 10px;
        color: @text-color;
        text-shadow: @shadow;

        a {
          color: inherit;
          text-decoration: none;
          font-size: inherit !important;
        }
      }
    }
  }
</style>
