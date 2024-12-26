<!-- src/components/Navigation.vue -->
<template>
  <nav class="navigation">
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/courses" class="nav-link">Courses</router-link>
    <router-link to="/analytics-dashboard" class="nav-link">
      Analytics
    </router-link>
    <router-link to="/advertisement-central" class="nav-link">
      Advertisement
    </router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navigation",
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.navigation {
  background-color: $black;
  padding: 1rem;
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: $white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: lighten($black, 10%);
  }

  &.router-link-active {
    background-color: $primary;
  }
}
</style>
