import { AnalyticsEvent } from "@/models/analytics-events.model";
import { ref, onMounted } from "vue";
import {
  fetchAnalyticsEvents,
  deleteAllAnalyticsEvents,
} from "@/services/AnalyticsService";

export function useAnalyticsEvents() {
  const events = ref<AnalyticsEvent[]>([]);
  const isLoading = ref(false);

  const loadEvents = async () => {
    isLoading.value = true;
    try {
      const data = await fetchAnalyticsEvents();
      events.value = data;
    } catch (error) {
      console.error("Failed to fetch analytics events:", error);
      events.value = [];
      throw new Error("Failed to fetch analytics events");
    } finally {
      isLoading.value = false;
    }
  };

  const deleteAll = async () => {
    isLoading.value = true;
    try {
      await deleteAllAnalyticsEvents();
      events.value = [];
    } catch (error) {
      console.error("Failed to delete analytics events:", error);
      throw new Error("Failed to delete analytics events");
    } finally {
      isLoading.value = false;
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
