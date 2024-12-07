<template>
  <div class="application-list">
    <div v-if="loading" class="application-list__loading">
      Loading applications...
    </div>
    <div
      v-else-if="applications.length === 0"
      class="application-list__empty-message">
      No applications found.
    </div>
    <div v-else class="application-list__grid">
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
        applications.value = fetchedApplications;
        applicationStore.setApplications(fetchedApplications);
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
  &__title {
    font-size: 2rem;
    margin-bottom: 24px;
  }

  &__loading,
  &__empty-message {
    font-size: 1.2rem;
    text-align: center;
    margin: 16px 0;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
  }
}
</style>
