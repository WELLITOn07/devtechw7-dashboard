import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { mask } from "vue-the-mask";
import "@/styles/main.scss";

createApp(App)
  .use(router)
  .use(createPinia())
  .directive("mask", mask)
  .mount("#app");
