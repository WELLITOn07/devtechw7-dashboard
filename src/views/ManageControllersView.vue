<template>
  <div class="manage-view">
    <h1 class="manage-view__title montserrat-bold w7-title w7-margin">
      Manage Controllers for {{ application?.name }}
    </h1>
    <div v-if="loading" class="manage-view__loading">
      Loading application...
    </div>
    <div v-else-if="error" class="manage-view__error">{{ error }}</div>
    <div v-else>
      <div v-if="application?.controllers?.length">
        <div
          v-for="(controller, index) in application.controllers"
          :key="`controller-${index}`"
          class="manage-view__controller-section">
          <h3 class="manage-view__controller-title">{{ controller.name }}</h3>
        </div>
      </div>
      <div v-else class="manage-view__empty-controllers">
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

  &__title {
    margin-bottom: 24px;
    color: $gold;
    font-size: 2rem;
  }

  &__loading,
  &__error {
    font-size: 1.2rem;
    text-align: center;
    margin: 16px 0;
  }

  &__controller-title {
    margin-top: 24px;
    font-size: 1.5rem;
    color: $gold;
  }

  &__empty-controllers {
    font-size: 1.2rem;
    color: $alert-success;
    text-align: center;
    margin-top: 16px;
  }
}
</style>
