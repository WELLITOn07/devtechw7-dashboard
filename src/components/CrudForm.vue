<template>
  <form @submit.prevent="handleSave" class="crud-form">
    <div
      v-for="(value, key) in formData"
      :key="key"
      class="form-group w7-full-size">
      <label :for="key" class="roboto-regular">{{ key }}</label>
      <input
        type="text"
        :id="key"
        v-model="formData[key]"
        class="input roboto-regular"
        :placeholder="key" />
    </div>
    <button type="submit" class="btn roboto-medium">Save</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CrudForm",
  props: {
    data: {
      type: Object as PropType<Record<string, any>>,
      required: true,
    },
  },
  data() {
    return {
      formData: { ...this.data },
    };
  },
  methods: {
    handleSave() {
      this.$emit("save", this.formData);
    },
  },
});
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

.crud-form {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .input {
    padding: 8px;
    border: 1px solid $yale-blue;
    border-radius: 4px;
  }

  .btn {
    align-self: flex-start;
    padding: 8px 16px;
    background-color: $mikado-yellow;
    border: none;
    color: $rich-black;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
