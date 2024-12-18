<template>
  <div class="list w7-padding">
    <div
      v-for="ad in advertisements"
      :key="ad.id"
      class="list-item w7-padding montserrat-bold">
      <h3 class="ad-title">{{ ad.title }}</h3>
      <p class="ad-description roboto-regular">{{ ad.description }}</p>

      <div class="ad-actions w7-space-between">
        <button class="btn edit-btn roboto-medium" @click="$emit('edit', ad)">
          Edit
        </button>
        <button
          class="btn delete-btn roboto-medium"
          @click="$emit('delete', ad.id)">
          Delete
        </button>
      </div>
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

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: $black;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.list-item {
  background-color: $oxford-blue;
  color: $mikado-yellow;
  border: 1px solid $yale-blue;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .ad-title {
    font-size: 20px;
    color: $gold;
    margin-bottom: 8px;
  }

  .ad-description {
    font-size: 16px;
    margin-bottom: 12px;
    line-height: 1.5;
  }

  .ad-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btn {
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s ease;

      &.edit-btn {
        background-color: $mikado-yellow;
        color: $black;

        &:hover {
          background-color: $gold;
        }
      }

      &.delete-btn {
        background-color: $error;
        color: $white;

        &:hover {
          background-color: darken($error, 10%);
        }
      }
    }
  }
}
</style>
