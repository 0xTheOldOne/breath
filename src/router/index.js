import { createRouter, createWebHashHistory } from "vue-router";
import BreathView from "../views/BreathView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: BreathView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
