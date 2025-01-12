<template>
  <div class="send-advertisement">
    <h3 class="form__title w7-subtitle montserrat-medium">
      Send Advertisement
    </h3>

    <!-- Application Selection -->
    <div class="form__group">
      <label class="form__label">Select Application</label>
      <div class="application-list">
        <div v-for="app in applications" :key="app.id" class="application-item">
          <input
            type="radio"
            :id="'app-' + app.id"
            v-model="selectedApplication"
            :value="app.id" />
          <label :for="'app-' + app.id">{{ app.name }}</label>
        </div>
      </div>
    </div>

    <!-- Send to All Applications -->
    <div class="form__group">
      <LoadingButton
        :loading="loadingAll"
        text="Send to Selected Application"
        loadingText="Sending..."
        @click="sendToAll" />
    </div>

    <!-- Send to Single Recipient -->
    <div class="form__group">
      <label class="form__label">Send to Single Recipient</label>
      <input
        type="email"
        v-model="singleRecipient"
        class="form__input email-input"
        placeholder="Enter recipient email" />
      <LoadingButton
        :loading="loadingSingle"
        text="Send to Single Recipient"
        loadingText="Sending..."
        @click="sendToSingle" />
    </div>

    <!-- Email Subscription -->
    <EmailSubscription />

    <!-- Loading Dialog -->
    <LoadingDialog :visible="isLoading" :message="loadingMessage" />

    <!-- Confirmation Dialog -->
    <ConfirmationDialog
      v-if="showConfirm"
      :visible="showConfirm"
      title="Send Advertisement"
      message="Are you sure you want to send this advertisement?"
      @confirm="confirmSend"
      @cancel="cancelSend" />

    <!-- Error Dialog -->
    <AlertDialog
      v-if="showDialog"
      :title="dialogTitle"
      :message="dialogMessage"
      :visible="showDialog"
      @close="showDialog = false" />
  </div>
</template>

<script lang="ts">
import {
  sendAdvertisementToAll,
  sendAdvertisementToSingle,
} from "@/services/AdvertisementService";
import { fetchApplications } from "@/services/ApplicationService";
import LoadingButton from "@/components/LoadingButton.vue";
import LoadingDialog from "@/components/LoadingDialog.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import AlertDialog from "@/components/AlertDialog.vue";
import EmailSubscription from "@/components/EmailSubscription.vue"; // Import the EmailSubscription component
import { defineComponent, ref, onMounted } from "vue";
import { Application } from "@/models/application.model";

export default defineComponent({
  name: "SendAdvertisement",
  components: {
    LoadingButton,
    LoadingDialog,
    ConfirmationDialog,
    AlertDialog,
    EmailSubscription, // Register the EmailSubscription component
  },
  props: {
    advertisementId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const applications = ref<Application[]>([]);
    const selectedApplication = ref<number | null>(null);
    const singleRecipient = ref<string>("");
    const isLoading = ref(false);
    const loadingMessage = ref("");
    const showConfirm = ref(false);
    const pendingAction = ref<"all" | "single" | null>(null);
    const loadingAll = ref(false);
    const loadingSingle = ref(false);
    const showDialog = ref(false);
    const dialogTitle = ref("");
    const dialogMessage = ref("");

    const loadApplications = async () => {
      try {
        isLoading.value = true;
        loadingMessage.value = "Loading applications...";
        applications.value = await fetchApplications();
      } catch (error) {
        dialogTitle.value = "Error Loading Applications";
        dialogMessage.value =
          "An error occurred while loading the applications. Please try again.";
        showDialog.value = true;
      } finally {
        isLoading.value = false;
      }
    };

    const validateInputs = () => {
      if (!props.advertisementId) {
        dialogTitle.value = "Select an Advertisement";
        dialogMessage.value =
          "Please select an advertisement before sending it.";
        showDialog.value = true;
        return false;
      }
      if (!selectedApplication.value && !singleRecipient.value) {
        dialogTitle.value = "Select an Application or Enter an Email";
        dialogMessage.value =
          "Please select an application or enter an email address.";
        showDialog.value = true;
        return false;
      }
      return true;
    };

    const sendToAll = () => {
      if (!validateInputs()) return;
      pendingAction.value = "all";
      showConfirm.value = true;
    };

    const sendToSingle = () => {
      if (!validateInputs()) return;
      pendingAction.value = "single";
      showConfirm.value = true;
    };

    const confirmSend = async () => {
      showConfirm.value = false;

      if (pendingAction.value === "all" && selectedApplication.value) {
        loadingAll.value = true;
        try {
          await sendAdvertisementToAll(
            selectedApplication.value,
            props.advertisementId
          );
          dialogTitle.value = "Advertisement Sent";
          dialogMessage.value =
            "Advertisement sent to the selected application!";
          showDialog.value = true;
        } catch (error) {
          dialogTitle.value = "Error Sending Advertisement";
          dialogMessage.value =
            "Failed to send advertisement to the selected application.";
          showDialog.value = true;
        } finally {
          loadingAll.value = false;
        }
      }

      if (pendingAction.value === "single") {
        loadingSingle.value = true;
        try {
          await sendAdvertisementToSingle(
            singleRecipient.value,
            props.advertisementId
          );
          dialogTitle.value = "Advertisement Sent";
          dialogMessage.value = "Advertisement sent to the single recipient!";
          showDialog.value = true;
        } catch (error) {
          dialogTitle.value = "Error Sending Advertisement";
          dialogMessage.value =
            "Failed to send advertisement to the single recipient.";
          showDialog.value = true;
        } finally {
          loadingSingle.value = false;
        }
      }
    };

    const cancelSend = () => {
      showConfirm.value = false;
    };

    onMounted(loadApplications);

    return {
      applications,
      selectedApplication,
      singleRecipient,
      isLoading,
      loadingMessage,
      showConfirm,
      loadingAll,
      loadingSingle,
      sendToAll,
      sendToSingle,
      confirmSend,
      cancelSend,
      showDialog,
      dialogTitle,
      dialogMessage,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.send-advertisement {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .application-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .application-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .email-input {
    padding: 12px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid $mikado-yellow;
    background-color: #fff;
    color: $black;
  }

  .form__group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
