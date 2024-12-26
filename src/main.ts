import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { mask } from "vue-the-mask";
import base64Input from "@/directives/base64Input";
import "@/styles/main.scss";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBQZNSXX3AxT1y1l1QhwAm0QRV8QDtF_Vc",
  authDomain: "devtechw7-dashboard.firebaseapp.com",
  projectId: "devtechw7-dashboard",
  storageBucket: "devtechw7-dashboard.appspot.com",
  messagingSenderId: "1098366192965",
  appId: "1:1098366192965:web:c7e5a9b8d1f5c6a2d0d0d0",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Create Vue app
createApp(App)
  .use(router)
  .use(createPinia())
  .directive("mask", mask)
  .directive("base64-input", base64Input)
  .mount("#app");
