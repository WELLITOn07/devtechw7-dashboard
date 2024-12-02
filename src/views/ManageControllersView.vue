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
      <div v-if="controllerData.length">
        <div
          v-for="(controller, index) in controllerData"
          :key="`controller-${index}`"
          class="manage-view__controller-section">
          <h3 class="manage-view__controller-title">{{ controller.name }}</h3>
          <CrudForm
            :data="controller.data"
            @save="handleSave(controller.name, $event)" />
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
import { fetchControllerData } from "@/services/controllerService";
import CrudForm from "@/components/CrudForm.vue";

export default defineComponent({
  name: "ManageControllersView",
  components: { CrudForm },
  setup() {
    const route = useRoute();
    const applicationStore = useApplicationStore();
    const application = ref<Application | null>(null);
    const controllerData = ref<{ name: string; data: Record<string, any> }[]>(
      []
    );
    const loading = ref(true);
    const error = ref("");

    onMounted(async () => {
      const applicationName = route.params.name as string;

      try {
        const selectedApplication =
          applicationStore.getApplicationByName(applicationName);

        if (!selectedApplication) {
          throw new Error(
            `Application with name "${applicationName}" not found.`
          );
        }

        application.value = selectedApplication;

        if (application.value?.controllers) {
          console.log("Fetching data for controllers...");
          for (const controller of application.value.controllers) {
            try {
              const data = await fetchControllerData(String(controller));
              controllerData.value.push({ name: String(controller), data });
              console.log(`Fetched data for controller:`, data);
            } catch (controllerError) {
              console.error(
                `Failed to fetch data for controller "${controller}":`,
                controllerError
              );
            }
          }
        } else {
          console.warn("Controllers not found in application.");
        }
      } catch (err) {
        console.error(err);
        error.value = `Error: ${
          err instanceof Error ? err.message : "Unknown error."
        }`;
      } finally {
        loading.value = false;
      }
    });

    const handleSave = async (controllerName: string, updatedData: string) => {
      try {
        const parsedData = JSON.parse(updatedData); // Convert the string back to an object
        console.log(
          `Saving data for controller "${controllerName}":`,
          parsedData
        );
        // Add logic for saving updated data to the backend
        alert(`Controller "${controllerName}" data saved successfully!`);
      } catch (err) {
        console.error(`Failed to save data for "${controllerName}":`, err);
        alert(`Failed to save data for "${controllerName}".`);
      }
    };

    return {
      application,
      controllerData,
      loading,
      error,
      handleSave,
    };
  },
});
</script>
