<template>
  <header class="app-header w7-space-between">
    <div class="app-header__left">
      <Navigation class="app-header__nav" />
    </div>
    <div class="app-header__right">
      <div class="user-info">
        <p class="user-name roboto-medium">{{ user?.name }}</p>
        <p class="user-roles roboto-light">Roles: {{ userRoles }}</p>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { User } from "@/models/user.model";
import { getUser } from "@/utils/get-auth-headers";
import Navigation from "@/components/Navigation.vue";

export default defineComponent({
  name: "AppHeader",
  components: {
    Navigation,
  },
  setup() {
    const user = ref<User | null>(null);

    const loadUser = () => {
      user.value = getUser();
    };

    const userRoles = computed(() =>
      user.value ? user.value.rule.join(", ") : ""
    );

    onMounted(() => {
      loadUser();
    });

    return {
      user,
      userRoles,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: $black;
  color: $white;

  &__left {
    display: flex;
    align-items: start;
  }

  &__right {
    display: flex;
    align-items: center;
  }
}

.app-title {
  margin: 0;
  font-size: 1.5rem;
}

.user-info {
  text-align: right;

  .user-name {
    margin: 5px;
    font-size: 1rem;
  }

  .user-roles {
    margin: 0;
    font-size: 0.8rem;
    opacity: 0.8;
  }
}
</style>
