<template>
  <div class="breath-container" v-if="timeoutInProgress">
    <Doughnut class="breath" ref="chart" :chart-data="chartData" :chart-options="chartOptions" />
    <div class="ticker" :style="'transform: rotate(' + degrees + 'deg);'"></div>
    <div class="action" :style="'transform: scale(' + scale + ');'">
      <span v-if="currentAction != ''">
        {{ $t("messages." + currentAction) }}
      </span>
      <span v-if="currentActionDetail != ''">
        {{ $t("messages." + currentActionDetail) }}
      </span>
    </div>
  </div>
  <div class="breath-controller">
    <span class="material-symbols-outlined" v-if="!timeoutInProgress" v-on:click="startTimer"> play_circle </span>
  </div>
  <div class="technique-infos">
    {{ $t("sequences." + technique.code + ".title") }}<br />
    {{ $t("sequences." + technique.code + ".description") }}
  </div>
  <div class="breath-controller bottom">
    <span class="material-symbols-outlined" v-if="timeoutInProgress" v-on:click="stopTimer"> stop_circle </span>
    <span class="material-symbols-outlined" v-if="timeoutInProgress" v-on:click="resetValues"> device_reset </span>
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
        // return this.inhaleMax - this.inhale + this.exhaleMax - this.exhale;
      },
      chartData() {
        var max = this.arraySum(this.technique.sequence.map((step) => step.duration));
        var data = this.technique.sequence.map((step) => step.current);
        var colors = this.technique.sequence.map((step) => step.color);

        data.push(this.remaining);
        colors.push("transparent");

        return {
          datasets: [
            {
              data: [max],
              backgroundColor: ["#ffffffA0"],
              cutout: "99%",
            },
            {
              // data: [this.inhaleMax, this.exhaleMax],
              // data: [this.inhale, this.exhale, this.remaining],
              data: data,
              backgroundColor: colors,
              cutout: "90%",
              borderRadius: 30,
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
      text-align: center;
      > span {
        padding: 0;
        display: block;
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

  .technique-infos {
    text-align: center;
    padding: 1rem 0px;
    color: black;
    text-shadow: 0px 0px 0.25rem fade(white, 50%);
  }

  .material-symbols-outlined {
    font-size: 15vw;
    margin: 0 2rem;
    color: white;
    text-shadow: 0px 0px 0.25rem fade(black, 50%);
  }
</style>
