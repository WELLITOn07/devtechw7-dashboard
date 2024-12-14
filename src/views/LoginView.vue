<template>
  <div class="login">
    <h1 class="login__title">DevTechW7 Dashboard</h1>
    <video autoplay muted loop class="login__video">
      <source src="../assets/logo-video.mp4" type="video/mp4" />
    </video>
    <form class="login__form" @submit.prevent="handleLogin">
      <div class="login__form-group">
        <label for="email" class="login__label">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="login__input"
          placeholder="Enter your email"
          required />
      </div>
      <div class="login__form-group">
        <label for="password" class="login__label">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="login__input"
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
import { setAuthToken, setUser } from "@/utils/get-auth-headers";

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

        setAuthToken(access_token);
        setUser(user);

        this.dialogTitle = "Success";
        this.dialogMessage = `Welcome, ${user.name}!`;
        this.showDialog = true;

        setTimeout(() => {
          this.$router.push("/");
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
  background-color: $black;
  color: $mikado-yellow;
  min-height: 100vh;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    margin-bottom: 24px;
    color: $gold;
    font-size: 2rem;
  }

  &__video {
    width: 100%;
    height: auto;
    max-height: 400px;
    @media (min-width: 768px) {
      max-height: 600px;
    }
    object-fit: cover;
  }

  &__form {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__form-group {
    width: 100%;
  }

  &__label {
    margin-bottom: 8px;
    color: $mikado-yellow;
  }

  &__input {
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

