<!-- src/views/CoursesView.vue -->
<template>
  <div class="courses-view">
    <h1>Manage Courses</h1>
    <CourseForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CourseForm from "@/components/biomdesandra-api/CourseForm.vue";

export default defineComponent({
  name: "CoursesView",
  components: {
    CourseForm,
  },
});
</script>

<style scoped>
.courses-view {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  color: #2c3e50;
}
</style>
