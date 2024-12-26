<template>
  <div class="analytics-dashboard w7-padding">
    <h1 class="dashboard-title w7-title montserrat-bold">Analytics</h1>
    <div
      v-if="events.length === 0"
      class="no-events-message w7-center w7-subtitle">
      <p style="color: #ffffff">No events found.</p>
    </div>

    <div v-else class="application-container w7-margin">
      <div
        v-for="(events, appName) in groupedEvents"
        :key="appName"
        class="application-card">
        <h2 class="application-title montserrat-medium">{{ appName }}</h2>
        <div class="events-container">
          <AnalyticsEventCard
            v-for="event in events"
            :key="event.id"
            :analytics-event="event" />
        </div>
      </div>
    </div>

    <button
      v-if="events.length > 0"
      class="btn btn-danger w7-margin delete-btn"
      @click="showDeleteConfirmation">
      Delete All Events
    </button>

    <!-- Confirmation Dialog -->
    <ConfirmationDialog
      :visible="showDialog"
      title="Delete All Events"
      message="Are you sure you want to delete all events? This action cannot be undone."
      @confirm="deleteAllEvents"
      @cancel="showDialog = false" />

    <!-- Loading Dialog -->
    <LoadingDialog :visible="isLoading" :message="loadingMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import AnalyticsEventCard from "@/components/devTechW7/AnalyticsEventCard.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import LoadingDialog from "@/components/LoadingDialog.vue";
import { useAnalyticsEvents } from "@/composables/useAnalyticsEvents";

export default defineComponent({
  name: "AnalyticsDashboard",
  components: { AnalyticsEventCard, ConfirmationDialog, LoadingDialog },
  setup() {
    const { events, deleteAll } = useAnalyticsEvents();
    const showDialog = ref(false);
    const isLoading = ref(false);
    const loadingMessage = ref("");

    const groupedEvents = computed(() =>
      events.value.reduce((acc, event) => {
        if (!acc[event.application]) {
          acc[event.application] = [];
        }
        acc[event.application].push(event);
        return acc;
      }, {} as Record<string, typeof events.value>)
    );

    const showDeleteConfirmation = () => {
      showDialog.value = true;
    };

    const deleteAllEvents = async () => {
      showDialog.value = false;
      isLoading.value = true;
      loadingMessage.value = "Deleting all events...";
      try {
        await deleteAll();
        loadingMessage.value = "Events deleted successfully!";
      } catch (error) {
        console.error("Error deleting events:", error);
        loadingMessage.value = "Failed to delete events. Please try again.";
      } finally {
        setTimeout(() => {
          isLoading.value = false;
        }, 1000);
      }
    };

    return {
      groupedEvents,
      events,
      showDialog,
      isLoading,
      loadingMessage,
      showDeleteConfirmation,
      deleteAllEvents,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";
@import "@/styles/_variables.scss";

.analytics-dashboard {
  background-color: $black;
  color: $white;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
}

.dashboard-title {
  text-align: center;
  margin-bottom: 2rem;
}

.no-events-message {
  text-align: center;
  margin: 3rem 0;
  height: auto;
  width: 100%;
}

.application-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.application-card {
  @include Applicationcard;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.application-title {
  color: $white;
  font-size: 24px;
  margin-bottom: 1.5rem;
  text-align: center;
}

.events-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.delete-btn {
  background: $error;
  color: $black;
  align-self: center;
  padding: 12px 24px;
  font-size: 18px;
  margin-top: 2rem;

  &:hover {
    cursor: pointer;
    @include hover-effect;
  }
}
</style>
