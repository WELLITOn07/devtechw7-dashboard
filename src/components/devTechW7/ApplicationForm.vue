<template>
  <form @submit.prevent="handleSave" class="application-form w7-padding">
    <h3 class="form__title w7-subtitle montserrat-medium">Application Form</h3>
    <div
      v-for="(application, index) in formData"
      :key="index"
      class="form__section">
      <div class="form__group">
        <label :for="'application-name-' + index" class="form__label__index">
          Application {{ index + 1 }}
        </label>
      </div>
      <div class="form__group">
        <label :for="'application-name-' + index" class="form__label">
          Name
        </label>
        <input
          type="text"
          :id="'application-name-' + index"
          v-model="application.name"
          class="form__input"
          placeholder="Enter Application Name" />
      </div>
      <div class="form__group">
        <label :for="'application-description-' + index" class="form__label">
          Description
        </label>
        <textarea
          :id="'application-description-' + index"
          v-model="application.description"
          class="form__input form__textarea"
          placeholder="Enter Description"></textarea>
      </div>
      <div class="form__group">
        <label :for="'application-controllers-' + index" class="form__label">
          Controllers
        </label>
        <input
          type="text"
          :id="'application-controllers-' + index"
          v-model="controllersStrings[index]"
          class="form__input"
          placeholder="Comma-separated Controllers" />
      </div>
      <div class="form__group">
        <label :for="'application-allowedRoles-' + index" class="form__label">
          Allowed Roles
        </label>
        <input
          type="text"
          :id="'application-allowedRoles-' + index"
          v-model="allowedRolesStrings[index]"
          class="form__input"
          placeholder="Comma-separated Allowed Roles" />
      </div>
      <button
        type="button"
        class="form__button btn btn-danger"
        @click="removeApplication(index, application.id)">
        Remove Application
      </button>
    </div>
    <div class="form__actions w7-column-space-between">
      <button
        type="button"
        class="form__button btn btn-primary"
        @click="addApplication">
        Add Application
      </button>
      <button
        type="submit"
        class="form__button btn btn-success"
        :disabled="!formData.length">
        Save All
      </button>
    </div>

    <AlertDialog
      v-if="showDialog"
      :title="dialogTitle"
      :message="dialogMessage"
      :visible="showDialog"
      @close="showDialog = false" />
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Application } from "@/models/application.model";
import AlertDialog from "@/components/AlertDialog.vue";
import { deleteApplication } from "@/services/ApplicationService";

export default defineComponent({
  name: "ApplicationForm",
  components: { AlertDialog },
  emits: {
    save: (data: Application[]) => true,
  },
  props: {
    data: {
      type: Object as PropType<{ data: Application[] }>,
      required: true,
    },
  },
  data() {
    const rawData = Array.isArray(this.data.data) ? this.data.data : [];

    return {
      formData: rawData.map((app) => ({
        ...app,
        controllers: app.controllers || [],
        allowedRoles: app.allowedRoles || [],
      })),
      controllersStrings: rawData.map((app) =>
        (app.controllers || []).join(", ")
      ),
      allowedRolesStrings: rawData.map((app) =>
        (app.allowedRoles || []).join(", ")
      ),
    };
  },

  setup() {
    const dialogTitle = ref("");
    const dialogMessage = ref("");
    const showDialog = ref(false);

    return {
      dialogTitle,
      dialogMessage,
      showDialog,
    };
  },
  methods: {
    handleSave() {
      this.formData.forEach((application: any, index: number) => {
        application.controllers = this.controllersStrings[index]
          .split(",")
          .map((controller) => controller.trim());
        application.allowedRoles = this.allowedRolesStrings[index]
          .split(",")
          .map((role) => role.trim());

        // Remove o campo createdAt
        delete application.createdAt;
      });
      this.$emit("save", this.formData);
    },
    addApplication() {
      this.formData.push({
        name: "",
        description: "",
        controllers: [],
        allowedRoles: [],
        id: 0,
        createdAt: "",
      });
      this.controllersStrings.push("");
      this.allowedRolesStrings.push("");
    },
    async removeApplication(index: number, id: number | undefined) {
      if (!id) {
        this.dialogTitle = "Error";
        this.dialogMessage = "Cannot delete unsaved application.";
        this.showDialog = true;
        return;
      }

      try {
        await deleteApplication(id);
        this.formData.splice(index, 1);
        this.controllersStrings.splice(index, 1);
        this.allowedRolesStrings.splice(index, 1);

        this.dialogTitle = "Success";
        this.dialogMessage = "Application deleted successfully!";
        this.showDialog = true;
      } catch (error) {
        this.dialogTitle = "Error";
        this.dialogMessage =
          error instanceof Error
            ? error.message
            : "Failed to delete application.";
        this.showDialog = true;
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
@import "@/styles/_mixins.scss";

.application-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: $oxford-blue;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  .form__title {
    color: $white;
    margin-bottom: 12px;
  }

  .form__section {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    border: 1px solid $yale-blue;
    border-radius: 8px;
    background-color: $black;
  }

  .form__group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .form__label {
      font-size: 14px;
      font-weight: bold;
      color: $white;

      &__index {
        color: $mikado-yellow;
      }
    }

    .form__input {
      padding: 10px;
      border-radius: 4px;
      border: 1px solid $yale-blue;
      background-color: $black;
      color: $white;

      &.form__textarea {
        height: 80px;
        resize: none;
      }
    }
  }

  .form__button {
    padding: 12px 24px;
    border-radius: 4px;
    font-size: 16px;

    &.btn-primary {
      background-color: $primary;
      color: $white;

      &:hover {
        background-color: darken($primary, 10%);
      }
    }

    &.btn-success {
      background-color: $success;
      color: $white;

      &:hover {
        background-color: darken($success, 10%);
      }
    }

    &.btn-danger {
      background-color: $error;
      color: $white;

      &:hover {
        background-color: darken($error, 10%);
      }
    }
  }

  .form__actions {
    @include flex(column, flex-start, center);
    gap: 16px;

    button {
      width: 100%;
    }
  }
}
</style>
