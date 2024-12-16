<template>
  <div class="analytics-dashboard w7-padding">
    <h1 class="dashboard-title w7-title montserrat-bold">Analytics</h1>
    <div class="application-container w7-margin">
      <div
        v-for="(events, appName) in groupedEvents"
        :key="appName"
        class="application-card">
        <h2 class="application-title montserrat-medium">{{ appName }}</h2>
        <div class="events-container">
          <div
            v-for="event in events"
            :key="event.id"
            class="event-card w7-margin">
            <h3 class="event-title montserrat-bold">{{ event.eventName }}</h3>
            <div class="event-details">
              <p>
                <strong>Type:</strong>
                {{ event.eventType }}
              </p>
              <p class="quantity-badge">
                {{ event.quantity }}
              </p>
              <p>
                <strong>Last Updated:</strong>
                {{ formatDate(event.updatedAt) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { fetchAnalyticsEvents } from "@/services/AnalyticsService";
import { AnalyticsEvent } from "@/models/analytics-events.model";

export default defineComponent({
  name: "AnalyticsDashboard",
  setup() {
    const analyticsEvents = ref<AnalyticsEvent[]>([]);

    const loadAnalytics = async () => {
      try {
        analyticsEvents.value = await fetchAnalyticsEvents();
      } catch (error) {
        console.error("Error loading analytics events:", error);
      }
    };

    const groupedEvents = computed(() =>
      analyticsEvents.value.reduce((acc, event) => {
        if (!acc[event.application]) {
          acc[event.application] = [];
        }
        acc[event.application].push(event);
        return acc;
      }, {} as Record<string, AnalyticsEvent[]>)
    );

    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      return date.toLocaleString();
    };

    loadAnalytics();

    return {
      analyticsEvents,
      groupedEvents,
      formatDate,
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
  min-height: 100vh;
}

.dashboard-title {
  text-align: center;
}

.application-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.application-card {
  @include Applicationcard;
  width: 100%;
  max-width: 600px;
}

.application-title {
  color: $white;
  font-size: 24px;
  margin-bottom: 16px;
}

.events-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.event-card {
  @include Applicationcard;
  background-color: $yale-blue;
  color: $white;
}

.event-title {
  color: $gold;
  font-size: 18px;
  margin-bottom: 8px;
}

.event-details {
  display: flex;
  align-items: center;
  gap: 16px;
}

.quantity-badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 2px solid $primary;
  background-color: $primary;
  color: $white;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
</style>
