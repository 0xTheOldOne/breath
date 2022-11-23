<template>
  <div class="sound-selector">
    <div class="section">
      <div class="title">
        <span class="material-symbols-outlined"> library_music </span>
        Music
      </div>
      <div class="content">
        <p>Content</p>
        <span class="material-symbols-outlined"> music_off </span>
      </div>
    </div>
    <div class="section">
      <div class="title">
        <span class="material-symbols-outlined"> library_music </span>
        Sounds
      </div>
      <div class="content">
        <p>Content</p>
        <span class="material-symbols-outlined"> audio_file </span>
        <span class="material-symbols-outlined"> audio_file </span>
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
  }
</style>
