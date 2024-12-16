<!-- src/components/devTechW7/AnalyticsEventCard.vue -->
<template>
  <div class="event-card w7-margin">
    <h3 class="event-title montserrat-bold">{{ analyticsEvent.eventName }}</h3>
    <div class="event-details">
      <p>
        <strong>Type:</strong>
        {{ analyticsEvent.eventType }}
      </p>
      <p class="quantity-badge">{{ analyticsEvent.quantity }}</p>
      <p>
        <strong>Last Updated:</strong>
        {{ formatDate(analyticsEvent.updatedAt) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { AnalyticsEvent } from "@/models/analytics-events.model";

export default defineComponent({
  name: "AnalyticsEventCard",
  props: {
    analyticsEvent: {
      type: Object as PropType<AnalyticsEvent>,
      required: true,
    },
  },
  methods: {
    formatDate(dateString: string): string {
      const date = new Date(dateString);
      return date.toLocaleString();
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.event-card {
  background-color: $yale-blue;
  color: $white;
  padding: 16px;
  border-radius: 8px;
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
  padding: 5px;
  border: 2px solid $primary;
  background-color: $primary;
  color: $white;
  font-size: 20px;
  font-weight: bold;
}
</style>
