<template>
  <div class="biomedsandra-view">
    <CourseForm :formData="data.data" @save="handleSave" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Course } from "@/models/biomedsandra-api.model";
import CourseForm from "@/components/biomdesandra-api/CourseForm.vue";

export default defineComponent({
  name: "BiomedSandraView",
  components: { CourseForm },
  props: {
    data: {
      type: Object as PropType<{ name: string; data: Course[] }>,
      required: true,
    },
  },
  methods: {
    handleSave(updatedData: Course) {
      this.$emit("save", updatedData);
    },
  },
});
</script>

<style scoped>
.biomedsandra-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
