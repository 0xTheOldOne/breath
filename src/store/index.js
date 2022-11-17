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
    breathTechnique: "",
    breathTechniques: [
      {
        code: "relax",
        sequence: [
          {
            type: "inhale",
            length: 4,
          },
          {
            type: "exhale",
            length: 6,
          },
        ],
      },
      {
        code: "balance",
        sequence: [
          {
            type: "inhale",
            detail: "",
            length: 4,
          },
          {
            type: "hold",
            detail: "",
            length: 2,
          },
          {
            type: "exhale",
            detail: "",
            length: 4,
          },
        ],
      },
      {
        code: "energy",
        sequence: [
          {
            type: "inhale",
            detail: "stomach",
            length: 2.5,
          },
          {
            type: "inhale",
            detail: "chest",
            length: 2.5,
          },
          {
            type: "exhale",
            detail: "",
            length: 5,
          },
        ],
      },
      {
        code: "focus",
        sequence: [
          {
            type: "inhale",
            detail: "",
            length: 4,
          },
          {
            type: "hold",
            detail: "",
            length: 4,
          },
          {
            type: "exhale",
            detail: "",
            length: 4,
          },
          {
            type: "hold",
            detail: "",
            length: 4,
          },
        ],
      },
      {
        code: "dynamism",
        sequence: [
          {
            type: "inhale",
            length: 4,
          },
          {
            type: "exhale",
            length: 2,
          },
        ],
      },
      {
        code: "chill",
        sequence: [
          {
            type: "inhale",
            detail: "",
            length: 4,
          },
          {
            type: "hold",
            detail: "",
            length: 7,
          },
          {
            type: "exhale",
            detail: "",
            length: 8,
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
        localStorage.setItem(vuexPersistKey, JSON.stringify(state));
      }

      console.debug("Retrieving settings from localStorage... DONE");
    },
    setUserLocale(state, payload) {
      console.debug(payload);
      state.userLocale = payload.locale;
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin],
});
