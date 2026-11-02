<template>
  <div class="breath-container" :class="running ? 'running' : 'idle'">
    <div class="breath" v-if="running">
      <div class="doughnut-container">
        <div class="ticker" :style="'transform: rotate(' + degrees + 'deg);'"></div>
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
    <div class="breath-controller" v-if="!running">
      <button type="button" class="icon-button" :aria-label="$t('actions.start')" v-on:click="startTimer">
        <PhPlayCircle weight="light" />
      </button>
    </div>
    <div class="technique-infos" v-if="!running">
      <div class="title">
        {{ $t("sequences." + technique.code + ".title") }}
      </div>
      <div class="description">
        {{ $t("sequences." + technique.code + ".description") }}
      </div>
      <div>
        <span class="badge rounded-pill bg-light text-dark">{{ $t("messages.duration", { minutes: technique.durationInMinutes }) }}</span>
        <span>&nbsp;</span>
        <span class="badge rounded-pill bg-light text-dark">
          <span v-for="(step, index) in technique.sequence" :key="index">
            {{ step.duration / 100 }}
            <span v-if="index < technique.sequence.length - 1">&nbsp;-&nbsp;</span>
          </span>
        </span>
        <span v-if="technique.advanced">&nbsp;</span>
        <span class="badge rounded-pill bg-light text-dark" v-if="technique.advanced">{{ $t("messages.advanced") }}</span>
      </div>
    </div>
    <div class="technique-infos" v-if="running">
      <div class="description">
        <code>{{ elapsed }}</code>
      </div>
    </div>
    <div class="breath-controller bottom" v-if="running">
      <button type="button" class="icon-button" :aria-label="$t('actions.stop')" v-on:click="stopTimer">
        <PhStopCircle weight="light" />
      </button>
      <button type="button" class="icon-button" :aria-label="$t('actions.reset')" v-on:click="resetValues">
        <PhArrowCounterClockwise weight="light" />
      </button>
    </div>
  </div>
</template>

<script>
  import { Doughnut } from "vue-chartjs";
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";
  import { PhPlayCircle, PhStopCircle, PhArrowCounterClockwise } from "@phosphor-icons/vue";

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

  // Step durations are stored in hundredths of a second.
  const MS_PER_UNIT = 10;

  export default {
    name: "Breather",
    components: {
      Doughnut,
      PhPlayCircle,
      PhStopCircle,
      PhArrowCounterClockwise,
    },
    props: {
      technique: {
        type: Object,
        required: true,
      },
      active: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        frameId: null,
        running: false,
        lastTimestamp: 0,
        elapsedMs: 0,
        cycleStartMs: 0,
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
      sessionDurationMs() {
        return this.technique.durationInMinutes * 60 * 1000;
      },
      // First cycle end at or after the session duration, so no breath is cut short; at least one cycle after a reset.
      sessionEndMs() {
        var cycleMs = this.cycleDuration * MS_PER_UNIT;
        var cycles = Math.max(1, Math.ceil((this.sessionDurationMs - this.cycleStartMs) / cycleMs));
        return this.cycleStartMs + cycles * cycleMs;
      },
      cycleDuration() {
        return this.arraySum(this.technique.sequence.map((step) => step.duration));
      },
      // Position in the current cycle, in step duration units.
      cyclePosition() {
        return ((this.elapsedMs - this.cycleStartMs) / MS_PER_UNIT) % this.cycleDuration;
      },
      stepProgress() {
        var start = 0;
        return this.technique.sequence.map((step) => {
          var current = Math.min(Math.max(this.cyclePosition - start, 0), step.duration);
          start += step.duration;
          return current;
        });
      },
      currentStepIndex() {
        var index = this.stepProgress.findIndex((current, i) => current < this.technique.sequence[i].duration);
        return index >= 0 ? index : this.technique.sequence.length - 1;
      },
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
      currentAction() {
        return this.running ? this.step.type : "";
      },
      currentActionDetail() {
        return this.running ? this.step.detail : "";
      },
      remaining() {
        return this.cycleDuration - this.arraySum(this.stepProgress);
      },
      chartData() {
        var data = this.technique.sequence.map((step) => step.duration);
        var done = [...this.stepProgress];
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
        var val;
        var current = this.stepProgress[this.currentStepIndex];
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
        return Math.floor((this.arraySum(this.stepProgress) * 360) / this.cycleDuration);
      },
      elapsed() {
        var totalSeconds = Math.floor(this.elapsedMs / 1000);
        var hours = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor(totalSeconds / 60) % 60;
        var seconds = totalSeconds % 60;
        return [hours, minutes, seconds].map((n) => String(n).padStart(2, "0")).join(":");
      },
    },
    methods: {
      arraySum(array) {
        return array.reduce((a, b) => a + b, 0);
      },
      startTimer() {
        if (this.running) {
          return;
        }
        this.running = true;
        this.lastTimestamp = performance.now();
        this.frameId = requestAnimationFrame(this.tick);
      },
      stopTimer() {
        cancelAnimationFrame(this.frameId);
        this.frameId = null;
        this.running = false;
        this.elapsedMs = 0;

        this.resetValues();
      },
      // Restarts the cycle without resetting the elapsed time.
      resetValues() {
        this.cycleStartMs = this.elapsedMs;
      },
      // Wall-clock delta: no drift, and time spent in a hidden tab is still counted.
      tick() {
        var now = performance.now();
        this.elapsedMs += now - this.lastTimestamp;
        this.lastTimestamp = now;

        if (this.elapsedMs >= this.sessionEndMs) {
          this.stopTimer();
          return;
        }

        this.frameId = requestAnimationFrame(this.tick);
      },
    },
    watch: {
      // Leaving the slide ends the session.
      active(isActive) {
        if (!isActive) {
          this.stopTimer();
        }
      },
    },
    beforeUnmount() {
      cancelAnimationFrame(this.frameId);
    },
  };
</script>

<style lang="less" scoped>
  @import url("@/assets/style/variables.less");

  * {
    color: @text-color;
    text-shadow: @shadow;
  }

  .icon-button {
    .reset-button();
    color: @text-color-light;
    filter: drop-shadow(@shadow-light);

    // The scoped `*` rule above would otherwise darken the icon.
    svg {
      color: inherit;
    }
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

      .icon-button {
        font-size: 10rem;
        margin: 0 2rem;
      }

      &.bottom {
        .icon-button {
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

          .icon-button {
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
