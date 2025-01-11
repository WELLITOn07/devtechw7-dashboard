<template>
  <form @submit.prevent="handleSaveAll" class="testimony-form w7-padding">
    <h3 class="form__title w7-subtitle montserrat-medium">Testimony Form</h3>

    <div v-if="formData.length === 0" class="form__section">
      <h3 class="form__label__index">No Testimonies Found</h3>
      <button class="form__button btn btn-primary" @click="addTestimony">
        Add New Testimony
      </button>
    </div>

    <div v-else>
      <div
        v-for="(testimony, tIndex) in formData"
        :key="tIndex"
        class="form__section">
        <div class="form__header">
          <h3 class="form__label__index">Testimony #{{ tIndex + 1 }}</h3>
        </div>

        <div class="form__group">
          <label class="form__label">
            Subject
            <span class="required">*</span>
          </label>
          <input
            v-model="testimony.subject"
            type="text"
            class="form__input"
            placeholder="Ex: hemograma_curso"
            required />
        </div>

        <div class="form__group">
          <label class="form__label">
            Author
            <span class="required">*</span>
          </label>
          <input
            v-model="testimony.author"
            type="text"
            class="form__input"
            placeholder="Ex: Fulano de Tal"
            required />
        </div>

        <div class="form__group">
          <label class="form__label">
            Rating
            <span class="required">*</span>
          </label>
          <input
            v-model.number="testimony.rating"
            type="number"
            class="form__input"
            placeholder="Ex: 5"
            min="1"
            max="5"
            required />
        </div>

        <div class="form__group">
          <label class="form__label">
            Text
            <span class="required">*</span>
          </label>
          <textarea
            v-model="testimony.text"
            class="form__input form__textarea"
            placeholder="Escreva o depoimento..."
            required></textarea>
        </div>

        <div class="form__actions">
          <button
            type="button"
            class="form__button btn btn-danger"
            @click="removeTestimony(testimony, tIndex)">
            Delete Testimony
          </button>
        </div>
      </div>

      <div class="form__global-actions">
        <button type="submit" class="btn btn-primary">Save All Changes</button>
        <button type="button" class="btn btn-secondary" @click="addTestimony">
          Add New Testimony
        </button>
      </div>
    </div>
  </form>

  <ConfirmationDialog
    v-if="showConfirmationDialog"
    :visible="true"
    :message="'Are you sure you want to remove this testimony?'"
    @confirm="confirmRemove"
    @cancel="showConfirmationDialog = false" />
  <AlertDialog
    v-if="showAlertDialog"
    :visible="true"
    :title="alertTitle"
    :message="alertMessage"
    @close="closeAlertDialog" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Testimony } from "@/models/testimony.model";
import {
  fetchTestimonies,
  createTestimony,
  updateTestimony,
  deleteTestimony,
} from "@/services/TestimonyService";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import AlertDialog from "@/components/AlertDialog.vue";

export default defineComponent({
  name: "TestimonyForm",
  components: {
    ConfirmationDialog,
    AlertDialog,
  },
  data() {
    return {
      formData: [] as Testimony[],
      loading: false,
      showConfirmationDialog: false,
      showAlertDialog: false,
      alertMessage: "",
      alertTitle: "",
      testimonyToRemove: null as { testimony: Testimony; index: number } | null,
    };
  },
  async mounted() {
    await this.loadTestimonies();
  },
  methods: {
    async loadTestimonies() {
      this.loading = true;
      try {
        const testimonies = await fetchTestimonies();
        this.formData = testimonies;
      } catch (error) {
        console.error("Error loading testimonies:", error);
      } finally {
        this.loading = false;
      }
    },

    addTestimony() {
      const newTestimony: Testimony = {
        subject: "",
        author: "",
        rating: 5,
        text: "",
      };

      this.formData.push(newTestimony);
    },

    async handleSaveAll() {
      try {
        for (const testimony of this.formData) {
          if (!this.validateTestimony(testimony)) {
            return;
          }
        }

        const promises = this.formData.map((testimony) =>
          this.saveTestimony(testimony)
        );
        await Promise.all(promises);

        await this.loadTestimonies();
        this.showAlertDialog = true;
        this.alertMessage = "All testimonies saved successfully!";
        this.alertTitle = "Success";
      } catch (error) {
        console.error("Error saving testimonies:", error);
      }
    },

    async saveTestimony(testimony: Testimony) {
      if (testimony.id) {
        return await updateTestimony(testimony.id, testimony);
      } else {
        const created = await createTestimony(testimony);
        testimony.id = created.id;
      }
    },

    async removeTestimony(testimony: Testimony, index: number) {
      this.showConfirmationDialog = true;
      this.testimonyToRemove = { testimony, index } as {
        testimony: Testimony;
        index: number;
      } | null;
    },

    async confirmRemove() {
      const { testimony, index } = this.testimonyToRemove!;
      try {
        if (testimony.id) {
          await deleteTestimony(testimony.id);
        }
        this.formData.splice(index, 1);
        this.showAlertDialog = true;
        this.alertMessage = "Testimony deleted successfully!";
        this.alertTitle = "Success";
      } catch (error) {
        console.error("Error deleting testimony:", error);
        this.showAlertDialog = true;
        this.alertMessage = "Failed to delete testimony.";
        this.alertTitle = "Error";
      }
      this.showConfirmationDialog = false;
    },
    closeAlertDialog() {
      this.showAlertDialog = false;
    },

    validateTestimony(testimony: Testimony): boolean {
      if (!testimony.subject) {
        alert("Subject is required!");
        return false;
      }
      if (!testimony.author) {
        alert("Author is required!");
        return false;
      }
      if (!testimony.text) {
        alert("Text is required!");
        return false;
      }
      return true;
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
@import "@/styles/_mixins.scss";

.testimony-form {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  background-color: $black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  .form__title {
    color: $white;
    margin-bottom: 12px;
  }

  .form__section {
    border: 1px solid $yale-blue;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 1rem;
    background-color: $black;
  }

  .form__group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;

    .form__label {
      font-weight: bold;
      color: $white;
      margin-bottom: 0.5rem;
    }

    .form__input {
      padding: 10px;
      border-radius: 4px;
      border: 1px solid $yale-blue;
      background-color: $black;
      color: $white;

      &:focus {
        outline: none;
        border-color: $primary;
      }
    }

    .form__textarea {
      min-height: 80px;
      resize: vertical;
    }

    .required {
      color: $error;
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
  }
}
</style>
