<template>
  <div class="manage-view">
    <h1 class="montserrat-bold w7-title w7-margin">
      Manage Controllers for {{ application?.name }}
    </h1>
    <div v-if="loading" class="loading">Loading application...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <!-- Debug output -->
      <div v-if="application?.controllers?.length">
        <div
          v-for="controller in application.controllers"
          :key="controller"
          class="controller-section">
          <h3 class="controller-title">{{ controller }}</h3>
        </div>
      </div>
      <div v-else class="empty-controllers">
        No controllers found for this application.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useApplicationStore } from "@/store/application";
import { Application } from "@/models/application.model";

export default defineComponent({
  name: "ManageControllersView",
  setup() {
    const route = useRoute();
    const applicationStore = useApplicationStore();

    const application = ref<Application | null>(null);
    const loading = ref(true);
    const error = ref("");

    onMounted(() => {
      const applicationName = route.params.name as string;

      try {
        const selectedApplication =
          applicationStore.getApplicationByName(applicationName);
        if (!selectedApplication) {
          throw new Error(`Application "${applicationName}" not found.`);
        }
        application.value = selectedApplication;
      } catch (err) {
        error.value = `Error: ${
          err instanceof Error ? err.message : "Unknown error."
        }`;
      } finally {
        loading.value = false;
      }
    });

    return {
      application,
      loading,
      error,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

.manage-view {
  padding: 16px;
  background-color: $rich-black;
  color: $mikado-yellow;
  min-height: 100vh;

  & h1 {
    margin-bottom: 24px;
    color: $gold;
    font-size: 2rem;
  }

  .loading,
  .error {
    font-size: 1.2rem;
    text-align: center;
    margin: 16px 0;
  }

  .controller-title {
    margin-top: 24px;
    font-size: 1.5rem;
    color: $gold;
  }

  .empty-controllers {
    font-size: 1.2rem;
    color: green;
    text-align: center;
    margin-top: 16px;
  }
}
</style>
