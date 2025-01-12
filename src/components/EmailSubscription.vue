<template>
  <div class="email-subscription">
    <h4 class="subscription-title montserrat-bold">
      Manage Email Subscriptions
    </h4>

    <!-- Input de emails -->
    <textarea v-model="emailInput" class="form__textarea" placeholder="Enter emails, one per line"></textarea>

    <!-- Select para escolher a aplicação -->
    <label for="applicationSelect" class="form__label montserrat-regular">
      Select Application:
    </label>
    <select id="applicationSelect" v-model="selectedApplication" class="form__select">
      <option v-for="(name, id) in applicationOptions" :key="id" :value="id">
        {{ name }}
      </option>
    </select>

    <!-- Botões de ação -->
    <div class="email-actions">
      <button class="btn btn-light" :disabled="!parsedEmails.length || !selectedApplication || loading"
        @click="subscribeEmails">
        {{ loading ? "Subscribing..." : "Subscribe" }}
      </button>
      <button class="btn btn-danger" :disabled="loading" @click="clearInputs">
        Clear Inputs
      </button>
    </div>

    <!-- Alertas e Loading -->
    <AlertDialog v-model:visible="showAlert" :title="alertTitle" :message="alertMessage" @close="showAlert = false" />
    <LoadingDialog v-if="loading" :loading="loading" :message="loadingMessage" />

    <!-- Tabela de Assinaturas -->
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
            <button class="btn btn-light" :disabled="loading" @click="removeSubscription(subscription.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
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
    // Limpa os campos de entrada
    clearInputs() {
      this.emailInput = "";
      this.selectedApplication = null;
    },

    // Assina os emails com a aplicação selecionada
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
      this.alertMessage = "";

      try {
        for (const email of this.parsedEmails) {
          if (validateEmail(email)) {
            await createSubscription({
              email,
              applicationIds: [Number(this.selectedApplication)],
            });
          }
        }
        this.showAlertMessage(
          "Success",
          "All emails subscribed successfully!"
        );
        await this.fetchExistingSubscriptions();
      } catch (error) {
        this.showAlertMessage("Error", error.message);
      } finally {
        this.toggleLoading(false);
        this.clearInputs();
      }
    },

    // Busca assinaturas existentes
    async fetchExistingSubscriptions() {
      this.toggleLoading(true);
      this.alertMessage = "";

      try {
        this.subscriptions = await fetchSubscriptions();
      } catch (error) {
        this.alertMessage = `Failed to load subscriptions: ${error.message}`;
      } finally {
        this.toggleLoading(false);
      }
    },

    // Remove uma assinatura pelo ID
    async removeSubscription(id) {
      this.toggleLoading(true);
      this.alertMessage = "";

      try {
        await deleteSubscription(id);
        this.showAlertMessage(
          "Success",
          "Subscription deleted successfully!"
        );
        await this.fetchExistingSubscriptions();
      } catch (error) {
        this.showAlertMessage("Error", error.message);
      } finally {
        this.toggleLoading(false);
      }
    },

    // Retorna o nome da aplicação a partir do ID
    getApplicationName(appId) {
      return this.applicationOptions[appId] || "Unknown";
    },

    // Mostra mensagem de erro ou sucesso
    showAlertMessage(title, message) {
      this.alertTitle = title;
      this.alertMessage = message;
      this.showAlert = true;
    },

    // Alterna visibilidade do loading
    toggleLoading(state, message = "Loading...") {
      this.loading = state;
      this.loadingMessage = message;
    },
  },

  // Carrega assinaturas ao montar o componente
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
}

.form__select {
  width: 100%;
  margin-bottom: 1rem;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
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
}

.subscriptions-table th,
.subscriptions-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
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
