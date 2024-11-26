<template>
  <div class="login w7-center">
    <h1 class="montserrat-bold">Login</h1>
    <form
      @submit.prevent="handleLogin"
      class="login-form w7-column-space-between"
    >
      <div class="form-group w7-full-size">
        <label for="email" class="roboto-regular">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="input roboto-regular"
          placeholder="Enter your email"
          required
        />
      </div>
      <div class="form-group w7-full-size">
        <label for="password" class="roboto-regular">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="input roboto-regular"
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit" class="btn roboto-medium">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_URL}/auth/login`,
          {
            email: this.email,
            password: this.password,
          }
        );
        alert("Login successful!");
        console.log("Token:", response.data.token);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("Unknown error", error);
        }
      }
    },
  },
});
</script>

<style scoped lang="scss">
@use "@/styles/variables.scss" as *;

.login {
  background-color: $rich-black;
  color: $mikado-yellow;
  height: 100vh;
}

.login h1 {
  margin-bottom: 24px;
  color: $gold;
}

.login-form {
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 16px;
}

.input {
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border: 1px solid $yale-blue;
  border-radius: 4px;
  background-color: $oxford-blue;
  color: $mikado-yellow;
}

.input:focus {
  border-color: $gold;
  outline: none;
}

.btn {
  width: 100%;
  padding: 12px;
  background-color: $mikado-yellow;
  border: none;
  color: $rich-black;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: $gold;
}
</style>
