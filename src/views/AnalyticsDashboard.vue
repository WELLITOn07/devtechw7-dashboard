<template>
  <div class="dashboard">
    <h1 class="w7-title montserrat-bold">Analytics Dashboard</h1>
    <div v-if="isLoading" class="w7-center">
      <p>Loading events...</p>
    </div>
    <div v-else-if="events.length === 0" class="w7-center">
      <p>No events found.</p>
    </div>
    <div v-else class="dashboard__list">
      <AnalyticsEventCard
        v-for="event in events"
        :key="event.id"
        :event="event" />
      <button
        class="dashboard__delete-btn btn btn-danger"
        @click="deleteAll"
        :disabled="isLoading">
        <span v-if="isLoading">Deleting...</span>
        <span v-else>Delete All Events</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import {
  fetchAnalyticsEvents,
  deleteAllAnalyticsEvents,
} from "@/services/AnalyticsService";
import AnalyticsEventCard from "@/components/devTechW7/AnalyticsEventCard.vue";

interface AnalyticsEvent {
  id: number;
  application: string;
  eventType: string;
  eventName: string;
  quantity: number;
  updatedAt: string;
}

export default defineComponent({
  name: "AnalyticsDashboard",
  components: { AnalyticsEventCard },
  setup() {
    const events = ref<AnalyticsEvent[]>([]);
    const isLoading = ref(true);

    const loadEvents = async () => {
      isLoading.value = true;
      try {
        events.value = await fetchAnalyticsEvents();
      } catch (error) {
        console.error("Error fetching analytics events:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const deleteAll = async () => {
      if (confirm("Are you sure you want to delete all events?")) {
        isLoading.value = true;
        try {
          await deleteAllAnalyticsEvents();
          events.value = [];
          alert("All events deleted successfully.");
        } catch (error) {
          console.error("Error deleting all events:", error);
        } finally {
          isLoading.value = false;
        }
      }
    };

    onMounted(() => {
      loadEvents();
    });

    return { events, isLoading, deleteAll };
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.dashboard {
  padding: 16px;
  background-color: $black;
  color: $mikado-yellow;
  min-height: 100vh;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__delete-btn {
    align-self: center;
    margin-top: 24px;
  }
}
</style>
