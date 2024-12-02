<template>
  <form @submit.prevent="handleSave" class="application-form w7-padding">
    <h3 class="form__title w7-subtitle montserrat-medium">Application Form</h3>
    <div class="form__group">
      <label for="name" class="form__label">Name</label>
      <input
        type="text"
        id="name"
        v-model="formData.name"
        class="form__input"
        placeholder="Enter Application Name" />
    </div>
    <div class="form__group">
      <label for="description" class="form__label">Description</label>
      <textarea
        id="description"
        v-model="formData.description"
        class="form__textarea"
        placeholder="Enter Description"></textarea>
    </div>
    <div class="form__group">
      <label for="controllers" class="form__label">Controllers</label>
      <input
        type="text"
        id="controllers"
        v-model="controllersString"
        class="form__input"
        placeholder="Comma-separated Controllers" />
    </div>
    <div class="form__group">
      <label for="allowedRoles" class="form__label">Allowed Roles</label>
      <input
        type="text"
        id="allowedRoles"
        v-model="rolesString"
        class="form__input"
        placeholder="Comma-separated Roles" />
    </div>
    <button type="submit" class="form__button btn w7-padding">Save</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Application } from "@/models/application.model";

export default defineComponent({
  name: "ApplicationForm",
  props: {
    data: {
      type: Object as PropType<Application>,
      required: true,
    },
  },
  data() {
    return {
      formData: { ...this.data },
      controllersString: (this.data.controllers || []).join(", "),
      rolesString: (this.data.allowedRoles || []).join(", "),
    };
  },
  methods: {
    handleSave() {
      // this.formData.controllers = this.controllersString
      //     .split(",")
      //     .map((c) => c.trim());
      // this.formData.allowedRoles = this.rolesString
      //     .split(",")
      //     .map((r) => r.trim());
      this.$emit("save", this.formData);
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.application-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: $oxford-blue;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  .form__title {
    color: $mikado-yellow;
    margin-bottom: 12px;
  }

  .form__group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .form__label {
      font-size: 14px;
      font-weight: bold;
      color: $white;
    }

    .form__input,
    .form__textarea {
      width: 100%;
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
