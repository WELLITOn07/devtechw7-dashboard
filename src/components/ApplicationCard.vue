<template>
  <div class="application-card" @click="$emit('click')">
    <h2 class="montserrat-medium app-name">{{ application.name }}</h2>
    <p class="app-description">{{ application.description }}</p>
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
import { Application } from "@/models/application.model";
import { defineComponent, PropType } from "vue";

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
.application-card {
  background-color: #2e3a59;
  color: #f5c518;
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
    color: #f5c518;
  }

  .roles {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .role {
      font-size: 0.8rem;
      padding: 4px 8px;
      border-radius: 4px;
      background-color: #1b2738;
      color: #f5c518;

      &.admin {
        background-color: #ff4c4c;
        color: #ffffff;
      }

      &.moderator {
        background-color: #ffd700;
        color: #1b2738;
      }
    }
  }
}
</style>
