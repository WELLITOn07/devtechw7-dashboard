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
      :title="dialogMessage"
      :message="dialogMessage"
      :visible="showDialog"
      @close="showDialog = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import AlertDialog from "@/components/AlertDialog.vue";
import LoadingButton from "@/components/LoadingButton.vue";
import { setAuthToken } from "@/utils/get-auth-headers";

export default defineComponent({
  name: "LoginView",
  components: {
    AlertDialog,
    LoadingButton,
  },
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const showDialog = ref(false);
    const dialogMessage = ref("");

    const handleLogin = async () => {
      loading.value = true;
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_URL}/auth/login`,
          {
            email: email.value,
            password: password.value,
          }
        );
        if (response.data.token) {
          setAuthToken(response.data.token);
          router.push("/");
        }
      } catch (error: any) {
        dialogMessage.value =
          error.response?.data?.message || "Erro ao realizar login";
        showDialog.value = true;
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      password,
      loading,
      showDialog,
      dialogMessage,
      handleLogin,
    };
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
