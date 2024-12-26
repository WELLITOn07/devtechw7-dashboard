<template>
  <form @submit.prevent="handleSaveAll" class="course-form w7-padding">
    <h3 class="form__title w7-subtitle montserrat-medium">Course Form</h3>

    <!-- Empty State -->
    <div v-if="formData.length === 0" class="form__section">
      <h3 class="form__label__index">No Courses Found</h3>
      <button class="form__button btn btn-primary" @click="addCourse">
        Add New Course
      </button>
    </div>

    <!-- Course Form Content -->
    <div v-else>
      <div
        v-for="(course, courseIndex) in formData"
        :key="courseIndex"
        class="form__section">
        <div class="form__header">
          <h3 class="form__label__index">Course {{ courseIndex + 1 }}</h3>
          <div class="form__header-actions">
            <button
              type="button"
              class="btn btn-secondary"
              @click="togglePreview(courseIndex)">
              {{ course.showPreview ? "Hide Preview" : "Show Preview" }}
            </button>
          </div>
        </div>

        <!-- Course Preview -->
        <div v-if="course.showPreview" class="course-preview">
          <pre>{{ JSON.stringify(course, null, 2) }}</pre>
        </div>

        <!-- Basic Information Section -->
        <div class="form__panel">
          <div
            class="form__panel-header"
            @click="togglePanel(courseIndex, 'basic')">
            <h4>Basic Information</h4>
            <span>{{ isPanelOpen(courseIndex, "basic") ? "▼" : "▶" }}</span>
          </div>
          <div
            v-show="isPanelOpen(courseIndex, 'basic')"
            class="form__panel-content">
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
                <span class="required">*</span>
              </label>
              <input
                v-model="course.id"
                :id="'id-' + courseIndex"
                type="text"
                class="form__input"
                placeholder="Enter ID"
                required
                @input="validateAndFormatId($event, course)"
                :disabled="existingCourseIds.has(course.id)" />
            </div>
            <div class="form__group">
              <label :for="'title-' + courseIndex" class="form__label">
                Title
                <span class="required">*</span>
              </label>
              <input
                v-model="course.title"
                :id="'title-' + courseIndex"
                type="text"
                class="form__input"
                placeholder="Enter title"
                required />
            </div>
            <div class="form__group">
              <label :for="'type-' + courseIndex" class="form__label">
                Type
                <span class="required">*</span>
              </label>
              <select
                v-model="course.type"
                :id="'type-' + courseIndex"
                class="form__input"
                required>
                <option value="">Select type</option>
                <option value="ebook">E-book</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div class="form__group">
              <label :for="'description-' + courseIndex" class="form__label">
                Description
                <span class="required">*</span>
              </label>
              <textarea
                v-model="course.description"
                :id="'description-' + courseIndex"
                class="form__input form__textarea"
                placeholder="Enter description"
                required></textarea>
            </div>
            <div class="form__group">
              <label :for="'cover-' + courseIndex" class="form__label">
                Cover
              </label>
              <input
                v-model="course.cover"
                :id="'cover-' + courseIndex"
                type="text"
                class="form__input"
                placeholder="Enter cover identifier" />
            </div>
            <div class="form__group">
              <label :for="'link-' + courseIndex" class="form__label">
                Course Link
                <span class="required">*</span>
              </label>
              <input
                v-model="course.link"
                :id="'link-' + courseIndex"
                type="url"
                class="form__input"
                placeholder="Enter course link"
                required />
            </div>
          </div>
        </div>

        <!-- Price Section -->
        <div class="form__panel">
          <div
            class="form__panel-header"
            @click="togglePanel(courseIndex, 'price')">
            <h4>Price Information</h4>
            <span>{{ isPanelOpen(courseIndex, "price") ? "▼" : "▶" }}</span>
          </div>
          <div
            v-show="isPanelOpen(courseIndex, 'price')"
            class="form__panel-content">
            <div class="form__group">
              <label :for="'price-original-' + courseIndex" class="form__label">
                Original Price
                <span class="required">*</span>
              </label>
              <input
                v-model="course.price.original"
                :id="'price-original-' + courseIndex"
                type="text"
                class="form__input"
                placeholder="R$ 0,00"
                required
                @input="formatCurrency($event, course.price, 'original')" />
            </div>
            <div class="form__group">
              <label
                :for="'price-discounted-' + courseIndex"
                class="form__label">
                Discounted Price
                <span class="required">*</span>
              </label>
              <input
                v-model="course.price.discounted"
                :id="'price-discounted-' + courseIndex"
                type="text"
                class="form__input"
                placeholder="R$ 0,00"
                required
                @input="formatCurrency($event, course.price, 'discounted')" />
            </div>
          </div>
        </div>

        <!-- Subjects Section -->
        <div class="form__panel">
          <div
            class="form__panel-header"
            @click="togglePanel(courseIndex, 'subjects')">
            <h4>Subjects</h4>
            <span>{{ isPanelOpen(courseIndex, "subjects") ? "▼" : "▶" }}</span>
          </div>
          <div
            v-show="isPanelOpen(courseIndex, 'subjects')"
            class="form__panel-content">
            <div
              v-for="(subject, subjectIndex) in course.subjects"
              :key="subjectIndex"
              class="subject-item">
              <div class="subject-header">
                <h5>Subject {{ subjectIndex + 1 }}</h5>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click="removeSubject(courseIndex, subjectIndex)">
                  <i class="fas fa-trash"></i>
                  Deletar
                </button>
              </div>
              <div class="form__group">
                <label
                  :for="'category-' + courseIndex + '-' + subjectIndex"
                  class="form__label">
                  Category
                  <span class="required">*</span>
                </label>
                <input
                  v-model="subject.category"
                  :id="'category-' + courseIndex + '-' + subjectIndex"
                  type="text"
                  class="form__input"
                  placeholder="Enter category"
                  required />
              </div>
              <div class="form__group">
                <label
                  :for="'topics-' + courseIndex + '-' + subjectIndex"
                  class="form__label">
                  Topics
                  <span class="required">*</span>
                </label>
                <div
                  v-for="(topic, topicIndex) in subject.topics"
                  :key="topicIndex"
                  class="topic-item">
                  <span>{{ topic }}</span>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="removeTopic(subject, topicIndex)">
                    <i class="fas fa-trash"></i>
                    Deletar
                  </button>
                </div>
                <input
                  v-model="newTopic"
                  type="text"
                  class="form__input"
                  placeholder="Enter new topic" />
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="addTopic(subject)">
                  <i class="fas fa-plus"></i>
                  Adicionar Tópico
                </button>
              </div>
            </div>
            <input
              v-model="newSubjectCategory"
              type="text"
              class="form__input"
              placeholder="Enter new subject category" />
            <button
              type="button"
              class="btn btn-secondary"
              @click="addSubject(courseIndex)">
              <i class="fas fa-plus"></i>
              Add Subject
            </button>
          </div>
        </div>

        <!-- Works Section -->
        <div class="form__panel">
          <div
            class="form__panel-header"
            @click="togglePanel(courseIndex, 'works')">
            <h4>Works</h4>
            <span>{{ isPanelOpen(courseIndex, "works") ? "▼" : "▶" }}</span>
          </div>
          <div
            v-show="isPanelOpen(courseIndex, 'works')"
            class="form__panel-content">
            <div
              v-for="(work, workIndex) in course.works"
              :key="workIndex"
              class="work-item">
              <div class="work-header">
                <h5>Work {{ workIndex + 1 }}</h5>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click="removeWork(courseIndex, workIndex)">
                  <i class="fas fa-trash"></i>
                  Deletar
                </button>
              </div>
              <div class="form__group">
                <label
                  :for="'work-title-' + courseIndex + '-' + workIndex"
                  class="form__label">
                  Title
                  <span class="required">*</span>
                </label>
                <input
                  v-model="work.title"
                  :id="'work-title-' + courseIndex + '-' + workIndex"
                  type="text"
                  class="form__input"
                  placeholder="Enter work title"
                  required />
              </div>
              <div class="form__group">
                <label
                  :for="'work-url-' + courseIndex + '-' + workIndex"
                  class="form__label">
                  URL
                  <span class="required">*</span>
                </label>
                <input
                  v-model="work.url"
                  :id="'work-url-' + courseIndex + '-' + workIndex"
                  type="url"
                  class="form__input"
                  placeholder="Enter work URL"
                  required />
              </div>
              <input
                v-model="newWorkTitle"
                type="text"
                class="form__input"
                placeholder="Enter new work title" />
              <input
                v-model="newWorkUrl"
                type="url"
                class="form__input"
                placeholder="Enter new work URL" />
              <button
                type="button"
                class="btn btn-secondary"
                @click="addWork(courseIndex)">
                <i class="fas fa-plus"></i>
                Adicionar Trabalho
              </button>
            </div>
            <button
              type="button"
              class="btn btn-secondary w-100 mt-3"
              @click="addWork(courseIndex)">
              <i class="fas fa-plus"></i>
              Add Work
            </button>
          </div>
        </div>

        <!-- Course Actions -->
        <div class="form__actions">
          <button
            type="button"
            class="form__button btn btn-danger"
            @click="removeCourse(course.id, courseIndex)">
            Delete Course
          </button>
          <button
            type="button"
            class="form__button btn btn-primary"
            @click="validateCourse(course)">
            Validate Course
          </button>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="form__global-actions">
        <button type="submit" class="btn btn-primary">Save All Changes</button>
        <button type="button" class="btn btn-secondary" @click="addCourse">
          Add New Course
        </button>
      </div>
    </div>
  </form>

  <LoadingDialog v-if="loading" :visible="loading" :message="loadingMessage" />
  <AlertDialog
    v-model:visible="showAlert"
    :title="alertTitle"
    :message="alertMessage"
    @close="showAlert = false" />
  <ConfirmationDialog
    v-model:visible="showSaveConfirmation"
    title="Save Changes"
    message="Are you sure you want to save all changes?"
    @confirm="saveConfirmed"
    @cancel="showSaveConfirmation = false" />
  <ConfirmationDialog
    v-model:visible="showDeleteConfirmation"
    title="Delete Course"
    message="Are you sure you want to delete this course?"
    @confirm="deleteConfirmed"
    @cancel="showDeleteConfirmation = false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Course, Subject, Work, Price } from "@/models/biomedsandra-api.model";
