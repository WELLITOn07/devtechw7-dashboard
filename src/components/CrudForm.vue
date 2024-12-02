<template>
  <form @submit.prevent="handleSave" class="crud-form w7-full-size">
    <div class="crud-form__form-group crud-form__form-group--full-size">
      <label for="data" class="crud-form__label roboto-medium">Edit Data</label>
      <textarea
        id="data"
        v-model="jsonData"
        class="crud-form__textarea roboto-regular"
        placeholder="Edit the JSON data here"></textarea>
    </div>
    <button type="submit" class="crud-form__button w7-margin btn roboto-medium">
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
      jsonData: JSON.stringify(this.data, null, 2),
    };
  },
  methods: {
    handleSave() {
      this.$emit("save", this.jsonData); 
    },
  },
});
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";
@import "../styles/_mixins.scss";

.crud-form {
  @include flex(column, flex-start, flex-start);
  background-color: $oxford-blue;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;

  &__form-group {
    margin-bottom: 16px;

    &--full-size {
      width: 100%;
    }
  }

  &__label {
    font-size: 1rem;
    color: $mikado-yellow;
    margin-bottom: 8px;
  }

  &__textarea {
    width: 100%;
    height: 200px;
    padding: 12px;
    border: 1px solid $yale-blue;
    border-radius: 8px;
    font-family: monospace;
    background-color: $rich-black;
    color: $mikado-yellow;
    resize: none;

    &:focus {
      outline: 2px solid $mikado-yellow;
    }
  }

  &__button {
    align-self: flex-start;
    padding: 12px 24px;
    background-color: $gold;
    border: none;
    color: $rich-black;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: $mikado-yellow;
    }
  }
}
</style>
