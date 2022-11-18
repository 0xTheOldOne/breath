import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
const vuexPersistKey = "store";

const vuexLocal = new VuexPersistence({
  key: vuexPersistKey,
  storage: window.localStorage,
  reducer: (state) => ({
    userLocale: state.userLocale,
    breathTechnique: state.breathTechnique,
  }),
});

export default createStore({
  state: {
    userLocale: "",
    breathTechniqueIndex: 0,
    breathTechnique: {},
    breathTechniques: [
      {
        code: "relax",
        sequence: [
          {
            type: "inhale",
            detail: "",
            color: "#2196f3",
            duration: 400,
          },
          {
            type: "exhale",
            detail: "",
            color: "#f44336",
            duration: 600,
          },
        ],
      },
      {
        code: "balance",
        sequence: [
          {
            type: "inhale",
            detail: "",
            color: "#2196f3",
            duration: 400,
          },
          {
            type: "hold",
            detail: "",
            color: "lightgreen",
            duration: 200,
          },
          {
            type: "exhale",
            detail: "",
            color: "#f44336",
            duration: 400,
          },
        ],
      },
      {
        code: "energy",
        sequence: [
          {
            type: "inhale",
            detail: "stomach",
            color: "#64b5f6",
            duration: 250,
          },
          {
            type: "inhale",
            detail: "chest",
            color: "#1976d2",
            duration: 250,
          },
          {
            type: "exhale",
            detail: "",
            color: "#f44336",
            duration: 500,
          },
        ],
      },
      {
        code: "focus",
        sequence: [
          {
            type: "inhale",
            detail: "",
            color: "#2196f3",
            duration: 400,
          },
          {
            type: "hold",
            detail: "",
            color: "lightgreen",
            duration: 400,
          },
          {
            type: "exhale",
            detail: "",
            color: "#f44336",
            duration: 400,
          },
          {
            type: "hold",
            detail: "",
            color: "lightgreen",
            duration: 400,
          },
        ],
      },
      {
        code: "dynamism",
        sequence: [
          {
            type: "inhale",
            detail: "",
            color: "#2196f3",
            duration: 400,
          },
          {
            type: "exhale",
            detail: "",
            color: "#f44336",
            duration: 200,
          },
        ],
      },
      {
        code: "chill",
        sequence: [
          {
            type: "inhale",
            detail: "",
            color: "#2196f3",
            duration: 400,
          },
          {
            type: "hold",
            detail: "",
            color: "lightgreen",
            duration: 700,
          },
          {
            type: "exhale",
            detail: "",
            color: "#f44336",
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
    setTechnique(state, payload) {
      console.debug(payload);
      state.breathTechnique = payload.technique;
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
