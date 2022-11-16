<template>
  <div class="breath-container" v-if="timeoutInProgress">
    <Doughnut class="breath" ref="chart" :chart-data="chartData" :chart-options="chartOptions" />
    <div class="ticker" :style="'transform: rotate(' + progressDegrees + 'deg);'"></div>
    <div class="action">
      <span class="inhale" :style="'font-size:' + progressInhale + '%'" v-if="currentAction == 'inhale'">
        {{ currentAction }}
      </span>
      <span class="exhale" :style="'font-size:' + progressExhale + '%'" v-else>
        {{ currentAction }}
      </span>
    </div>
  </div>
  <div class="breath-controller">
    <span class="material-symbols-outlined" v-if="!timeoutInProgress" v-on:click="startTimer"> play_circle </span>
    <span class="material-symbols-outlined" v-if="timeoutInProgress" v-on:click="stopTimer"> stop_circle </span>
    <span class="material-symbols-outlined" v-if="timeoutInProgress" v-on:click="resetValues"> device_reset </span>
  </div>
</template>

<script>
  import { Doughnut } from "vue-chartjs";
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, Plugin, DoughnutController } from "chart.js";

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

  export default {
    name: "BreathView",
    components: {
      Doughnut,
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
          // cutout: "90%",
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
            // {
            //   data: [this.inhaleMax, this.exhaleMax],
            //   // data: [this.inhale, this.exhale, this.remaining],
            //   backgroundColor: ["lightskyblue", "lightcoral", "transparent"],
            //   cutout: "85%",
            // },
          ],
        };
      },
      progressInhale() {
        var percent = (this.inhale * 100) / this.inhaleMax;
        return 100 + percent;
      },
      progressExhale() {
        var percent = (this.exhale * 100) / this.exhaleMax;
        return 200 - percent;
      },
      progressDegrees() {
        var current = this.inhale + this.exhale;
        var total = this.inhaleMax + this.exhaleMax;
        return (current * 360) / total;
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
    margin-bottom: 3rem;

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
  }

  .breath-controller {
    text-align: center;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .material-symbols-outlined {
    font-size: 300%;
    margin: 0 2rem;
  }
</style>
