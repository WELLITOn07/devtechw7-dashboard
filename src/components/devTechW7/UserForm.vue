<template>
  <form @submit.prevent="handleSave" class="user-form w7-padding">
    <h3 class="form__title w7-subtitle montserrat-medium">User Form</h3>
    <div class="form__group">
      <label for="email" class="form__label">Email</label>
      <input
        type="email"
        id="email"
        v-model="formData.email"
        class="form__input"
        placeholder="Enter Email" />
    </div>
    <div class="form__group">
      <label for="name" class="form__label">Name</label>
      <input
        type="text"
        id="name"
        v-model="formData.name"
        class="form__input"
        placeholder="Enter Name" />
    </div>
    <div class="form__group">
      <label for="password" class="form__label">Password</label>
      <input
        type="password"
        id="password"
        v-model="formData.password"
        class="form__input"
        placeholder="Enter Password" />
    </div>
    <div class="form__group">
      <label for="birthAt" class="form__label">Birth Date</label>
      <input
        type="date"
        id="birthAt"
        v-model="formData.birthAt"
        class="form__input"
        placeholder="Enter Birth Date" />
    </div>
    <div class="form__group">
      <label for="rule" class="form__label">Roles</label>
      <input
        type="text"
        id="rule"
        v-model="rolesString"
        class="form__input"
        placeholder="Comma-separated Roles" />
    </div>
    <button type="submit" class="form__button btn w7-padding">Save</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { User } from "@/models/devtechw7.model";

export default defineComponent({
  name: "UserForm",
  props: {
    data: {
      type: Object as PropType<{ data: User[] }>,
      required: true,
    },
  },
  data() {
    return {
      formData: JSON.parse(JSON.stringify(this.data.data[0] || {})), // Carrega o primeiro usuário
      rolesString: (this.data.data[0]?.rule || []).join(", "),
    };
  },
  methods: {
    handleSave() {
      this.formData.rule = this.rolesString.split(",").map((r) => r.trim());
      this.$emit("save", this.formData);
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.user-form {
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

    .form__input {
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
