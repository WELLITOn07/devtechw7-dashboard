<template>
  <form @submit.prevent="handleSaveAll" class="users-form w7-padding">
    <h3 class="form__title w7-subtitle montserrat-medium">Users Form</h3>
    <div v-for="(user, index) in formData" :key="index" class="form__section">
      <div class="form__group">
        <label :for="'user-email-' + index" class="form__label__index">
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
          placeholder="Enter Email"
          :disabled="!!user.id" />
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
          class="form__input" />
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
      <div class="form__actions w7-row-space-between">
        <button
          type="button"
          class="form__button btn btn-danger"
          @click="removeUser(index, user.id)">
          Remove User
        </button>
        <button
          type="button"
          class="form__button btn btn-primary"
          @click="handleUpdateUser(user, index)"
          :disabled="!user.id">
          Update User
        </button>
      </div>
    </div>
    <div class="form__actions w7-column-space-between">
      <button
        type="button"
        class="form__button btn btn-primary"
        @click="addUser">
        Add User
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
import AlertDialog from "@/components/AlertDialog.vue";
import { User } from "@/models/user.model";
import { saveUsers, updateUser, deleteUser } from "@/services/UsersService";

export default defineComponent({
  name: "UsersForm",
  components: { AlertDialog },
  props: {
    data: {
      type: Object as PropType<{ data: User[] }>,
      required: true,
    },
  },
  data() {
    return {
      formData: JSON.parse(JSON.stringify(this.data.data)),
      rolesStrings: this.data.data.map((user) => (user.rule || []).join(", ")),
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
    async handleSaveAll() {
      const newUsers: User[] = [];
      this.formData.forEach((user: User, index: number) => {
        user.rule = this.rolesStrings[index]
          .split(",")
          .map((role) => role.trim());

        if (!user.id) {
          newUsers.push(user);
        }
      });

      try {
        if (newUsers.length > 0) {
          await saveUsers(newUsers);
          this.dialogMessage = `${newUsers.length} user(s) created successfully!`;
        }
      } catch (error) {
        console.error("Failed to save users:", error);
        this.dialogMessage = "Failed to save some users. Please try again.";
      }

      this.showDialog = true;
    },
    async handleUpdateUser(user: User, index: number) {
      try {
        user.rule = this.rolesStrings[index]
          .split(",")
          .map((role) => role.trim());

        const payload: Partial<User> & { id: number } = {
          ...user,
          id: user.id,
        };
        await updateUser(payload);

        this.dialogMessage = `User ${user.email} updated successfully!`;
      } catch (error) {
        console.error("Failed to update user:", error);
        this.dialogMessage = "Failed to update user. Please try again.";
      }

      this.showDialog = true;
    },
    addUser() {
      this.formData.push({
        email: "",
        name: "",
        password: "",
        birthAt: "",
        rule: [],
      });
      this.rolesStrings.push("");
    },
    async removeUser(index: number, id: number | undefined) {
      if (!id) {
        this.formData.splice(index, 1);
        this.rolesStrings.splice(index, 1);
        return;
      }

      try {
        await deleteUser(id);
        this.formData.splice(index, 1);
        this.rolesStrings.splice(index, 1);

        this.dialogMessage = "User deleted successfully!";
      } catch (error) {
        console.error("Failed to delete user:", error);
        this.dialogMessage = "Failed to delete user.";
      }

      this.showDialog = true;
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
@import "@/styles/_mixins.scss";

.users-form {
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
    @include flex(row, flex-start, center);
    gap: 16px;

    button {
      width: auto;
    }
  }
}
</style>
