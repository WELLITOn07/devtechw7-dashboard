<template>
  <div class="edit-view">
    <h1 class="montserrat-bold w7-title w7-margin">Edit Application</h1>

    <div v-if="loading" class="loading">Loading application...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <form
        @submit.prevent="handleSave"
        class="edit-form w7-column-space-between">
        <div class="form-group w7-full-size">
          <label for="name" class="roboto-regular">Name</label>
          <input
            type="text"
            id="name"
            v-model="application.name"
            class="input roboto-regular"
            placeholder="Application Name"
            required />
        </div>

        <div class="form-group w7-full-size">
          <label for="urlOrigin" class="roboto-regular">URL Origin</label>
          <input
            type="text"
            id="urlOrigin"
            v-model="application.urlOrigin"
            class="input roboto-regular"
            placeholder="Application URL"
            required />
        </div>

        <button type="submit" class="btn roboto-medium">Save Changes</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

interface Application {
  id: number;
  name: string;
  urlOrigin: string;
  allowedRoles: string[];
}

export default defineComponent({
  name: "ApplicationEditView",
  data() {
    return {
      application: {
        id: 0,
        name: "",
        urlOrigin: "",
        allowedRoles: [],
      } as Application,
      loading: true,
      error: "",
    };
  },
  async created() {
    this.fetchApplication();
  },
  methods: {
    async fetchApplication() {
      const route = useRoute();
      const applicationName = route.params.name as string;

      try {
        const response = await axios.get<Application>(
          `${process.env.VUE_APP_API_URL}/applications?name=${applicationName}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        this.application = response.data;
      } catch (err) {
        this.error = "Failed to fetch application. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    async handleSave() {
      try {
        this.loading = true;
        await axios.put(
          `${process.env.VUE_APP_API_URL}/applications/${this.application.id}`,
          {
            name: this.application.name,
            urlOrigin: this.application.urlOrigin,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        alert("Application updated successfully!");
        const router = useRouter();
        router.push("/");
      } catch (err) {
        this.error = "Failed to save changes. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

.edit-view {
  padding: 16px;
  background-color: $rich-black;
  color: $mikado-yellow;
  min-height: 100vh;

  & h1 {
    margin-bottom: 24px;
    color: $gold;
    font-size: 2rem;
  }

  .loading,
  .error {
    font-size: 1.2rem;
    text-align: center;
    margin: 16px 0;
  }

  .edit-form {
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

  .btn {
    width: 100%;
    padding: 12px;
    background-color: $mikado-yellow;
    border: none;
    color: $rich-black;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: $gold;
    }
  }
}
</style>
