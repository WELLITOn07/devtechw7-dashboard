<template>
  <div class="preview">
    <h1>{{ ad.title }}</h1>
    <p>{{ ad.description }}</p>
    <a :href="ad.link" target="_blank">Visit Link</a>
    <img v-if="ad.image" :src="ad.image" alt="Ad Image" />
  </div>
</template>

<script lang="ts">
import { Advertisement } from "@/models/advertisement.model";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "AdvertisementPreview",
  props: {
    ad: {
      type: Object as PropType<Advertisement>,
      required: true,
    },
  },
});
</script>

<style scoped>
.preview {
  margin-top: 24px;
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
}

img {
  max-width: 100%;
  margin-top: 12px;
}
</style>
