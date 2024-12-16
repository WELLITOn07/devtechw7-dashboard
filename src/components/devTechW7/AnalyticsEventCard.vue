<template>
  <div class="event-card">
    <h3 class="event-card__title montserrat-medium">{{ event.eventName }}</h3>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "AnalyticsEventCard",
  props: {
    event: {
      type: Object as PropType<{
        id: number;
        application: string;
        eventType: string;
        eventName: string;
        quantity: number;
        updatedAt: string;
      }>,
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
