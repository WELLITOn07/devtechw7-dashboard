<template>
    <div v-if="data.data.length === 0" class="course-form__empty">
      <h3>Create a New Course</h3>
    </div>
</template>

<script lang="ts">
import { Course } from "@/models/biomedsandra-api.model";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CourseForm",
  props: {
    data: {
      type: Object as PropType<{ name: string; data: Course[] }>,
      required: true,
    },
  },
  data() {
    return {
      formData: JSON.parse(JSON.stringify(this.data.data)),
      subjectsStrings: this.data.data.map((course) =>
        course.subjects.join(", ")
      ),
      worksStrings: this.data.data.map((course) => course.works.join(", ")),
    };
  },
  methods: {
    handleSave() {
      this.$emit("save", this.formData);
    },
    addSubject() {
      this.formData.subjects.push({
        id: null,
        category: "",
        topics: [],
        topicsString: "",
        courseId: this.formData.id,
      });
    },
    removeSubject(index: number) {
      this.formData.subjects.splice(index, 1);
    },
    addWork() {
      this.formData.works.push({
        id: null,
        title: "",
        url: "",
        courseId: this.formData.id,
      });
    },
    removeWork(index: number) {
      this.formData.works.splice(index, 1);
    },
  },
});
</script>

<style scoped>
.course-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-section {
  margin-top: 16px;
}

.btn {
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: blue;
  color: white;
}

.btn-secondary {
  background-color: gray;
  color: white;
}

.btn-danger {
  background-color: red;
  color: white;
}
</style>
