<template>
  <form @submit.prevent="onSubmit" class="form">
    <input v-model="localFormData.title" placeholder="Title" required />
    <textarea
      v-model="localFormData.description"
      placeholder="Description"></textarea>
    <input v-model="localFormData.link" placeholder="Link" required />
    <input type="file" @change="handleFileUpload" />

    <button type="submit">{{ localFormData.id ? "Update" : "Create" }}</button>
    <button type="button" @click="onPreview">Preview</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";

export default defineComponent({
  name: "AdvertisementForm",
  props: {
    formData: {
      type: Object as PropType<any>,
      default: () => ({ title: "", description: "", link: "", image: "" }),
    },
  },
  emits: ["save", "preview"],
  setup(props, { emit }) {
    const localFormData = ref({ ...props.formData });

    const handleFileUpload = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () =>
          (localFormData.value.image = reader.result as string);
        reader.readAsDataURL(file);
      }
    };

    const onSubmit = () => {
      emit("save", { ...localFormData.value });
    };

    const onPreview = () => {
      emit("preview", { ...localFormData.value });
    };

    watch(
      () => props.formData,
      (newValue) => {
        localFormData.value = { ...newValue };
      },
      { deep: true }
    );

    return { localFormData, handleFileUpload, onSubmit, onPreview };
  },
});
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;

  input,
  textarea {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    background-color: #003566;
    color: white;
    padding: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #00234b;
  }
}
</style>
