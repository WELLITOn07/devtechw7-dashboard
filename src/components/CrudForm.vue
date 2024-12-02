<template>
  <form @submit.prevent="handleSave" class="crud-form">
    <div
      v-for="(value, key) in formData"
      :key="key"
      class="crud-form__form-group crud-form__form-group--full-size">
      <label :for="String(key)" class="crud-form__label roboto-regular">
        {{ key }}
      </label>
      <input
        type="text"
        :id="String(key)"
        v-model="formData[key]"
        class="crud-form__input roboto-regular"
        :placeholder="String(key)" />
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

  &__input {
    padding: 8px;
    border: 1px solid $yale-blue;
    border-radius: 4px;
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
