<template>
  <div class="application-card" @click="$emit('click')">
    <h2 class="montserrat-medium app-name">{{ application.name }}</h2>
    <p class="app-description">{{ application.urlOrigin }}</p>
    <div class="roles">
      <span
        v-for="role in application.allowedRoles"
        :key="role"
        class="role"
        :class="{ admin: role === 'ADMIN', moderator: role === 'MODERATOR' }">
        {{ role }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface Application {
  name: string;
  urlOrigin: string;
  allowedRoles: string[];
}

export default defineComponent({
  name: "ApplicationCard",
  props: {
    application: {
      type: Object as PropType<Application>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

.application-card {
  background-color: $oxford-blue;
  color: $mikado-yellow;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .app-name {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }

  .app-description {
    font-size: 1rem;
    margin-bottom: 16px;
    color: $gold;
  }

  .roles {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .role {
      font-size: 0.8rem;
      padding: 4px 8px;
      border-radius: 4px;
      background-color: $yale-blue;
      color: $mikado-yellow;

      &.admin {
        background-color: $rich-black;
        color: $gold;
      }

      &.moderator {
        background-color: $gold;
        color: $rich-black;
      }
    }
  }
}
</style>
