import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { mask } from "vue-the-mask";
import base64Input from "@/directives/base64Input";
import "@/styles/main.scss";
import { initializeApp } from "firebase/app";

const app = createApp(App);

const firebaseConfig = {
  apiKey: "AIzaSyB-WJEa5EVU0Nlj1SyZWD0Qxf7wqqI_90M",
  authDomain: "devtechw7-dash.firebaseapp.com",
  projectId: "devtechw7-dash",
  storageBucket: "devtechw7-dash.firebasestorage.app",
  messagingSenderId: "245171211136",
  appId: "1:245171211136:web:d559fde9994505b8a64f65",
};

const appFirebase = initializeApp(firebaseConfig);

app
  .use(router)
  .use(createPinia())
  .directive("mask", mask)
  .directive("base64-input", base64Input)
  .mount("#app");
