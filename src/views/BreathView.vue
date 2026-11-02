<template>
  <div id="breathCarousel" class="carousel">
    <div class="carousel-inner">
      <div v-for="(technique, index) in breathTechniques" :key="technique.code" :class="index == breathTechniqueIndex ? 'carousel-item active' : 'carousel-item'">
        <Breather :technique="technique" :active="index == breathTechniqueIndex" />
      </div>
    </div>
    <button class="carousel-control-prev" type="button" :aria-label="$t('actions.previous')" v-on:click="setPrevTechniqueIndex">
      <PhCaretLeft class="carousel-icon" weight="light" />
    </button>
    <button class="carousel-control-next" type="button" :aria-label="$t('actions.next')" v-on:click="setNextTechniqueIndex">
      <PhCaretRight class="carousel-icon" weight="light" />
    </button>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { PhCaretLeft, PhCaretRight } from "@phosphor-icons/vue";
  import Breather from "@/components/Breather.vue";

  export default {
    name: "BreathView",
    components: {
      Breather,
      PhCaretLeft,
      PhCaretRight,
    },
    computed: {
      ...mapState({
        userLocale: (state) => state.userLocale,
        breathTechniques: (state) => state.breathTechniques,
        breathTechniqueIndex: (state) => state.breathTechniqueIndex,
      }),
    },
    methods: {
      setPrevTechniqueIndex() {
        var index = this.breathTechniqueIndex - 1;
        var prev = index >= 0 ? index : this.breathTechniques.length - 1;

        this.$store.commit({
          type: "setTechniqueIndex",
          index: prev,
        });
      },
      setNextTechniqueIndex() {
        var index = this.breathTechniqueIndex + 1;
        var next = index < this.breathTechniques.length ? index : 0;

        this.$store.commit({
          type: "setTechniqueIndex",
          index: next,
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  @import url("@/assets/style/variables.less");

  #breathCarousel {
    width: 100%;

    button[class*="carousel-control-"] {
      width: 20%;
      color: @text-color;
    }

    .carousel-icon {
      font-size: 2rem;
    }
  }

  @media (max-width: @screen-xs-max) {
    button[class*="carousel-control-"] {
      width: 10% !important;
    }
  }
</style>