import LoadingDialog from "@/components/LoadingDialog.vue";
import AlertDialog from "@/components/AlertDialog.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import {
  fetchCourses,
  updateCourse,
  deleteCourse,
} from "@/services/CourseService";

interface PanelState {
  [key: string]: {
    [key: string]: boolean;
  };
}

export default defineComponent({
  name: "CourseForm",
  components: {
    LoadingDialog,
    AlertDialog,
    ConfirmationDialog,
  },
  data() {
    return {
      formData: [] as Course[],
      loading: false,
      loadingMessage: "",
      existingCourseIds: new Set<string>(),
      panelStates: {} as PanelState,
      newTopic: "",
      newSubjectCategory: "",
      newWorkTitle: "",
      newWorkUrl: "",
      showSaveConfirmation: false,
      showDeleteConfirmation: false,
      courseToDelete: null as { id: string; index: number } | null,
      showAlert: false,
      alertTitle: "",
      alertMessage: "",
    };
  },
  async mounted() {
    this.toggleLoading(true, "Loading courses...");
    await this.loadCourses();
    this.toggleLoading(false);
  },
  methods: {
    validateAndFormatId(event: Event, course: Course) {
      const input = event.target as HTMLInputElement;
      course.id = input.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    },

    formatCurrency(
      event: Event,
      price: Price,
      field: "original" | "discounted"
    ) {
      const input = event.target as HTMLInputElement;
      let value = input.value.replace(/\D/g, "");

      if (value) {
        value = (parseInt(value) / 100).toFixed(2);
        price[field] = `R$ ${value.replace(".", ",")}`;
      } else {
        price[field] = "";
      }
    },

    togglePanel(courseIndex: number, panel: string) {
      if (!this.panelStates[courseIndex]) {
        this.panelStates[courseIndex] = {};
      }
      this.panelStates[courseIndex][panel] =
        !this.panelStates[courseIndex][panel];
    },

    isPanelOpen(courseIndex: number, panel: string): boolean {
      return this.panelStates[courseIndex]?.[panel] ?? true;
    },

    togglePreview(courseIndex: number) {
      const course = this.formData[courseIndex];
      course.showPreview = !course.showPreview;
    },

    toggleLoading(state: boolean, message = "Loading...") {
      this.loading = state;
      this.loadingMessage = message;
    },

    async loadCourses() {
      try {
        this.toggleLoading(true, "Carregando cursos...");
        const courses = await fetchCourses();
        this.formData = courses;
        this.existingCourseIds = new Set(courses.map((c) => c.id));
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        this.toggleLoading(false);
      }
    },

    showAlertMessage(title: string, message: string) {
      this.alertTitle = title;
      this.alertMessage = message;
      this.showAlert = true;
    },

    validateCourse(course: Course): boolean {
      const requiredFields = ["id", "title", "description", "type", "link"];
      const missingFields = requiredFields.filter(
        (field) => !course[field as keyof Course]
      );

      if (missingFields.length > 0) {
        this.showAlertMessage(
          "Campos Obrigatórios",
          `Campos obrigatórios faltando: ${missingFields.join(", ")}`
        );
        return false;
      }

      if (!course.price.original || !course.price.discounted) {
        this.showAlertMessage(
          "Campos Obrigatórios",
          "Os preços original e com desconto são obrigatórios"
        );
        return false;
      }

      if (course.subjects.length === 0) {
        this.showAlertMessage(
          "Campos Obrigatórios",
          "Pelo menos um assunto é obrigatório"
        );
        return false;
      }

      for (const subject of course.subjects) {
        if (!subject.category || subject.topics.length === 0) {
          this.showAlertMessage(
            "Campos Obrigatórios",
            "Cada assunto deve ter uma categoria e pelo menos um tópico"
          );
          return false;
        }
      }

      for (const work of course.works) {
        if (!work.title || !work.url) {
          this.showAlertMessage(
            "Campos Obrigatórios",
            "Cada trabalho deve ter título e URL"
          );
          return false;
        }
      }

      return true;
    },

    async handleSaveAll() {
      this.showSaveConfirmation = true;
    },

    async saveConfirmed() {
      try {
        for (const course of this.formData) {
          if (!this.validateCourse(course)) {
            return;
          }
        }

        this.toggleLoading(true, "Salvando cursos...");
        const updatePromises = this.formData.map((course) =>
          updateCourse(course.id, course)
        );
        await Promise.all(updatePromises);
        this.toggleLoading(false);
        this.showSaveConfirmation = false;

        this.toggleLoading(true, "Atualizando lista de cursos...");
        await this.loadCourses();
      } catch (error) {
        console.error("Error saving courses:", error);
      } finally {
        this.toggleLoading(false);
        this.showSaveConfirmation = false;
      }
    },

    addCourse() {
      const newCourse: Course = {
        id: "",
        title: "",
        description: "",
        cover: "",
        link: "",
        type: "",
        price: {
          original: "",
          discounted: "",
        },
        subjects: [],
        works: [],
      };

      this.formData.push(newCourse);
      const courseIndex = this.formData.length - 1;

      // Open all panels for the new course
      this.panelStates[courseIndex] = {
        basic: true,
        price: true,
        subjects: true,
        works: true,
      };
    },

    addSubject(courseIndex: number) {
      const newSubject: Subject = {
        category: this.newSubjectCategory,
        topics: [],
        topicsText: "",
      };
      this.formData[courseIndex].subjects.push(newSubject);
      this.newSubjectCategory = "";
    },

    removeSubject(courseIndex: number, subjectIndex: number) {
      this.formData[courseIndex].subjects.splice(subjectIndex, 1);
    },

    updateTopicsArray(subject: Subject) {
      if (subject.topicsText) {
        subject.topics = subject.topicsText
          .split("\n")
          .map((topic) => topic.trim())
          .filter((topic) => topic !== "");
      } else {
        subject.topics = [];
      }
    },

    removeTopic(subject: Subject, topicIndex: number) {
      subject.topics.splice(topicIndex, 1);
      subject.topicsText = subject.topics.join("\n");
    },

    addTopic(subject: Subject) {
      if (!this.newTopic?.trim()) {
        this.showAlertMessage(
          "Tópico Inválido",
          "O tópico não pode estar vazio"
        );
        return;
      }

      subject.topics.push(this.newTopic.trim());
      this.newTopic = "";
    },

    addWork(courseIndex: number) {
      const newWork: Work = {
        title: this.newWorkTitle,
        url: this.newWorkUrl,
      };
      this.formData[courseIndex].works.push(newWork);
      this.newWorkTitle = "";
      this.newWorkUrl = "";
    },

    removeWork(courseIndex: number, workIndex: number) {
      this.formData[courseIndex].works.splice(workIndex, 1);
    },

    async removeCourse(courseId: string, courseIndex: number) {
      this.courseToDelete = { id: courseId, index: courseIndex };
      this.showDeleteConfirmation = true;
    },

    async deleteConfirmed() {
      if (!this.courseToDelete) return;

      try {
        if (this.existingCourseIds.has(this.courseToDelete.id)) {
          this.toggleLoading(true, "Excluindo curso...");
          await deleteCourse(this.courseToDelete.id);
          this.toggleLoading(false);

          this.toggleLoading(true, "Atualizando lista de cursos...");
          await this.loadCourses();
        } else {
          this.formData.splice(this.courseToDelete.index, 1);
        }
      } catch (error) {
        console.error("Error deleting course:", error);
      } finally {
        this.toggleLoading(false);
        this.showDeleteConfirmation = false;
        this.courseToDelete = null;
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
@import "@/styles/_mixins.scss";

.course-form {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  .form__title {
    color: $white;
    margin-bottom: 12px;
  }

  .form__section {
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    border: 1px solid $yale-blue;
    border-radius: 8px;
    background-color: $black;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .form__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .form__panel {
    border: 1px solid $yale-blue;
    border-radius: 4px;
    margin-bottom: 1rem;
    background-color: $black;

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: rgba($yale-blue, 0.1);
      cursor: pointer;

      h4 {
        margin: 0;
        color: $white;
      }

      span {
        color: $white;
      }
    }

    &-content {
      padding: 1rem;
    }
  }

  .form__group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 1.5rem;

    .form__label {
      font-size: 14px;
      font-weight: bold;
      color: $white;

      &__index {
        color: $mikado-yellow;
      }

      &--text-danger {
        color: $error;
      }

      small {
        font-weight: normal;
        color: $secondary;
        margin-left: 0.5rem;
      }
    }

    .required {
      color: $error;
      margin-left: 0.25rem;
    }

    .form__input {
      padding: 10px;
      border-radius: 4px;
      border: 1px solid $yale-blue;
      background-color: $black;
      color: $white;
      width: 100%;

      &:focus {
        outline: none;
        border-color: $primary;
      }

      &.form__textarea {
        min-height: 100px;
        resize: vertical;
      }
    }
  }

  .subject-item,
  .work-item {
    border: 1px solid $yale-blue;
    border-radius: 4px;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: rgba($yale-blue, 0.1);
  }

  .subject-header,
  .work-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h5 {
      margin: 0;
      color: $white;
    }
  }

  .topic-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;

    span {
      color: $white;
    }
  }

  .form__actions {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
  }

  .form__global-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;

    &-primary {
      background-color: $primary;
      color: $white;

      &:hover {
        background-color: darken($primary, 10%);
      }
    }

    &-secondary {
      background-color: $secondary;
      color: $white;

      &:hover {
        background-color: darken($secondary, 10%);
      }
    }

    &-danger {
      background-color: $error;
      color: $white;

      &:hover {
        background-color: darken($error, 10%);
      }
    }

    &-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }
  }

  .course-preview {
    background: rgba($yale-blue, 0.1);
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    overflow-x: auto;

    pre {
      margin: 0;
      white-space: pre-wrap;
      word-wrap: break-word;
      color: $white;
    }
  }

  @media (max-width: 767px) {
    padding: 8px;

    .form__section {
      padding: 12px;
      margin: 0 8px;
      width: calc(100% - 16px);
    }
  }
}
</style>
