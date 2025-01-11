<!-- src/views/CoursesView.vue -->
<template>
  <div class="courses-view">
    <div class="content w7-margin">
      <h1 class="w7-title montserrat-bold">Gerenciar Cursos</h1>
      <CourseForm />
      <TestimonyForm />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CourseForm from "@/components/biomdesandra-api/CourseForm.vue";
import TestimonyForm from "@/components/biomdesandra-api/TestimonyForm.vue";

export default defineComponent({
  name: "CoursesView",
  components: {
    CourseForm,
    TestimonyForm,
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.courses-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1.w7-title {
  text-align: center;
  margin-bottom: 2rem;
}

@media (min-width: 1440px) {
  .content {
    padding: 3rem 2rem;
  }
}

@media (max-width: 767px) {
  .content {
    padding: 1.5rem 1rem;
  }
}
</style>
