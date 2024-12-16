<template>
  <div class="home">
    <h1 class="montserrat-bold w7-title w7-margin">Applications Dashboard</h1>
    <ApplicationList />
    <AnalyticsDashboard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ApplicationList from "@/components/ApplicationList.vue";
import AnalyticsDashboard from "./AnalyticsDashboard.vue";

export default defineComponent({
  name: "HomeView",
  components: { ApplicationList, AnalyticsDashboard },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.home {
  padding: 16px;
  background-color: $black;
  color: $mikado-yellow;
  min-height: 100vh;
}
</style>
