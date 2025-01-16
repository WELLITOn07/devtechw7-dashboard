<template>
  <div class="email-subscription">
    <h4 class="subscription-title montserrat-bold">
      Manage Email Subscriptions
    </h4>

    <textarea
      v-model="emailInput"
      class="form__textarea"
      placeholder="Enter emails, one per line"></textarea>

    <label for="applicationSelect" class="form__label montserrat-regular">
      Select Application:
    </label>
    <select
      id="applicationSelect"
      v-model="selectedApplication"
      class="form__select">
      <option v-for="(name, id) in applicationOptions" :key="id" :value="id">
        {{ name }}
      </option>
    </select>

    <!-- Botões de ação -->
    <div class="email-actions">
      <button
        class="btn btn-light"
        :disabled="!parsedEmails.length || !selectedApplication || loading"
        @click="subscribeEmails">
        {{ loading ? "Subscribing..." : "Subscribe" }}
      </button>
      <button class="btn btn-danger" :disabled="loading" @click="clearInputs">
        Clear Inputs
      </button>
    </div>

    <AlertDialog
      v-model:visible="showAlert"
      :title="alertTitle"
      :message="alertMessage"
      @close="showAlert = false" />
    <LoadingDialog
      v-if="loading"
      :loading="loading"
      :message="loadingMessage" />

    <table class="subscriptions-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Applications</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="subscription in subscriptions" :key="subscription.id">
          <td class="email-column">{{ subscription.email }}</td>
          <td class="apps-column">
            {{
              subscription.applicationIds
                .map((appId) => getApplicationName(appId))
                .join(", ")
            }}
          </td>

          <td class="actions-column">
            <button
              class="btn btn-light"
              :disabled="loading"
              @click="removeSubscription(subscription.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">Total de emails obtidos: {{ totalEmails }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import {
  createSubscription,
  fetchSubscriptions,
  deleteSubscription,
} from "../services/SubscriptionService";
import LoadingDialog from "./LoadingDialog.vue";
import AlertDialog from "@/components/AlertDialog.vue";
import { parseEmailList, validateEmail } from "@/utils/emailUtils";
import { ApplicationNames } from "@/models/subscription.model";

export default {
  components: {
    LoadingDialog,
    AlertDialog,
  },
  data() {
    return {
      emailInput: "",
      selectedApplication: null,
      loading: false,
      loadingMessage: "Loading...",
      alertMessage: "",
      alertTitle: "",
      showAlert: false,
      subscriptions: [],
      totalEmails: 0,
    };
  },
  computed: {
    parsedEmails() {
      return parseEmailList(this.emailInput);
    },
    applicationOptions() {
      return Object.keys(ApplicationNames).reduce((options, key) => {
        const value = ApplicationNames[key];
        if (typeof value === "number") {
          options[value] = key;
        }
        return options;
      }, {});
    },
  },
  methods: {
    clearInputs() {
      this.emailInput = "";
      this.selectedApplication = null;
    },

    async subscribeEmails() {
      if (!this.parsedEmails.length) {
        this.showAlertMessage("Error", "No emails to subscribe!");
        return;
      }

      if (!this.selectedApplication) {
        this.showAlertMessage("Error", "Please select an application!");
        return;
      }

      this.toggleLoading(true);

      try {
        for (const email of this.parsedEmails) {
          if (validateEmail(email)) {
            await createSubscription({
              email,
              applicationIds: [Number(this.selectedApplication)],
            });
          }
        }
        this.showAlertMessage("Success", "All emails subscribed successfully!");
        await this.fetchExistingSubscriptions();
        this.updateEmailCount(this.subscriptions.length);
      } catch (error) {
        this.showAlertMessage("Error", error.message);
      } finally {
        this.toggleLoading(false);
        this.clearInputs();
      }
    },

    async fetchExistingSubscriptions() {
      this.toggleLoading(true);

      try {
        this.subscriptions = await fetchSubscriptions();
        this.updateEmailCount(this.subscriptions.length);
      } catch (error) {
        this.alertMessage = `Failed to load subscriptions: ${error.message}`;
      } finally {
        this.toggleLoading(false);
      }
    },

    async removeSubscription(id) {
      this.toggleLoading(true);

      try {
        await deleteSubscription(id);
        this.showAlertMessage("Success", "Subscription deleted successfully!");
        await this.fetchExistingSubscriptions();
      } catch (error) {
        this.showAlertMessage("Error", error.message);
      } finally {
        this.toggleLoading(false);
      }
    },

    getApplicationName(appId) {
      return this.applicationOptions[appId] || "Unknown";
    },

    showAlertMessage(title, message) {
      this.alertMessage = "";
      this.alertTitle = "";
      this.alertTitle = title;
      this.alertMessage = message;
      this.showAlert = true;
    },

    toggleLoading(state, message = "Loading...") {
      this.loading = state;
      this.loadingMessage = message;
    },

    updateEmailCount(newCount) {
      this.totalEmails = newCount;
    },
  },

  mounted() {
    this.fetchExistingSubscriptions();
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
@import "@/styles/_mixins.scss";

.email-subscription {
  margin-bottom: 20px;
  @include Applicationcard;
}

.form__textarea {
  width: 100%;
  min-height: 100px;
  margin-bottom: 1rem;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: $oxford-blue;
  color: $white;
}

.form__select {
  width: 100%;
  margin-bottom: 1rem;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: $oxford-blue;
  color: $white;
}

.email-actions {
  margin-bottom: 1rem;
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 15px;
  border-radius: 4px;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-light {
  background-color: $mikado-yellow;
  color: $black;
}

.btn-light:hover {
  background-color: darken($mikado-yellow, 10%);
  transform: translateY(-2px);
}

.btn-danger {
  background-color: $error;
  color: $black;
}

.btn-danger:hover {
  background-color: darken($error, 10%);
  transform: translateY(-2px);
}

.subscriptions-table {
  width: 100%;
  border-collapse: collapse;

  thead {
    position: sticky;
    top: 0;
    background-color: $oxford-blue;
    z-index: 10;
  }

  tfoot {
    background-color: $oxford-blue;

    td {
      font-size: 16px;
      font-weight: bold;
      padding: 10px;
      text-align: center;
    }
  }

  th,
  td {
    padding: 10px;
    border: 1px solid $white;
    text-align: left;
  }

  tbody {
    display: table-row-group;
    max-height: 500px;
    overflow-y: auto;
    width: 100%;

    &::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    &::-webkit-scrollbar-track {
      background: $white;
    }

    &::-webkit-scrollbar-thumb {
      background: $secondary;
      border-radius: 6px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: $secondary;
    }
  }

  tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
}

.subscriptions-table thead {
  position: sticky;
  top: 0;
  background: $oxford-blue;
  z-index: 10;
}

.subscriptions-table th,
.subscriptions-table td {
  padding: 10px;
  border: 1px solid $white;
}

.subscriptions-table tbody {
  display: block;
  max-height: 500px;
  overflow-y: auto;
}

.subscription-title {
  padding: 10px;
}

.subscriptions-table tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

@media (max-width: 768px) {
  .email-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .form__textarea,
  .form__select {
    margin-bottom: 1rem;
  }
}
</style>
