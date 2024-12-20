<template>
  <form @submit.prevent="handleSave" class="access-rules-form w7-padding">
    <h3 class="form__title w7-subtitle montserrat-medium">Access Rules Form</h3>
    <div v-for="(rule, index) in formData" :key="index" class="form__section">
      <div class="form__group">
        <label :for="'urlOrigin-' + index" class="form__label__index">
          Access Rule {{ index + 1 }}
        </label>
      </div>
      <div class="form__group">
        <label :for="'urlOrigin-' + index" class="form__label">
          URL Origin
        </label>
        <input
          type="text"
          :id="'urlOrigin-' + index"
          v-model="rule.urlOrigin"
          class="form__input"
          placeholder="Enter URL Origin" />
      </div>
      <div class="form__group">
        <label :for="'allowedRoles-' + index" class="form__label">
          Allowed Roles
        </label>
        <input
          type="text"
          :id="'allowedRoles-' + index"
          v-model="rolesStrings[index]"
          class="form__input"
          placeholder="Comma-separated Roles" />
      </div>
      <button
        type="button"
        class="form__button btn btn-danger"
        @click="removeAccessRule(index, rule.id)">
        Remove Rule
      </button>
    </div>
    <div class="form__actions w7-column-space-between">
      <button
        type="button"
        class="form__button btn btn-primary"
        @click="addAccessRule">
        Add Rule
      </button>
      <button type="submit" class="form__button btn btn-success">
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
import { AccessRule } from "@/models/devtechw7.model";
import AlertDialog from "@/components/AlertDialog.vue";
import { deleteAccessRule } from "@/services/AccessRuleService";

export default defineComponent({
  name: "AccessRulesForm",
  components: { AlertDialog },
  props: {
    data: {
      type: Object as PropType<{ data: AccessRule[] }>,
      required: true,
    },
  },
  emits: {
    save: (data: AccessRule[]) => true,
  },
  data() {
    return {
      formData: JSON.parse(JSON.stringify(this.data.data)),
      rolesStrings: this.data.data.map((rule) => rule.allowedRoles.join(", ")),
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
      this.formData.forEach((rule: AccessRule, index: number) => {
        rule.allowedRoles = this.rolesStrings[index]
          .split(",")
          .map((r) => r.trim());
      });

      console.log("Data being emitted:", this.formData);
      this.$emit("save", this.formData);
    },
    addAccessRule() {
      this.formData.push({
        urlOrigin: "",
        allowedRoles: [],
      });
      this.rolesStrings.push("");
    },
    async removeAccessRule(index: number, id: number | undefined) {
      if (!id) {
        this.dialogTitle = "Error";
        this.dialogMessage = "Cannot delete unsaved rule.";
        this.showDialog = true;
        return;
      }

      try {
        await deleteAccessRule(id);

        this.formData.splice(index, 1);
        this.rolesStrings.splice(index, 1);
        this.dialogTitle = "Success";
        this.dialogMessage = "Access rule deleted successfully!";
        this.showDialog = true;
      } catch (error) {
        this.dialogTitle = "Error";
        this.dialogMessage =
          error instanceof Error
            ? error.message
            : "Failed to delete access rule.";
        this.showDialog = true;
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
@import "@/styles/_mixins.scss";

.access-rules-form {
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

