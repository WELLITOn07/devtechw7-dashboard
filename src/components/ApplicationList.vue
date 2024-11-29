<template>
  <div class="application-list">
    <h1 class="montserrat-bold w7-title w7-margin">Applications Dashboard</h1>
    <div v-if="loading" class="loading">Loading applications...</div>
    <div v-else-if="applications.length === 0" class="empty-message">
      No applications found.
    </div>
    <div v-else class="application-grid">
      <ApplicationCard
        v-for="application in applications"
        :key="application.id"
        :application="application"
        @click="navigateToManage(application.name)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useApplicationStore } from "@/store/application";
import { fetchApplications } from "@/services/applicationService";
import ApplicationCard from "./ApplicationCard.vue";
import { Application } from "@/models/application.model";

export default defineComponent({
  name: "ApplicationList",
  components: { ApplicationCard },
  setup() {
    const router = useRouter();
    const applicationStore = useApplicationStore();
    const applications = ref<Application[]>([]);
    const loading = ref(true);

    const loadApplications = async () => {
      try {
        loading.value = true;
        const fetchedApplications = await fetchApplications();
        applications.value = fetchedApplications; // Show data in view
        applicationStore.setApplications(fetchedApplications); // Save to store
      } catch (error) {
        console.error("Failed to load applications:", error);
      } finally {
        loading.value = false;
      }
    };

    const navigateToManage = (name: string) => {
      router.push(`/manage/${name}`);
    };

    onMounted(loadApplications);

    return {
      applications,
      loading,
      navigateToManage,
    };
  },
});
</script>

<style scoped lang="scss">
.application-list {
  padding: 16px;

  .loading,
  .empty-message {
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
