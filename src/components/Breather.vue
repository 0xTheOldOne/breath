<template>
  <div class="breath-container" v-if="timeoutInProgress">
    <Doughnut class="breath" ref="chart" :chart-data="chartData" :chart-options="chartOptions" />
    <div class="ticker" :style="'transform: rotate(' + degrees + 'deg);'"></div>
    <div class="action" :style="'transform: scale(' + scale + ');'">
      <span v-if="currentAction != ''">
        {{ $t("messages." + currentAction) }}
      </span>
    </div>
  </div>
  <div class="breath-controller">
    <span class="material-symbols-outlined" v-if="!timeoutInProgress" v-on:click="startTimer"> play_circle </span>
  </div>
  <div class="technique-infos">
    {{ $t("sequences." + technique.code + ".title") }}
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
        inhale: 0,
        inhaleMax: 400,
        exhale: 0,
        exhaleMax: 600,
        currentAction: "",
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
      remaining() {
        return this.inhaleMax - this.inhale + this.exhaleMax - this.exhale;
      },
      chartData() {
        return {
          datasets: [
            {
              data: [this.inhaleMax + this.exhaleMax],
              backgroundColor: ["#ffffffA0"],
              cutout: "99%",
            },
            {
              // data: [this.inhaleMax, this.exhaleMax],
              data: [this.inhale, this.exhale, this.remaining],
              backgroundColor: ["lightskyblue", "lightcoral", "transparent"],
              cutout: "90%",
              borderRadius: 30,
            },
          ],
        };
      },
      scale() {
        if (this.currentAction == "inhale") {
          var percent = this.inhale / this.inhaleMax;
          return 1 + percent;
        } else if (this.currentAction == "exhale") {
          var percent = this.exhale / this.exhaleMax;
          return 2 - percent;
        } else if (this.currentAction == "hold") {
          return 2;
        }
      },
      degrees() {
        var current = this.inhale + this.exhale;
        var total = this.inhaleMax + this.exhaleMax;
        return Math.floor((current * 360) / total);
      },
    },
    methods: {
      startTimer() {
        this.timeout = setTimeout(this.updateValues, 10);
        this.timeoutInProgress = true;
      },
      stopTimer() {
        clearTimeout(this.timeout);
        this.timeoutInProgress = false;
      },
      resetValues() {
        this.exhale = 0;
        this.inhale = 0;
      },
      updateValues() {
        if (this.remaining == 0) {
          this.resetValues();
        }

        if (this.inhale < this.inhaleMax) {
          if (this.inhale == 0) {
            this.currentAction = "inhale";
          }
          this.inhale += 1;
        } else if (this.exhale < this.exhaleMax) {
          if (this.exhale == 0) {
            this.currentAction = "exhale";
          }
          this.exhale += 1;
        }

        this.startTimer();
      },
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
      > span {
        padding: 5vw;
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
