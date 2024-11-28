<template>
  <div v-if="visible" class="dialog-overlay w7-center">
    <div class="dialog-content w7-padding">
      <h3 class="montserrat-bold dialog-title">{{ title }}</h3>
      <p class="roboto-regular dialog-message">{{ message }}</p>
      <button class="btn roboto-medium" @click="closeDialog">OK</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AlertDialog",
  props: {
    title: {
      type: String,
      default: "Alert",
    },
    message: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close"],
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
});
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-content {
  background-color: $oxford-blue;
  color: $mikado-yellow;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  max-width: 400px;
  width: 100%;
  text-align: center;

  .dialog-title {
    margin-bottom: 16px;
    font-size: 20px;
    color: $gold;
  }

  .dialog-message {
    margin-bottom: 24px;
    font-size: 16px;
  }

  .btn {
    width: 100%;
    padding: 12px;
    background-color: $mikado-yellow;
    border: none;
    color: $rich-black;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: $gold;
    }
  }
}
</style>
