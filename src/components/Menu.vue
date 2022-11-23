<template>
  <div class="menu-container">
    <div class="appname">{{ $t("title") }}</div>
    <div class="menu-input">
      <input class="checkbox" type="checkbox" name="" id="" v-model="checked" />
      <div :class="linesClass">
        <span class="line line1"></span>
        <span class="line line2"></span>
        <span class="line line3"></span>
      </div>
    </div>
    <div :class="menuContentClass">
      <SoundSelector />
      <div>2</div>
      <div>3</div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex";
  import SoundSelector from "@/components/SoundSelector.vue";

  export default {
    name: "Menu",
    components: {
      SoundSelector,
    },
    data() {
      return {
        checked: false,
      };
    },
    computed: {
      ...mapState({}),
      linesClass() {
        var cssClass = "lines";
        if (this.checked) {
          cssClass += " checked";
        }
        return cssClass;
      },
      menuContentClass() {
        var cssClass = "menu";
        if (this.checked) {
          cssClass += " show";
        }
        return cssClass;
      },
    },
    methods: {},
    watch: {
      checked(oldVal, newVal) {
        console.log("checked : " + newVal);
      },
    },
  };
</script>

<style lang="less" scoped>
  @import url("@/assets/style/variables.less");

  .menu-container {
    @hamburger-width: 1.5rem;
    @hamburger-height: 1.3rem;
    width: 100%;

    .appname {
      text-align: center;
      font-size: 5rem;
      font-family: @font-title;

      color: @text-color-light;
      text-shadow: @shadow-light;
    }

    .menu-input {
      position: absolute;
      display: block;
      width: @hamburger-width;
      height: @hamburger-height;
      top: 1rem;
      right: 1rem;
      z-index: 500;

      .checkbox {
        position: absolute;
        display: block;
        width: @hamburger-width;
        height: @hamburger-height;
        z-index: 1;
        opacity: 0;
        cursor: pointer;
      }

      .lines {
        display: block;
        width: @hamburger-width;
        height: @hamburger-height;
        position: absolute;
        z-index: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .line {
          display: block;
          height: 2px;
          width: 100%;
          border-radius: 0.1rem;
          background: @text-color-light;
          box-shadow: @shadow-light;

          &.line1 {
            transform-origin: 0% 0%;
            transition: transform 0.4s ease-in-out;
          }

          &.line2 {
            transition: transform 0.2s ease-in-out;
          }

          &.line3 {
            transform-origin: 0% 100%;
            transition: transform 0.4s ease-in-out;
          }
        }

        &.checked {
          .line {
            @degrees: 45deg;
            @translate: 2px;

            &.line1 {
              transform: rotate(@degrees) translate(@translate);
            }

            &.line2 {
              transform: scaleY(0);
            }

            &.line3 {
              transform: rotate(-@degrees) translate(@translate);
            }
          }
        }
      }
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
    }
  }
</style>
