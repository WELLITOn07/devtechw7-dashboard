<template>
  <header class="app-header w7-space-between">
    <div class="app-header__left">
      <h1 class="app-title montserrat-bold w7-title">DevTechW7</h1>
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

export default defineComponent({
  name: "AppHeader",
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
  background-color: $oxford-blue;
  padding: 16px 32px;
  color: $mikado-yellow;

  &__left {
    display: flex;
    align-items: center;

    .app-title {
      font-size: 24px;
    }
  }

  &__right {
    display: flex;
    align-items: center;

    .user-info {
      text-align: right;
      padding: 10px;

      .user-name {
        margin: 0;
        font-size: 18px;
        color: $white;
      }

      .user-roles {
        margin: 0;
        font-size: 14px;
        color: $mikado-yellow;
      }
    }
  }
}
</style>
