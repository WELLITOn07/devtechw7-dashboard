<template>
  <div class="application-card" @click="$emit('click')">
    <h2 class="application-card__name montserrat-bold">{{ application.name }}</h2>
    <p class="application-card__description roboto-medium">{{ application.description }}</p>
    <div class="application-card__roles">
      <span v-for="role in application.allowedRoles" :key="role" class="application-card__role" :class="{
          'application-card__roles--admin': role === 'ADMIN',
          'application-card__roles--moderator': role === 'MODERATOR',
        }">
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
@import "../styles/_variables.scss";
@import "../styles/_mixins.scss";

.application-card {
  @include Applicationcard;

  &__name {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }

  &__description {
    font-size: 1rem;
    margin-bottom: 16px;
  }

  &__roles {
    @include flex;
    flex-wrap: wrap;
    gap: 8px;
    color: $white;

    &--admin {
      @include roleColor($error);
    }

    &--moderator {
      @include roleColor($warning);
    }
  }
}
</style>
