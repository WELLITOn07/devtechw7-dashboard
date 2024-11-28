<template>
  <button :disabled="loading" class="btn roboto-medium" @click="onClick">
    <span v-if="loading">{{ loadingText }}{{ dots }}</span>
    <span v-else>
      {{ text }}
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";

export default defineComponent({
  name: "LoadingButton",
  props: {
    text: {
      type: String,
      required: true,
    },
    loadingText: {
      type: String,
      default: "Carregando",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const dots = ref("");
    let interval: ReturnType<typeof setInterval>;

    watchEffect(() => {
      if (props.loading) {
        interval = setInterval(() => {
          dots.value = dots.value.length < 3 ? dots.value + "." : "";
        }, 500);
      } else {
        clearInterval(interval);
        dots.value = "";
      }
    });

    const onClick = () => {
      if (!props.loading) emit("click");
    };

    return {
      dots,
      onClick,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

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

  &:disabled {
    cursor: not-allowed;
    background-color: lighten($mikado-yellow, 20%);
  }
}
</style>
