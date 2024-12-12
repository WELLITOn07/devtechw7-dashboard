<template>
  <div class="course-form">
    <h1>{{ data.name }}</h1>
    <h3 v-if="!data.data.length">Create a New Course</h3>
    <h3>Course: {{ data }}</h3>

    <!-- <form @submit.prevent="handleSave"></form> -->
  </div>
</template>

<script lang="ts">
import { Course } from "@/models/biomedsandra-api.model";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CourseForm",
  props: {
    data: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  data() {
    // return {
    //   formData: {
    //     ...this.data,
    //     subjects: this.data.subjects.map((subject) => ({
    //       ...subject,
    //       topicsString: subject.topics.join(", "),
    //     })),
    //     works: [...this.data.works],
    //   },
    // };
  },
  // methods: {
  //   handleSave() {
  //     // Format subjects before emitting
  //     this.formData.subjects = this.formData.subjects.map((subject) => ({
  //       ...subject,
  //       topics: subject.topicsString.split(",").map((topic) => topic.trim()),
  //     }));
  //     this.$emit("save", this.formData);
  //   },
  //   addSubject() {
  //     this.formData.subjects.push({
  //       id: null,
  //       category: "",
  //       topics: [],
  //       topicsString: "",
  //       courseId: this.formData.id,
  //     });
  //   },
  //   removeSubject(index: number) {
  //     this.formData.subjects.splice(index, 1);
  //   },
  //   addWork() {
  //     this.formData.works.push({
  //       id: null,
  //       title: "",
  //       url: "",
  //       courseId: this.formData.id,
  //     });
  //   },
  //   removeWork(index: number) {
  //     this.formData.works.splice(index, 1);
  //   },
  // },
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
