<template>
  <div class="breath-container" :class="timeoutInProgress ? 'running' : 'idle'">
    <div class="breath" v-if="timeoutInProgress">
      <div class="doughnut-container">
        <div class="ticker" :style="'transform: rotate(' + degrees + 'deg);'" ticker-color="red"></div>
        <Doughnut class="doughnut" ref="chart" :chart-data="chartData" :chart-options="chartOptions" />
      </div>
      <div class="action" :style="'transform: scale(' + scale + ');'">
        <span v-if="currentAction != ''">
          {{ $t("messages." + currentAction) }}<br />
          <span v-if="currentActionDetail != ''">
            {{ $t("messages." + currentActionDetail) }}
          </span>
        </span>
      </div>
    </div>
    <div class="breath-controller" v-if="!timeoutInProgress">
      <span class="material-symbols-outlined" v-on:click="startTimer"> play_circle </span>
    </div>
    <div class="technique-infos" v-if="!timeoutInProgress">
      <div class="title">
        {{ $t("sequences." + technique.code + ".title") }}
      </div>
      <div class="description">
        {{ $t("sequences." + technique.code + ".description") }}
      </div>
      <div>
        <span class="badge rounded-pill bg-light text-dark">
          <span v-for="(step, index) in technique.sequence">
            {{ step.duration / 100 }}
            <span v-if="index < technique.sequence.length - 1">&nbsp;-&nbsp;</span>
          </span>
        </span>
        <span v-if="technique.advanced">&nbsp;</span>
        <span class="badge rounded-pill bg-light text-dark" v-if="technique.advanced">{{ $t("messages.advanced") }}</span>
      </div>
    </div>
    <div class="technique-infos" v-if="timeoutInProgress">
      <div class="description">
        <code>{{ elapsed }}</code>
      </div>
    </div>
    <div class="breath-controller bottom" v-if="timeoutInProgress">
      <span class="material-symbols-outlined" v-on:click="stopTimer"> stop_circle </span>
      <span class="material-symbols-outlined" v-on:click="resetValues"> device_reset </span>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex";

  import { Doughnut } from "vue-chartjs";
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, Plugin, DoughnutController } from "chart.js";

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

  export default {
    name: "Breather",
    components: {
      Doughnut,
    },
    props: {
      technique: {
        type: Object,
        default: {},
        required: true,
      },
    },
    data() {
      return {
        timeout: null,
        timeoutInMs: 10,
        timeoutInProgress: false,
        timeoutTotalTimeElapsed: 0,
        currentAction: "",
        currentActionDetail: "",
        currentStepIndex: 0,
        chartOptions: {
          borderWidth: 0,
          circumference: 360,
          rotation: 0,
          responsive: true,
          maintainAspectRatio: true,
          animation: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
          elements: {
            arc: {
              spacing: 0,
            },
          },
        },
      };
    },
    computed: {
      ...mapState({
        breathTechniqueIndex: (state) => state.breathTechniqueIndex,
      }),
      previousStep() {
        var previousIndex = this.currentStepIndex - 1;
        var index = previousIndex >= 0 ? previousIndex : this.technique.sequence.length - 1;
        return this.technique.sequence[index];
      },
      nextStep() {
        var nextIndex = this.currentStepIndex + 1;
        var index = nextIndex < this.technique.sequence.length ? nextIndex : 0;
        return this.technique.sequence[index];
      },
      step() {
        return this.technique.sequence[this.currentStepIndex];
      },
      remaining() {
        var max = this.arraySum(this.technique.sequence.map((step) => step.duration));
        var val = this.arraySum(this.technique.sequence.map((step) => step.current));
        return max - val;
      },
      chartData() {
        var max = this.arraySum(this.technique.sequence.map((step) => step.duration));
        var data = this.technique.sequence.map((step) => step.duration);
        var done = this.technique.sequence.map((step) => step.current);
        var colors_data = this.technique.sequence.map((step) => step.color + "C0");
        var colors_done = this.technique.sequence.map((step) => step.color + "60");

        done.push(this.remaining);
        colors_done.push("transparent");

        return {
          datasets: [
            {
              data: data,
              backgroundColor: colors_data,
              cutout: "95%",
              borderRadius: 30,
              borderColor: "transparent",
            },
            {
              data: done,
              backgroundColor: colors_done,
              cutout: "90%",
              borderRadius: 30,
              borderColor: "transparent",
            },
          ],
        };
      },
      scale() {
        var val = 1;
        var current = this.step.current;
        var duration = this.step.duration;

        if (this.nextStep.type == this.step.type) {
          duration += this.nextStep.duration;
        } else if (this.previousStep.type == this.step.type) {
          current += this.previousStep.duration;
          duration += this.previousStep.duration;
        }

        var percent = current / duration;

        switch (this.step.type) {
          case "inhale":
            val = 1 + percent;
            break;

          case "hold":
            val = 2;
            break;

          case "exhale":
            val = 2 - percent;
            break;

          default:
            val = 1;
            break;
        }

        return val;
      },
      degrees() {
        var total = this.arraySum(this.technique.sequence.map((step) => step.duration));
        var current = this.arraySum(this.technique.sequence.map((step) => step.current));
        return Math.floor((current * 360) / total);
      },
      elapsed() {
        return new Date(this.timeoutTotalTimeElapsed).toISOString().slice(11, -1).substring(8, -1);
      },
    },
    methods: {
      arraySum(array) {
        return array.reduce((a, b) => a + b, 0);
      },
      setTechnique(val) {
        this.stopTimer();
        val.sequence.forEach((step) => {
          step.current = 0;
        });
        console.debug("🧘‍♂️ Breath sequence '" + this.technique.code + "' loaded...");
      },
      startTimer() {
        this.timeout = setTimeout(this.updateValues, this.timeoutInMs);

        if (!this.timeoutInProgress) {
          this.timeoutInProgress = true;
        }
      },
      stopTimer() {
        clearTimeout(this.timeout);
        this.timeoutInProgress = false;
        this.timeoutTotalTimeElapsed = 0;

        this.resetValues();
      },
      resetValues() {
        this.currentStepIndex = 0;
        this.technique.sequence.forEach((step) => {
          step.current = 0;
        });
      },
      updateValues() {
        this.timeoutTotalTimeElapsed += this.timeoutInMs;

        if (this.step.current >= this.step.duration) {
          this.currentStepIndex += 1;
        }

        if (this.currentStepIndex >= this.technique.sequence.length) {
          this.resetValues();
        }

        if (this.step.current < this.step.duration) {
          if (this.step.current == 0) {
            this.currentAction = this.step.type;
            this.currentActionDetail = this.step.detail;
          }

          this.step.current += 1;
        }

        this.startTimer();
      },
    },
    watch: {
      technique(newVal, oldVal) {
        this.setTechnique(newVal);
      },
      breathTechniqueIndex(newVal, oldVal) {
        this.stopTimer();
      },
    },
    created() {
      this.setTechnique(this.technique);
    },
  };
