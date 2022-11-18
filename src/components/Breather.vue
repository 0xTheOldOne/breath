<template>
  <div class="breath-container" :class="timeoutInProgress ? 'running' : 'idle'">
    <div class="breath" v-if="timeoutInProgress">
      <div class="doughnut-container">
        <div class="ticker" :style="'transform: rotate(' + degrees + 'deg);'"></div>
        <Doughnut class="doughnut" ref="chart" :chart-data="chartData" :chart-options="chartOptions" />
      </div>
      <div class="action" :style="'transform: scale(' + scale + ');'">
        <span v-if="currentAction != ''">
          {{ $t("messages." + currentAction) }}
        </span>
        <span v-if="currentActionDetail != ''">
          {{ $t("messages." + currentActionDetail) }}
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
      <div v-if="technique.advanced">
        <span class="badge rounded-pill bg-light text-dark">{{ $t("messages.advanced") }}</span>
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
        timeoutInProgress: false,
        currentAction: "",
        currentActionDetail: "",
        currentStepIndex: 0,
        lastScaleValue: 1,
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
        },
      };
    },
    computed: {
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
        var colors_data = this.technique.sequence.map((step) => step.color);
        var colors_done = this.technique.sequence.map((step) => step.color.toString().substr(0, 7));

        done.push(this.remaining);
        colors_done.push("transparent");

        return {
          datasets: [
            {
              data: done,
              backgroundColor: colors_done,
              cutout: "90%",
              borderRadius: 30,
              borderWidth: 10,
              borderColor: "transparent",
            },
            {
              data: data,
              backgroundColor: colors_data,
              cutout: "95%",
              borderRadius: 0,
              borderWidth: 10,
              borderColor: "transparent",
            },
          ],
        };
      },
      scale() {
        var val = 1;
        var percent = this.step.current / this.step.duration;
        var previousStepIndex = this.currentStepIndex - 1 > 0 ? this.currentStepIndex - 1 : this.technique.sequence.length - 1;
        var previousStepType = this.technique.sequence[previousStepIndex].type;
        var nextStepIndex = this.currentStepIndex + 1 < this.technique.sequence.length ? this.currentStepIndex + 1 : 0;
        var nextStepType = this.technique.sequence[nextStepIndex].type;

        switch (this.step.type) {
          case "inhale":
            if (previousStepType != this.step.type && nextStepType != this.step.type) {
              val = 1 + percent;
            } else if (nextStepType == this.step.type) {
              val = 1 + percent / 2;
              this.lastScaleValue = val;
            } else if (previousStepType == this.step.type) {
              val = this.lastScaleValue + percent / 2;
            }
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
        console.log(JSON.stringify(this.technique));
      },
      startTimer() {
        this.timeout = setTimeout(this.updateValues, 10);

        if (!this.timeoutInProgress) {
          this.timeoutInProgress = true;
        }
      },
      stopTimer() {
        clearTimeout(this.timeout);
        this.timeoutInProgress = false;
      },
      resetValues() {
        this.currentStepIndex = 0;
        this.technique.sequence.forEach((step) => {
          step.current = 0;
        });
      },
      updateValues() {
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
    },
    created() {
      this.setTechnique(this.technique);
    },
  };
</script>

<style lang="less" scoped>
  .breath-container {
    .breath {
      margin: 0 auto;
      position: relative;

      @size: 40vh;
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
            @size: 2rem;
            content: "";
            position: absolute;
            width: @size;
            height: @size;
            left: calc(50% - @size / 2);
            top: calc(-@size / 2);
            background-color: white;
            transform: rotate(45deg);
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
          font-size: 1rem;
          line-height: 1rem;
          display: block;
        }
      }
    }

    .breath-controller {
      text-align: center;
    }

    .technique-infos {
      width: 100%;
      margin: 0 auto;
      text-align: center;
      padding: 1rem 0px;

      * {
        color: black;
        text-shadow: 0px 0px 0.25rem fade(white, 50%);
      }

      .title {
        font-size: 1.5rem;
      }

      .description {
        font-size: 1rem;
      }

      .badge {
        margin-top: 0.5rem;
        font-size: 0.8rem;
      }
    }

    .material-symbols-outlined {
      cursor: pointer;
      font-size: 10rem;
      margin: 0 2rem;
      color: white;
      text-shadow: 0px 0px 0.25rem fade(black, 50%);
    }

    &.running {
      .breath-controller {
        &.bottom {
          margin-top: 1rem;
        }
      }
    }

    &.idle {
      padding-top: 6rem;
    }
  }

  @media (max-width: 912px) {
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

    .material-symbols-outlined {
      font-size: 4rem !important;
    }
  }

  @media (min-width: 913px) {
    .breath-container {
      .breath {
        .action {
          > span {
            font-size: 2rem !important;
            line-height: 2rem !important;
          }
        }
      }

      .technique-infos {
        .title {
          font-size: 3rem !important;
        }
        .description {
          font-size: 2rem !important;
        }

        .badge {
          font-size: 1rem !important;
        }
      }

      &.running {
        .breath-controller {
          &.bottom {
            margin-top: 3rem !important;
          }
        }
      }

      &.idle {
        padding-top: 9rem !important;
      }
    }
  }
</style>
