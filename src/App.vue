<template>
  <div class="app">
    <AppHeader v-if="isAuthenticated" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/Header.vue";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
  },
  setup() {
    const authStore = useAuthStore();

    return { isAuthenticated: authStore.isAuthenticated };
  },
});
</script>

<style lang="scss">
@import "@/styles/_variables.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Roboto", sans-serif;
  background-color: $oxford-blue;
  color: $white;
  min-height: 100vh;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.w7-margin {
  margin: 0 auto;
  max-width: 1400px;
  width: 100%;
  padding: 0 2rem;

  @media (max-width: 767px) {
    padding: 0 1rem;
  }
}

.w7-space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.w7-title {
  color: $mikado-yellow;
  margin-bottom: 2rem;
}

.montserrat-bold {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
}

.roboto-medium {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
}

.roboto-light {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
}
</style>
