<template>
  <form @submit.prevent="handleSaveAll" class="course-form w7-padding">
    <h3 class="form__title w7-subtitle montserrat-medium">Course Form</h3>
    <div v-if="formData.length === 0" class="form__section">
      <h3 class="form__label__index">No Courses Found</h3>
      <button class="form__button btn btn-primary" @click="addCourse">
        Add New Course
      </button>
    </div>
    <div v-else>
      <div
        v-for="(course, courseIndex) in formData"
        :key="courseIndex"
        class="form__section">
        <h3 class="form__label__index">Course {{ courseIndex + 1 }}</h3>

        <!-- Course Details -->
        <div class="form__group">
          <label :for="'id-' + courseIndex" class="form__label">ID</label>
          <input
            v-model="course.id"
            :id="'id-' + courseIndex"
            type="text"
            class="form__input"
            placeholder="Enter ID"
            required />
        </div>
        <div class="form__group">
          <label :for="'title-' + courseIndex" class="form__label">Title</label>
          <input
            v-model="course.title"
            :id="'title-' + courseIndex"
            type="text"
            class="form__input"
            placeholder="Enter title" />
        </div>
        <div class="form__group">
          <label :for="'type-' + courseIndex" class="form__label">Type</label>
          <input
            v-model="course.type"
            :id="'type-' + courseIndex"
            type="text"
            class="form__input"
            placeholder="Enter type" />
        </div>
        <div class="form__group">
          <label :for="'description-' + courseIndex" class="form__label">
            Description
          </label>
          <textarea
            v-model="course.description"
            :id="'description-' + courseIndex"
            type="text"
            class="form__input form__textarea"
            placeholder="Enter description"></textarea>
        </div>
        <div class="form__group">
          <label :for="'cover-' + courseIndex" class="form__label">Cover</label>
          <input
            v-model="course.id"
            :id="'cover-' + courseIndex"
            type="string"
            class="form__input"
            disabled />
        </div>
        <div class="form__group">
          <label :for="'link-' + courseIndex" class="form__label">
            Course Link
          </label>
          <input
            v-model="course.link"
            :id="'link-' + courseIndex"
            type="string"
            class="form__input"
            placeholder="Enter course link" />
        </div>

        <!-- Price -->
        <div class="form__group">
          <label :for="'price-original-' + courseIndex" class="form__label">
            Price (Original)
          </label>
          <input
            v-model="course.price.original"
            :id="'price-original-' + courseIndex"
            type="text"
            class="form__input"
            placeholder="Enter original price" />
        </div>
        <div class="form__group">
          <label :for="'price-discounted-' + courseIndex" class="form__label">
            Price (Discounted)
          </label>
          <input
            v-model="course.price.discounted"
            :id="'price-discounted-' + courseIndex"
            type="text"
            class="form__input"
            placeholder="Enter discounted price" />
        </div>

        <!-- Subjects -->
        <div class="form__group">
          <h4 class="form__label__index">Subjects</h4>
          <div
            v-for="(subject, subjectIndex) in course.subjects"
            :key="subjectIndex"
            class="form__group">
            <label class="form__label">Category</label>
            <input
              v-model="subject.category"
              type="text"
              class="form__input"
              placeholder="Enter category" />

            <label class="form__label">Topics</label>
            <textarea
              v-model="subject.topicsString"
              type="text"
              class="form__input form__textarea"
              placeholder="Enter topics, separated by commas"
              @input="updateTopicsArray(subject)"></textarea>

            <button
              type="button"
              class="form__button btn btn-danger"
              @click="removeSubject(courseIndex, subjectIndex)">
              Remove Subject
            </button>
          </div>
          <button
            type="button"
            class="form__button btn btn-secondary"
            @click="addSubject(courseIndex)">
            Add Subject
          </button>
        </div>

        <!-- Works -->
        <div class="form__group">
          <h4 class="form__label__index">Works</h4>
          <div
            v-for="(work, workIndex) in course.works"
            :key="workIndex"
            class="form__group">
            <label class="form__label">Title</label>
            <input
              v-model="work.title"
              type="text"
              class="form__input"
              placeholder="Enter work title" />

            <label class="form__label">URL</label>
            <input
              v-model="work.url"
              type="string"
              class="form__input"
              placeholder="Enter work URL" />

            <button
              type="button"
              class="form__button btn btn-danger"
              @click="removeWork(courseIndex, workIndex)">
              Remove Work
            </button>
          </div>
          <button
            type="button"
            class="form__button btn btn-secondary"
            @click="addWork(courseIndex)">
            Add Work
          </button>
        </div>
        <div class="form__actions w7-column-space-between">
          <button
            type="button"
            class="form__button btn btn-danger"
            @click="removeCourse(course.id, courseIndex)">
            Delete Course
          </button>
        </div>
      </div>

      <div class="form__actions w7-column-space-between">
        <button
          type="button"
          class="form__button btn btn-primary"
          @click="addCourse">
          Add Course
        </button>
        <button type="submit" class="form__button btn btn-success">
          Save All
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Course, Subject } from "@/models/biomedsandra-api.model";
import {
  fetchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "@/services/CourseService";

export default defineComponent({
  name: "CourseForm",
  data() {
    return {
      formData: [] as Course[],
      existingCourseIds: new Set<string>(),
    };
  },
  async mounted() {
    await this.loadCourses();
  },
  methods: {
    async loadCourses() {
      const courses = await fetchCourses();
      this.formData = courses.map((course) => ({
        ...course,
        subjects: course.subjects.map((subject) => ({
          ...subject,
          topicsString: subject.topics.join(", "),
        })),
      }));
      this.existingCourseIds = new Set(courses.map((course) => course.id));
    },
    async handleSaveAll() {
      for (const course of this.formData) {
        course.price = {
          original: String(course.price.original),
          discounted: String(course.price.discounted),
        };
        course.subjects = course.subjects.map((subject) => ({
          ...subject,
          topics: subject.topicsString
            ? subject.topicsString.split(",").map((t) => t.trim())
            : [],
        }));
        if (this.existingCourseIds.has(course.id)) {
          await updateCourse(course.id, course);
        } else {
          const createdCourse = await createCourse(course);
          this.existingCourseIds.add(createdCourse.id);
        }
      }
      await this.loadCourses();
    },
    addCourse() {
      this.formData.push({
        id: "",
        title: "",
        description: "",
        cover: "",
        link: "",
        type: "",
        price: { original: "", discounted: "" },
        subjects: [],
        works: [],
      });
    },
    addSubject(courseIndex: number) {
      this.formData[courseIndex].subjects.push({
        category: "",
        topics: [],
        topicsString: "",
      });
    },
    removeSubject(courseIndex: number, subjectIndex: number) {
      this.formData[courseIndex].subjects.splice(subjectIndex, 1);
    },
    updateTopicsArray(subject: Subject) {
      subject.topics = subject.topicsString
        ? subject.topicsString.split(",").map((t) => t.trim())
        : [];
    },
    addWork(courseIndex: number) {
      this.formData[courseIndex].works.push({
        title: "",
        url: "",
      });
    },
    removeWork(courseIndex: number, workIndex: number) {
      this.formData[courseIndex].works.splice(workIndex, 1);
    },
    async removeCourse(courseId: string, courseIndex: number) {
      if (this.existingCourseIds.has(courseId)) {
        try {
          await deleteCourse(courseId);
          this.existingCourseIds.delete(courseId);
        } catch (error) {
          console.error(`Failed to delete course with ID ${courseId}:`, error);
          return;
        }
      }
      this.formData.splice(courseIndex, 1);
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
@import "@/styles/_mixins.scss";

.course-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: $oxford-blue;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  .form__title {
    color: $white;
    margin-bottom: 12px;
  }

  .form__section {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    border: 1px solid $yale-blue;
    border-radius: 8px;
    background-color: $black;
  }

  .form__group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .form__label {
      font-size: 14px;
      font-weight: bold;
      color: $white;

      &__index {
        color: $mikado-yellow;
      }
    }

    .form__input {
      padding: 10px;
      border-radius: 4px;
      border: 1px solid $yale-blue;
      background-color: $black;
      color: $white;

      &.form__textarea {
        height: 80px;
        resize: none;
      }
    }
  }

  .form__button {
    padding: 12px 24px;
    border-radius: 4px;
    font-size: 16px;

    &.btn-primary {
      background-color: $primary;

      &:hover {
        background-color: darken($primary, 10%);
      }
    }

    &.btn-secondary {
      background-color: $secondary;

      &:hover {
        background-color: darken($secondary, 10%);
      }
    }

    &.btn-danger {
      background-color: $error;

      &:hover {
        background-color: darken($error, 10%);
      }
    }

    &.btn-success {
      background-color: $success;

      &:hover {
        background-color: darken($success, 10%);
      }
    }
  }
}
</style>
