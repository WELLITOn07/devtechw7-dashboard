<template>
  <form @submit.prevent="handleSaveAll" class="application-form w7-padding">
    <h3 class="form__title w7-subtitle montserrat-medium">Users Form</h3>
    <div v-for="(user, index) in formData" :key="index" class="form__section">
      <div class="form__group">
        <label :for="'user-name-' + index" class="form__label__index">
          User {{ index + 1 }}
        </label>
      </div>
      <div class="form__group">
        <label :for="'user-email-' + index" class="form__label">Email</label>
        <input
          type="email"
          :id="'user-email-' + index"
          v-model="user.email"
          class="form__input"
          placeholder="Enter Email" />
      </div>
      <div class="form__group">
        <label :for="'user-name-' + index" class="form__label">Name</label>
        <input
          type="text"
          :id="'user-name-' + index"
          v-model="user.name"
          class="form__input"
          placeholder="Enter Name" />
      </div>
      <div class="form__group">
        <label :for="'user-password-' + index" class="form__label">
          Password
        </label>
        <input
          type="password"
          :id="'user-password-' + index"
          v-model="user.password"
          class="form__input"
          placeholder="Enter Password" />
      </div>
      <div class="form__group">
        <label :for="'user-birthAt-' + index" class="form__label">
          Birth Date
        </label>
        <input
          type="date"
          :id="'user-birthAt-' + index"
          v-model="user.birthAt"
          class="form__input"
          placeholder="Enter Birth Date" />
      </div>
      <div class="form__group">
        <label :for="'user-rule-' + index" class="form__label">Roles</label>
        <input
          type="text"
          :id="'user-rule-' + index"
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
import { User } from "@/models/devtechw7.model";

export default defineComponent({
  name: "UsersForm",
  props: {
    data: {
      type: Object as PropType<{ data: User[] }>,
      required: true,
    },
  },
  data() {
    return {
      formData: JSON.parse(JSON.stringify(this.data.data)), // Clona os dados dos usuários
      rolesStrings: this.data.data.map((user) => (user.rule || []).join(", ")),
    };
  },
  methods: {
    handleSaveAll() {
      // Atualiza os roles no formato correto antes de salvar
      this.formData.forEach((user: User, index: number) => {
        user.rule = this.rolesStrings[index].split(",").map((r) => r.trim());
      });
      this.$emit("save", this.formData); // Emite todos os usuários atualizados
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
