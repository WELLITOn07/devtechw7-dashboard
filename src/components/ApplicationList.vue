<template>
  <div class="application-list">
    <div v-if="loading" class="application-list__loading">
      Loading applications...
    </div>
    <div v-else-if="!applications" class="application-list__empty">
      <h3>No applications found.</h3>
      <ApplicationForm
        :data="{ data: [] }"
        @save="handleCreateNewApplication" />
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
import { fetchApplications } from "@/services/ApplicationService";
import ApplicationCard from "@/components/ApplicationCard.vue";
import ApplicationForm from "@/components/devTechW7/ApplicationForm.vue";
import { Application } from "@/models/application.model";

export default defineComponent({
  name: "ApplicationList",
  components: {
    ApplicationCard,
    ApplicationForm,
  },
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

    const handleCreateNewApplication = async (
      newApplications: Application[]
    ) => {
      try {
        for (const app of newApplications) {
          const response = await fetch(
            `${process.env.VUE_APP_API_URL}/applications`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
              body: JSON.stringify(app),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to create application.");
          }
        }
        await loadApplications();
      } catch (error) {
        console.error("Error creating new application:", error);
      }
    };

    onMounted(loadApplications);

    return {
      applications,
      loading,
      navigateToManage,
      handleCreateNewApplication,
    };
  },
});
</script>

<style scoped lang="scss">
.application-list {
  &__loading {
    font-size: 1.2rem;
    text-align: center;
    margin: 16px 0;
  }

  &__empty {
    text-align: center;
    margin: 16px;

    h3 {
      font-size: 1.5rem;
      margin-bottom: 16px;
    }
  }

  &__grid {
    display: grid;
    gap: 16px;
  }
}
</style>
