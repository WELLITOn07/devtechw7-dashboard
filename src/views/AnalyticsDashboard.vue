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
          <AnalyticsEventCard
            v-for="event in events"
            :key="event.id"
            :analytics-event="event" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import AnalyticsEventCard from "@/components/devTechW7/AnalyticsEventCard.vue";
import { useAnalyticsEvents } from "@/composables/useAnalyticsEvents";

export default defineComponent({
  name: "AnalyticsDashboard",
  components: { AnalyticsEventCard },
  setup() {
    const { events, isLoading } = useAnalyticsEvents();

    const groupedEvents = computed(() =>
      events.value.reduce((acc, event) => {
        if (!acc[event.application]) {
          acc[event.application] = [];
        }
        acc[event.application].push(event);
        return acc;
      }, {} as Record<string, typeof events.value>)
    );

    return { groupedEvents, isLoading };
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
</style>
