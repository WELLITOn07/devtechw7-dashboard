import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(!!sessionStorage.getItem("access_token"));

  function setAuthenticated(value: boolean) {
    isAuthenticated.value = value;
  }

  return {
    isAuthenticated,
    setAuthenticated,
  };
});
