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
      <div>
        <CrudForm
          v-for="(controller, index) in controllerData"
          :key="`controller-${index}`"
          :data="controller.data"
          :name="controller.name"
          @save="handleSave(controller.name, $event)" />
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

    const handleSave = async (
      controllerName: string,
      updatedData: Record<string, any>
    ) => {
      try {
        console.log(
          `Saving data for controller "${controllerName}":`,
          updatedData
        );
        alert(`Data for controller "${controllerName}" saved successfully!`);
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

<style scoped lang="scss">
@import "../styles/_variables.scss";

.manage-view {
  padding: 16px;
  background-color: $rich-black;
  color: $mikado-yellow;
  min-height: 100vh;

  &__title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 24px;
  }

  &__loading,
  &__error {
    font-size: 1.2rem;
    text-align: center;
    margin: 16px 0;
  }
}
</style>
