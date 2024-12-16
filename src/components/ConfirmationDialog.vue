<!-- src/components/ConfirmationDialog.vue -->
<template>
  <div class="dialog-overlay" v-if="visible">
    <div class="dialog-container">
      <h3 class="dialog-title w7-title montserrat-bold">{{ title }}</h3>
      <p class="dialog-message">{{ message }}</p>
      <div class="dialog-actions w7-space-between">
        <button
          class="btn btn-secondary dialog-button"
          @click="$emit('cancel')">
          Cancel
        </button>
        <button class="btn btn-danger dialog-button" @click="$emit('confirm')">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ConfirmationDialog",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Confirmation",
    },
    message: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-container {
  background-color: $oxford-blue;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 400px;
}

.dialog-title {
  color: $mikado-yellow;
  margin-bottom: 16px;
  text-align: center;
}

.dialog-message {
  color: $white;
  margin-bottom: 24px;
  text-align: center;
}

.dialog-actions {
  display: flex;
  gap: 12px;

  .dialog-button {
    flex: 1;
    padding: 12px;
    font-size: 16px;
    border-radius: 4px;
  }
}
</style>
