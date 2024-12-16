<template>
  <div class="event-card">
    <template v-if="Array.isArray(analyticsEvent)">
      <template v-for="(event, index) in analyticsEvent" :key="index">
        <h3 class="event-card__title montserrat-medium">
          {{ event.eventName }}
        </h3>
        <p>
          <strong>Application:</strong>
          {{ event.application }}
        </p>
        <p>
          <strong>Type:</strong>
          {{ event.eventType }}
        </p>
        <p>
          <strong>Quantity:</strong>
          {{ event.quantity }}
        </p>
        <p>
          <strong>Last Updated:</strong>
          {{ formatDate(event.updatedAt) }}
        </p>
      </template>
    </template>
    <template v-else>
      <h3 class="event-card__title montserrat-medium">
        {{ analyticsEvent.eventName }}
      </h3>
      <p>
        <strong>Application:</strong>
        {{ analyticsEvent.application }}
      </p>
      <p>
        <strong>Type:</strong>
        {{ analyticsEvent.eventType }}
      </p>
      <p>
        <strong>Quantity:</strong>
        {{ analyticsEvent.quantity }}
      </p>
      <p>
        <strong>Last Updated:</strong>
        {{ formatDate(analyticsEvent.updatedAt) }}
      </p>
    </template>
  </div>
</template>

<script lang="ts">
import { AnalyticsEvent } from "@/models/analytics-events.model";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "AnalyticsEventCard",
  props: {
    analyticsEvent: {
      type: [Object, Array] as PropType<AnalyticsEvent | AnalyticsEvent[]>,
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
@import "@/styles/_mixins.scss";

.event-card {
  @include Applicationcard;
}
</style>