</script>

<style lang="less" scoped>
  @import url("@/assets/style/variables.less");

  * {
    color: @text-color;
    text-shadow: @shadow;
  }

  .material-symbols-outlined {
    cursor: pointer;
    color: @text-color-light;
    text-shadow: @shadow-light;
  }

  .breath-container {
    .breath {
      margin: 0 auto;
      position: relative;

      @size: 35vh;
      width: @size !important;
      height: @size !important;

      .doughnut-container {
        width: @size !important;
        height: @size !important;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        * {
          width: @size !important;
          height: @size !important;
        }

        .ticker {
          position: absolute;

          &:before {
            @size: 1rem;
            content: "";
            position: absolute;
            width: @size;
            height: @size;
            left: calc(50% - @size / 2);
            top: calc(-@size / 2);
            background-color: white;
            transform: rotate(45deg);
            border-radius: @size;
          }
        }
      }

      .action {
        position: absolute;
        width: 100%;
        height: 10vh;
        top: calc(50% - 5vh);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        > span {
          font-size: 2rem;
          display: block;
          padding: 10px;
          text-align: center;

          > span {
            font-size: 80%;
            line-height: 1em;
          }
        }
      }
    }

    .breath-controller {
      text-align: center;

      .material-symbols-outlined {
        font-size: 10rem;
        margin: 0 2rem;
      }

      &.bottom {
        .material-symbols-outlined {
          font-size: 5rem !important;
          margin-top: 2rem !important;
        }
      }
    }

    .technique-infos {
      width: 100%;
      margin: 0 auto;
      text-align: center;
      padding: 1rem;

      .title {
        font-size: 3rem;
      }

      .description {
        font-size: 2rem;
      }

      .badge {
        margin-top: 1rem;
        font-size: 0.8rem;
      }
    }

    &.idle {
      padding-top: 12rem;
    }

    &.running {
      padding-top: 16rem;

      .breath-controller {
        &.bottom {
          margin-top: 3rem;
        }
      }
    }

    code {
      font-size: 1.5rem;
      font-weight: 300;
      font-family: @font-monospaced;
    }
  }

  @media (max-width: @screen-xs-max) {
    .breath-container {
      padding-top: 10rem !important;

      .ticker {
        position: absolute;

        &:before {
          @size: 1rem;
          width: @size !important;
          height: @size !important;
          left: calc(50% - @size / 2) !important;
          top: calc(-@size / 2) !important;
        }
      }

      .breath {
        .action {
          > span {
            font-size: 1rem !important;
          }
        }
      }

      .technique-infos {
        .title {
          font-size: 1.5rem !important;
        }

        .description {
          font-size: 1rem !important;
        }

        .badge {
          font-size: 0.8rem !important;
          margin-top: 0.5rem !important;
        }
      }

      &.running {
        .breath-controller {
          margin: 0px !important;

          .material-symbols-outlined {
            margin-top: 0px !important;
          }
        }
      }

      // &.idle {
      //   padding-top: 6rem !important;
      // }
    }
  }
</style>
