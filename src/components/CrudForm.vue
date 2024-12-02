<template>
  <form @submit.prevent="handleSave" class="crud-form">
    <div class="crud-form__form-group crud-form__form-group--full-size">
      <label for="data" class="crud-form__label roboto-regular">Data</label>
      <textarea
        id="data"
        v-model="jsonData"
        class="crud-form__textarea roboto-regular"
        placeholder="Edit the JSON data here"></textarea>
    </div>
    <button type="submit" class="crud-form__button btn roboto-medium">
      Save
    </button>
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
      jsonData: JSON.stringify(this.data, null, 2), // Initialize as JSON string
    };
  },
  methods: {
    handleSave() {
      this.$emit("save", this.jsonData); // Emit the JSON string to the parent
    },
  },
});
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

.crud-form {
  &__form-group {
    display: flex;
    flex-direction: column;

    &--full-size {
      width: 100%;
    }
  }

  &__label {
    margin-bottom: 8px;
  }

  &__textarea {
    width: 100%;
    height: 150px;
    padding: 8px;
    border: 1px solid $yale-blue;
    border-radius: 4px;
    font-family: monospace;
  }

  &__button {
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
