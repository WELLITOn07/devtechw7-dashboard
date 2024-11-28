<template>
  <div class="application-list">
    <div v-if="loading" class="loading">Loading applications...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="application-grid">
      <ApplicationCard
        v-for="application in applications"
        :key="application.id"
        :application="application"
        @click="navigateToApplication(application.name)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import ApplicationCard from "./ApplicationCard.vue";

interface Application {
  id: number;
  name: string;
  urlOrigin: string;
  allowedRoles: string[];
}

export default defineComponent({
  name: "ApplicationList",
  components: { ApplicationCard },
  data() {
    return {
      applications: [] as Application[],
      loading: false,
      error: "",
    };
  },
  async created() {
    this.fetchApplications();
  },
  methods: {
    async fetchApplications() {
      this.loading = true;
      this.error = "";
      try {
        const response = await axios.get<{ data: Application[] }>(
          `${process.env.VUE_APP_API_URL}/applications`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        this.applications = response.data.data;
      } catch (error) {
        this.error = "Failed to load applications. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    navigateToApplication(name: string) {
      this.$router.push(`/application/${name}`);
    },
  },
});
</script>

<style scoped lang="scss">
.application-list {
  padding: 16px;

  .loading,
  .error {
    font-size: 1.2rem;
    text-align: center;
    margin: 16px 0;
  }

  .application-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
  }
}
</style>
