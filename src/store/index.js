import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
const vuexPersistKey = "store";

const vuexLocal = new VuexPersistence({
  key: vuexPersistKey,
  storage: window.localStorage,
  reducer: (state) => ({
    userLocale: state.userLocale,
    breathTechniqueIndex: state.breathTechniqueIndex,
  }),
});

const colors = {
  inhale: {
    default: "#3186C9",
    stomach: "#386EB3",
    chest: "#40A8C7",
  },
  exhale: {
    default: "#E7AF19",
  },
  hold: {
    default: "#8ABB86",
  },
};

export default createStore({
  state: {
    userLocale: "",
    breathTechniqueIndex: 0,
    breathTechniques: [
      {
        code: "relax",
        durationInMinutes: 5,
        advanced: false,
        sequence: [
          {
            type: "inhale",
            detail: "",
            color: colors.inhale.default,
            duration: 400,
          },
          {
            type: "hold",
            detail: "",
            color: colors.hold.default,
            duration: 200,
          },
          {
            type: "exhale",
            detail: "",
            color: colors.exhale.default,
            duration: 600,
          },
        ],
      },
      {
        code: "balance",
        durationInMinutes: 2,
        advanced: false,
        // Coherent breathing: ~5.5 breaths per minute, no hold.
        sequence: [
          {
            type: "inhale",
            detail: "",
            color: colors.inhale.default,
            duration: 550,
          },
          {
            type: "exhale",
            detail: "",
            color: colors.exhale.default,
            duration: 550,
          },
        ],
      },
      {
        code: "energy",
        durationInMinutes: 2,
        advanced: false,
        sequence: [
          {
            type: "inhale",
            detail: "stomach",
            color: colors.inhale.stomach,
            duration: 250,
          },
          {
            type: "inhale",
            detail: "chest",
            color: colors.inhale.chest,
            duration: 250,
          },
          {
            type: "exhale",
            detail: "",
            color: colors.exhale.default,
            duration: 500,
          },
        ],
      },
      {
        code: "focus",
        durationInMinutes: 2,
        advanced: false,
        sequence: [
          {
            type: "inhale",
            detail: "",
            color: colors.inhale.default,
            duration: 400,
          },
          {
            type: "hold",
            detail: "",
            color: colors.hold.default,
            duration: 400,
          },
          {
            type: "exhale",
            detail: "",
            color: colors.exhale.default,
            duration: 400,
          },
          {
            type: "hold",
            detail: "",
            color: colors.hold.default,
            duration: 400,
          },
        ],
      },
      {
        code: "emergency",
        durationInMinutes: 1,
        advanced: true,
        // Physiological sigh: deep inhale, short top-up inhale, long slow exhale.
        sequence: [
          {
            type: "inhale",
            detail: "stomach",
            color: colors.inhale.stomach,
            duration: 250,
          },
          {
            type: "inhale",
            detail: "chest",
            color: colors.inhale.chest,
            duration: 100,
          },
          {
            type: "exhale",
            detail: "",
            color: colors.exhale.default,
            duration: 600,
          },
        ],
      },
      {
        code: "dynamism",
        durationInMinutes: 1,
        advanced: true,
        sequence: [
          {
            type: "inhale",
            detail: "",
            color: colors.inhale.default,
            duration: 400,
          },
          {
            type: "exhale",
            detail: "",
            color: colors.exhale.default,
            duration: 200,
          },
        ],
      },
      {
        code: "chill",
        durationInMinutes: 2,
        advanced: true,
        sequence: [
          {
            type: "inhale",
            detail: "",
            color: colors.inhale.default,
            duration: 400,
          },
          {
            type: "hold",
            detail: "",
            color: colors.hold.default,
            duration: 700,
          },
          {
            type: "exhale",
            detail: "",
            color: colors.exhale.default,
            duration: 800,
          },
        ],
      },
    ],
  },
  getters: {},
  mutations: {
    setUserLocale(state, payload) {
      state.userLocale = payload.locale;
    },
    setTechniqueIndex(state, payload) {
      state.breathTechniqueIndex = payload.index;
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
