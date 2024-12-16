import { ref, onMounted } from "vue";
import {
  fetchAnalyticsEvents,
  deleteAllAnalyticsEvents,
} from "@/services/AnalyticsService";
import { AnalyticsEvent } from "@/models/analytics-events.model";

export function useAnalyticsEvents() {
  const events = ref<AnalyticsEvent[]>([]);
  const isLoading = ref(false);

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

  return {
    events,
    isLoading,
    loadEvents,
    deleteAll,
  };
}
