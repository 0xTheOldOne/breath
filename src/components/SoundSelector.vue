<template>
  <div class="sound-selector">
    <div class="section">
      <div class="title">Music</div>
      <div class="content">
        <p>Content</p>
        <span class="material-symbols-outlined"> music_off </span>
      </div>
    </div>
    <div class="section">
      <div class="title">Sounds</div>
      <div class="content">
        <p>Content</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex";

  export default {
    name: "SoundSelector",
    data() {
      return {};
    },
    computed: {
      ...mapState({}),
    },
    methods: {},
    watch: {},
  };
</script>

<style lang="less" scoped>
  @import url("@/assets/style/variables.less");

  .sound-selector {
    width: 100%;

    * {
      text-align: center;
    }

    .section {
      margin: 1rem 0;

      .title {
        font-weight: bold;
      }
      .content {
      }
    }
  }
</style>
