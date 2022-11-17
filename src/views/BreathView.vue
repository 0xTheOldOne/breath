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

<style lang="less" scoped></style>
