<template>
  <div class="home">
    <AppHeader />
    <h1 class="montserrat-bold w7-title w7-margin">Applications Dashboard</h1>
    <ApplicationList />
    <AnalyticsDashboard />
    <div class="advertisement__container" @click="goToAdvertisementCentral">
      <h2>Central de Propagandas</h2>
      <p>Gerencie suas propagandas e campanhas com facilidade.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ApplicationList from "@/components/ApplicationList.vue";
import AnalyticsDashboard from "@/views/AnalyticsDashboard.vue";
import AppHeader from "@/components/Header.vue";

export default defineComponent({
  name: "HomeView",
  components: { ApplicationList, AnalyticsDashboard, AppHeader },
  methods: {
    goToAdvertisementCentral() {
      this.$router.push({ name: "advertisement-central" });
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.home {
  padding: 16px;
  background-color: $black;
  color: $white;
  min-height: 100vh;
}

.advertisement__container {
  background-color: #001d3d;
  color: #ffc300;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-top: 24px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }

  p {
    font-size: 1rem;
    color: $white;
  }
}
</style>
