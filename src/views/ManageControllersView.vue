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
    <AlertDialog
      v-if="showDialog"
      :title="dialogTitle"
      :message="dialogMessage"
      :visible="showDialog"
      @close="showDialog = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useApplicationStore } from "@/store/application";
import { Application } from "@/models/application.model";
import { fetchControllerData } from "@/services/controllerService";
import CrudForm from "@/components/CrudForm.vue";
import AlertDialog from "@/components/AlertDialog.vue";
import axios from "axios";

export default defineComponent({
  name: "ManageControllersView",
  components: { CrudForm, AlertDialog },
  setup() {
    const route = useRoute();
    const applicationStore = useApplicationStore();
    const application = ref<Application | null>(null);
    const controllerData = ref<{ name: string; data: Record<string, any> }[]>(
      []
    );
    const loading = ref(true);
    const error = ref("");
    const dialogTitle = ref("");
    const dialogMessage = ref("");
    const showDialog = ref(false);

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
          for (const controller of application.value.controllers) {
            try {
              const data = await fetchControllerData(String(controller));
              controllerData.value.push({ name: String(controller), data });
            } catch (controllerError) {
              console.warn(
                `Failed to fetch data for controller "${controller}":`,
                controllerError
              );
            }
          }
        } else {
          console.warn("Controllers not found in application.");
        }
      } catch (err) {
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
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("Authentication token is missing.");
        }

        const response = await axios.post(
          `${process.env.VUE_APP_API_URL}/${controllerName}`,
          updatedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          dialogTitle.value = "Success";
          dialogMessage.value = `Data for controller "${controllerName}" saved successfully!`;
          showDialog.value = true;
        } else {
          throw new Error(
            `Unexpected response: ${response.status} - ${response.statusText}`
          );
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          dialogTitle.value = "Error Saving Data";
          dialogMessage.value =
            error.response?.data.message ||
            `Failed to save data for "${controllerName}". Please try again.`;
        } else {
          dialogTitle.value = "Unexpected Error";
          dialogMessage.value =
            error instanceof Error
              ? error.message
              : "An unexpected error occurred. Please try again.";
        }
        showDialog.value = true;
      }
    };

    return {
      application,
      controllerData,
      loading,
      error,
      dialogTitle,
      dialogMessage,
      showDialog,
      handleSave,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

.manage-view {
  padding: 16px;
  background-color: $black;
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
