<template>
  <div class="loading-dialog w7-center w7-padding" v-if="visible">
    <div class="dialog w7-center">
      <div class="spinner"></div>
      <p class="dialog__message w7-subtitle montserrat-medium">{{ message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "LoadingDialog",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String as PropType<string>,
      default: "Loading, please wait...",
    },
  },
});
</script>

<style scoped lang="scss">
@use "@/styles/_variables.scss" as *;

.loading-dialog {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;

  .dialog {
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    padding: 24px;
    width: 300px;
    text-align: center;

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid $mikado-yellow;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }

    .dialog__message {
      color: $white;
      margin: 0;
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
