<template>
  <div id="breathCarousel" class="carousel carousel-dark" data-bs-ride="false" data-bs-interval="false" data-bs-keyboard="false">
    <div class="carousel-inner">
      <div v-for="(technique, index) in breathTechniques">
        <div :class="index == 0 ? 'carousel-item active' : 'carousel-item'">
          <Breather :technique="technique" />
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#breathCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#breathCarousel" data-bs-slide="next">
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
      }),
    },
  };
</script>

<style lang="less" scoped>
  #breathCarousel {
    .carousel-inner {
      .carousel-item {
        height: 70vh;
        margin-top: 15vh;
        padding-top: 23.5vh;

        > div {
          display: none;
        }

        &.active {
          > div {
            display: block;
          }
        }
      }
    }
  }
</style>
