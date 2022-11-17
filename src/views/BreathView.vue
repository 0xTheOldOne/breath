<template>
  <Breather :technique="breathTechnique" />
</template>

<script>
  import { mapState, mapGetters } from "vuex";
  import Breather from "@/components/Breather.vue";

  export default {
    name: "BreathView",
    components: {
      Breather,
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

<style lang="less" scoped>
  @size: 70vw;
  @max-size: 400px;

  .breath-container {
    width: @size;
    height: @size;
    max-width: @max-size;
    max-height: @max-size;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .ticker,
    .breath {
      position: absolute;
      width: inherit;
      height: inherit;
      max-width: inherit;
      max-height: inherit;
    }

    .ticker {
      &:before {
        @size: 5vw;
        content: "";
        position: absolute;
        width: @size;
        height: @size;
        margin-top: calc(-@size / 2);
        margin-left: calc(50% - @size / 2);
        border-radius: 100%;
        background-color: white;
      }
    }

    .action {
      > span {
        padding: 5vw;
      }
    }
  }

  .breath-controller {
    text-align: center;

    &.bottom {
      position: fixed;
      bottom: 5vw;
      left: 0;
      right: 0;
    }
  }

  .material-symbols-outlined {
    font-size: 15vw;
    margin: 0 2rem;
    color: white;
    text-shadow: 0px 0px 0.25rem fade(black, 50%);
  }
</style>
