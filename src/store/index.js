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
    breathTechnique: {},
    breathTechniques: [
      {
        code: "emergency",
        durationInMinutes: 1,
        advanced: true,
        sequence: [
          {
            type: "inhale",
            detail: "",
            color: colors.inhale.default,
            duration: 150,
          },
          {
            type: "hold",
            detail: "",
            color: colors.hold.default,
            duration: 25,
          },
          {
            type: "inhale",
            detail: "",
            color: colors.inhale.chest,
            duration: 50,
          },
          {
            type: "hold",
            detail: "",
            color: colors.hold.default,
            duration: 25,
          },
          {
            type: "exhale",
            detail: "",
            color: colors.exhale.default,
            duration: 300,
          },
        ],
      },
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
            duration: 400,
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
    resetLocalStorage(state) {
      console.debug("Reset localStorage...");

      // Delete localStorage state
      localStorage.removeItem(vuexPersistKey);

      this.commit("initializeFromLocalStorage");

      console.debug("Reset localStorage... DONE");
    },
    initializeFromLocalStorage(state) {
      console.debug("Retrieving settings from localStorage...");

      if (localStorage.getItem(vuexPersistKey) != null && localStorage.getItem(vuexPersistKey) != undefined) {
        state = JSON.parse(localStorage.getItem(vuexPersistKey));
      } else {
        this.commit({
          type: "setTechnique",
          technique: state.breathTechniques[state.breathTechniqueIndex],
        });
        localStorage.setItem(vuexPersistKey, JSON.stringify(state));
      }

      console.debug("Retrieving settings from localStorage... DONE");
    },
    setUserLocale(state, payload) {
      console.debug(payload);
      state.userLocale = payload.locale;
    },
    setTechniqueIndex(state, payload) {
      console.debug(payload);
      state.breathTechniqueIndex = payload.index;
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
