<template>
  <div class="login w7-center">
    <h1 class="montserrat-bold w7-title w7-margin">DevTechW7 Dashboard</h1>
    <img
      src="../assets/logo.png"
      alt="DevTechW7 Logo"
      class="login-logo montserrat-bold w7-margin" />
    <form
      class="login-form w7-column-space-between"
      @submit.prevent="handleLogin">
      <div class="form-group w7-full-size">
        <label for="email" class="roboto-regular">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="input roboto-regular"
          placeholder="Enter your email"
          required />
      </div>
      <div class="form-group w7-full-size">
        <label for="password" class="roboto-regular">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="input roboto-regular"
          placeholder="Enter your password"
          required />
      </div>
      <LoadingButton
        :loading="loading"
        text="Login"
        loadingText="Carregando"
        @click="handleLogin" />
    </form>

    <AlertDialog
      v-if="showDialog"
      :title="dialogTitle"
      :message="dialogMessage"
      :visible="showDialog"
      @close="showDialog = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import AlertDialog from "../components/AlertDialog.vue";
import LoadingButton from "../components/LoadingButton.vue";
import { LoginResponse } from "@/models/login-responde.model";

export default defineComponent({
  name: "LoginView",
  components: { AlertDialog, LoadingButton },
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      showDialog: false,
      dialogTitle: "",
      dialogMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      if (this.loading) return;
      this.loading = true;

      try {
        const response = await axios.post<LoginResponse>(
          `${process.env.VUE_APP_API_URL}/auth/login`,
          {
            email: this.email,
            password: this.password,
          }
        );

        const { access_token, user } = response.data;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user", JSON.stringify(user));

        this.dialogTitle = "Success";
        this.dialogMessage = `Welcome, ${user.name}!`;
        this.showDialog = true;

        setTimeout(() => {
          this.$router.push("/dashboard");
        }, 2000);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          this.dialogTitle = "Login Error";
          this.dialogMessage =
            error.response?.data.message ||
            "Failed to login. Please try again.";
        } else {
          this.dialogTitle = "Unexpected Error";
          this.dialogMessage =
            "An unexpected error occurred. Please try again.";
        }
        this.showDialog = true;
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

.login {
  background-color: $rich-black;
  color: $mikado-yellow;
  min-height: 100vh;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & h1 {
    margin-bottom: 24px;
    color: $gold;
    font-size: 2rem;
  }

  .login-logo {
    max-width: 120px;
    margin-bottom: 24px;
  }

  .login-form {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-group {
    width: 100%;
  }

  .input {
    width: 100%;
    padding: 12px;
    margin-top: 8px;
    border: 1px solid $yale-blue;
    border-radius: 4px;
    background-color: $oxford-blue;
    color: $mikado-yellow;

    &:focus {
      border-color: $gold;
      outline: none;
    }
  }
}
</style>
