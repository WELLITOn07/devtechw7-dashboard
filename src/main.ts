import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { mask } from "vue-the-mask";
import base64Input from "@/directives/base64Input";
import "@/styles/main.scss";

const app = createApp(App);

app
  .use(router)
  .use(createPinia())
  .directive("mask", mask)
  .directive("base64-input", base64Input)
  .mount("#app");
