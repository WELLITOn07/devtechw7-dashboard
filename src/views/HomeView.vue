<template>
  <div class="home">
    <h1 class="montserrat-bold w7-title w7-margin">Applications Dashboard</h1>
    <ApplicationList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ApplicationList from "../components/ApplicationList.vue";

export default defineComponent({
  name: "HomeView",
  components: { ApplicationList },
});
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

.home {
  padding: 16px;
  background-color: $black;
  color: $mikado-yellow;
  min-height: 100vh;
}
</style>
