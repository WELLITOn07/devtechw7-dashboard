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
          <label
            :for="'id-' + courseIndex"
            class="form__label"
            :class="{
              'form__label--text-danger': existingCourseIds.has(course.id),
            }">
            {{
              existingCourseIds.has(course.id)
                ? "ID - Not allowed to edit"
                : "ID"
            }}
          </label>
          <input
            v-model="course.id"
            :id="'id-' + courseIndex"
            type="text"
            class="form__input"
            placeholder="Enter ID"
            required
            @input="course.id = course.id.toLowerCase()"
            :disabled="existingCourseIds.has(course.id)" />
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
            @input="
              course.price.original = formatCurrency(course.price.original)
            "
            class="form__input"
            placeholder="R$ 0,00" />
        </div>
        <div class="form__group">
          <label :for="'price-discounted-' + courseIndex" class="form__label">
            Price (Discounted)
          </label>
          <input
            v-model="course.price.discounted"
            :id="'price-discounted-' + courseIndex"
            type="text"
            @input="
              course.price.discounted = formatCurrency(course.price.discounted)
            "
            class="form__input"
            placeholder="R$ 0,00" />
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

  <LoadingDialog v-if="loading" :visible="loading" :message="loadingMessage" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Course, Subject } from "@/models/biomedsandra-api.model";
import LoadingDialog from "@/components/LoadingDialog.vue";
import * as CourseService from "@/services/CourseService";

export default defineComponent({
  name: "CourseForm",
  components: {
    LoadingDialog,
  },
  props: {
    formData: {
      type: Array as () => Course[],
      required: true,
    },
  },
  emits: ["update:formData", "save"],
  data() {
    return {
      existingCourseIds: new Set<string>() as Set<string>,
      loading: false as boolean,
      loadingMessage: "" as string,
    };
  },
  async mounted() {
    this.toggleLoading(true, "Loading courses...");
    await this.loadCourses();
    this.toggleLoading(false);
  },
  methods: {
    formatCurrency(value: string) {
      const cleanValue = value.replace(/[^\d]/g, "");
      const parts = cleanValue.split("");
      const result = [];
      for (let i = parts.length - 1, count = 0; i >= 0; i--, count++) {
        if (count > 0 && count % 3 === 0) {
          result.unshift(".");
        }
        result.unshift(parts[i]);
      }
      return result.join("");
    },
    toggleLoading(state: boolean, message = "Loading...") {
      this.loading = state;
      this.loadingMessage = message;
    },
    async loadCourses() {
      try {
        const courses = await CourseService.fetchCourses();
        const formattedCourses = (courses || []).map((course) => ({
          ...course,
          subjects: (course.subjects || []).map((subject) => ({
            ...subject,
            topicsString: subject.topics ? subject.topics.join(", ") : "",
          })),
        }));
        this.$emit("update:formData", formattedCourses);
        formattedCourses.forEach((course) => {
          this.existingCourseIds.add(course.id);
        });
      } catch (error) {
        console.error("Error loading courses:", error);
        this.$emit("update:formData", []);
      }
    },
    async handleSaveAll() {
      if (!this.formData.length) return;

      this.toggleLoading(true, "Saving courses...");
      try {
        for (const course of this.formData) {
          const formattedCourse = {
            ...course,
            subjects: course.subjects.map((subject) => ({
              ...subject,
              topics: subject.topicsString
                ? subject.topicsString.split(",").map((t) => t.trim())
                : [],
            })),
          };

          if (this.existingCourseIds.has(course.id)) {
            await CourseService.updateCourse(course.id, formattedCourse);
          } else {
            await CourseService.createCourse(formattedCourse);
            this.existingCourseIds.add(course.id);
          }
        }
        this.$emit("update:formData", this.formData);
        this.$emit("save");
      } catch (error) {
        console.error("Error saving courses:", error);
      }
      this.toggleLoading(false);
    },
    addCourse() {
      const newCourse: Course = {
        id: "",
        title: "",
        description: "",
        cover: "",
        link: "",
        type: "",
        price: { original: "", discounted: "" },
        subjects: [],
        works: [],
      };
      this.$emit("update:formData", [...this.formData, newCourse]);
    },
    addSubject(courseIndex: number) {
      const updatedFormData = [...this.formData];
      updatedFormData[courseIndex].subjects.push({
        category: "",
        topics: [],
        topicsString: "",
      });
      this.$emit("update:formData", updatedFormData);
    },
    removeSubject(courseIndex: number, subjectIndex: number) {
      const updatedFormData = [...this.formData];
      updatedFormData[courseIndex].subjects.splice(subjectIndex, 1);
      this.$emit("update:formData", updatedFormData);
    },
    updateTopicsArray(subject: Subject) {
      if (subject.topicsString) {
        subject.topics = subject.topicsString.split(",").map((t) => t.trim());
      } else {
        subject.topics = [];
      }
    },
    addWork(courseIndex: number) {
      const updatedFormData = [...this.formData];
      updatedFormData[courseIndex].works.push({
        title: "",
        url: "",
      });
      this.$emit("update:formData", updatedFormData);
    },
    removeWork(courseIndex: number, workIndex: number) {
      const updatedFormData = [...this.formData];
      updatedFormData[courseIndex].works.splice(workIndex, 1);
      this.$emit("update:formData", updatedFormData);
    },
    async removeCourse(courseId: string, courseIndex: number) {
      this.toggleLoading(true, "Deleting course...");
      try {
        if (this.existingCourseIds.has(courseId)) {
          await CourseService.deleteCourse(courseId);
          this.existingCourseIds.delete(courseId);
        }
        const updatedFormData = [...this.formData];
        updatedFormData.splice(courseIndex, 1);
        this.$emit("update:formData", updatedFormData);
      } catch (error) {
        console.error("Error deleting course:", error);
      }
      this.toggleLoading(false);
    },
  },
});
</script>

<style scoped lang="scss">
.course-form {
  background-color: var(--w7-background-color);
  color: var(--w7-text-color);
  padding: 16px;
}

.form {
  &__title {
    margin-bottom: 24px;
  }

  &__section {
    margin-bottom: 24px;
    padding: 16px;
    border: 1px solid var(--w7-border-color);
    border-radius: 8px;
  }

  &__group {
    margin-bottom: 16px;
  }

  &__label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;

    &--text-danger {
      color: var(--w7-error-color);
    }

    &__index {
      margin-bottom: 16px;
      font-weight: 500;
    }
  }

  &__input {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--w7-border-color);
    border-radius: 4px;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: var(--w7-primary-color);
    }

    &:disabled {
      background-color: var(--w7-disabled-color);
      cursor: not-allowed;
    }
  }

  &__textarea {
    min-height: 100px;
    resize: vertical;
  }

  &__button {
    margin-top: 8px;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
  }
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &.btn-primary {
    background-color: var(--w7-primary-color);
    color: var(--w7-white);

    &:hover {
      background-color: var(--w7-primary-dark-color);
    }
  }

  &.btn-secondary {
    background-color: var(--w7-secondary-color);

    &:hover {
      background-color: var(--w7-secondary-dark-color);
    }
  }

  &.btn-danger {
    background-color: var(--w7-error-color);
    color: var(--w7-white);

    &:hover {
      background-color: var(--w7-error-dark-color);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
