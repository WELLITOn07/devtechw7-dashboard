<template>
  <div class="list">
    <div v-for="ad in advertisements" :key="ad.id" class="list-item">
      <h3>{{ ad.title }}</h3>
      <p>{{ ad.description }}</p>
      <button @click="$emit('edit', ad)">Edit</button>
      <button @click="$emit('delete', ad.id)">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Advertisement } from "@/models/advertisement.model";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "AdvertisementList",
  props: {
    advertisements: {
      type: Array as PropType<Advertisement[]>,
      required: true,
    },
  },
  emits: ["edit", "delete"],
});
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.list-item {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
}
</style>
