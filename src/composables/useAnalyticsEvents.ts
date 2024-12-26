import { AnalyticsEvent } from "@/models/analytics-events.model";
import { ref, onMounted } from "vue";

export function useAnalyticsEvents() {
  const events = ref<AnalyticsEvent[]>([]);
  const isLoading = ref(false);

  const loadEvents = async () => {
    isLoading.value = true;
    try {
      const response = await fetch(
        "https://devtechw7-api.vercel.app/api/analytics"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      events.value = data;
    } catch (error) {
      events.value = [];
      throw new Error("Failed to fetch analytics events");
    } finally {
      isLoading.value = false;
    }
  };

  const deleteAll = async () => {
    isLoading.value = true;
    try {
      const response = await fetch(
        "https://devtechw7-api.vercel.app/api/analytics",
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete events");
      }
      events.value = [];
    } catch (error) {
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
