<template>
  <div id="breathCarousel" class="carousel carousel-dark" data-bs-ride="false" data-bs-interval="false" data-bs-keyboard="false">
    <div class="carousel-inner">
      <div v-for="(technique, index) in breathTechniques">
        <div :class="index == breathTechniqueIndex ? 'carousel-item active' : 'carousel-item'">
          <Breather :technique="technique" />
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#breathCarousel" data-bs-slide="prev" v-on:click="setPrevTechniqueIndex">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#breathCarousel" data-bs-slide="next" v-on:click="setNextTechniqueIndex">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
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
    }
  }

  @media (max-width: @screen-xs-max) {
    button[class*="carousel-control-"] {
      width: 10% !important;
    }
  }
</style>
