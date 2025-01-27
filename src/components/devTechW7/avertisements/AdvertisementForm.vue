<template>
  <form @submit.prevent="onSubmit" class="advertisement-form w7-padding">
    <h3 class="form__title w7-subtitle montserrat-medium">
      Advertisement Form
    </h3>
    <div class="form__group">
      <label for="title" class="form__label">Title</label>
      <input
        id="title"
        v-model="localFormData.title"
        type="text"
        class="form__input"
        placeholder="Enter advertisement title"
        required />
    </div>

    <div class="form__group">
      <label for="description" class="form__label">Description</label>
      <textarea
        id="description"
        v-model="localFormData.description"
        @blur="normalizeDescription"
        class="form__input form__textarea"
        placeholder="Enter advertisement description"></textarea>
    </div>

    <div class="form__group">
      <label for="link" class="form__label">Link</label>
      <input
        id="link"
        v-model="localFormData.link"
        type="url"
        class="form__input"
        placeholder="Enter URL"
        required />
    </div>

    <div class="form__group">
      <label for="image" class="form__label">Image Link</label>
      <textarea
        id="image"
        v-model="localFormData.image"
        class="form__input form__textarea"
        placeholder="Paste link to the image here"></textarea>
    </div>

    <div class="form__actions w7-space-between">
      <button type="submit" class="form__button btn btn-success">
        {{ localFormData.id ? "Update" : "Create" }}
      </button>
      <button
        type="button"
        class="form__button btn btn-primary"
        @click="onPreview">
        Preview
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { Advertisement } from "@/models/advertisement.model";

export default defineComponent({
  name: "AdvertisementForm",
  props: {
    formData: {
      type: Object as PropType<Advertisement | null>,
      default: () => ({ title: "", description: "", link: "", image: "" }),
    },
  },
  emits: ["save", "preview"],
  setup(props, { emit }) {
    const localFormData = ref<Advertisement>({
      id: props.formData?.id ?? 0,
      title: props.formData?.title ?? "",
      description: props.formData?.description ?? "",
      link: props.formData?.link ?? "",
      image: props.formData?.image ?? "",
    });

    const onSubmit = () => {
      if (
        !localFormData.value.title.trim() ||
        !localFormData.value.link.trim()
      ) {
        return;
      }
      emit("save", { ...localFormData.value });
    };

    const onPreview = () => {
      emit("preview", { ...localFormData.value });
    };

    const normalizeDescription = () => {
      localFormData.value.description = localFormData.value.description.trim();
    };

    watch(
      () => props.formData,
      (newValue) => {
        localFormData.value = {
          id: newValue?.id ?? 0,
          title: newValue?.title ?? "",
          description: newValue?.description ?? "",
          link: newValue?.link ?? "",
          image: newValue?.image ?? "",
        };
      },
      { deep: true }
    );

    return { localFormData, onSubmit, onPreview, normalizeDescription };
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
@import "@/styles/_mixins.scss";

.advertisement-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: $oxford-blue;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  .form__title {
    color: $gold;
    margin-bottom: 12px;
    text-align: center;
  }

  .form__group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .form__label {
      font-size: 14px;
      font-weight: bold;
      color: $mikado-yellow;
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

  .link-encode {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: $primary;
    color: $white;
    text-decoration: none;
    font-size: 16px;
    width: 100px;

    &:hover {
      background-color: darken($primary, 10%);
    }

    i {
      margin-left: 4px;
    }
  }

  #description {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .form__actions {
    display: flex;
    justify-content: space-between;
    gap: 12px;

    .form__button {
      width: 48%;
      padding: 12px 16px;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &.btn-success {
        background-color: $success;
        color: $white;

        &:hover {
          background-color: darken($success, 10%);
        }
      }

      &.btn-primary {
        background-color: $primary;
        color: $white;

        &:hover {
          background-color: darken($primary, 10%);
        }
      }
    }
  }
}
</style>
