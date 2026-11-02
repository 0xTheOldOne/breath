<template>
  <div class="sound-selector">
    <div class="section">
      <div class="title">{{ $t("sound.music") }}</div>
      <div class="content">
        <p>{{ $t("sound.content") }}</p>
        <PhSpeakerSimpleSlash aria-hidden="true" />
      </div>
    </div>
    <div class="section">
      <div class="title">{{ $t("sound.sounds") }}</div>
      <div class="content">
        <p>{{ $t("sound.content") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { PhSpeakerSimpleSlash } from "@phosphor-icons/vue";

  export default {
    name: "SoundSelector",
    components: {
      PhSpeakerSimpleSlash,
    },
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
