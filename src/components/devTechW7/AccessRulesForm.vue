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
    </div>
    <button type="submit" class="form__button btn w7-padding">Save All</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { AccessRule } from "@/models/devtechw7.model";

export default defineComponent({
  name: "AccessRulesForm",
  props: {
    data: {
      type: Object as PropType<{ data: AccessRule[] }>,
      required: true,
    },
  },
  data() {
    return {
      formData: JSON.parse(JSON.stringify(this.data.data)), // Clona os dados
      rolesStrings: this.data.data.map((rule) => rule.allowedRoles.join(", ")),
    };
  },
  methods: {
    handleSave() {
      this.formData.forEach((rule: AccessRule, index: number) => {
        rule.allowedRoles = this.rolesStrings[index]
          .split(",")
          .map((r) => r.trim());
      });
      this.$emit("save", this.formData);
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

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
    background-color: $rich-black;
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
      background-color: $rich-black;
      color: $white;
    }
  }

  .form__button {
    background-color: $mikado-yellow;
    color: $rich-black;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background-color: $gold;
    }
  }
}
</style>
