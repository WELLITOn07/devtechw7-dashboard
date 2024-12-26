<!-- src/components/Navigation.vue -->
<template>
  <nav class="navigation">
    <div class="nav-links" :class="{ 'nav-links--active': isMenuOpen }">
      <router-link to="/" class="nav-link roboto-medium" @click="closeMenu">
        Home
      </router-link>
      <router-link
        to="/courses"
        class="nav-link roboto-medium"
        @click="closeMenu">
        Courses
      </router-link>
      <router-link
        to="/analytics-dashboard"
        class="nav-link roboto-medium"
        @click="closeMenu">
        Analytics
      </router-link>
      <router-link
        to="/advertisement-central"
        class="nav-link roboto-medium"
        @click="closeMenu">
        Advertisement
      </router-link>
    </div>

    <button
      class="menu-toggle"
      @click="toggleMenu"
      :class="{ 'menu-toggle--active': isMenuOpen }">
      <span class="menu-toggle__line"></span>
      <span class="menu-toggle__line"></span>
      <span class="menu-toggle__line"></span>
    </button>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Navigation",
  setup() {
    const isMenuOpen = ref(false);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
      if (isMenuOpen.value) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
      document.body.style.overflow = "";
    };

    return {
      isMenuOpen,
      toggleMenu,
      closeMenu,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.navigation {
  position: relative;
  display: flex;
  align-items: center;
  background-color: $oxford-blue;
  padding: 1rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: $white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: rgba($mikado-yellow, 0.1);
    color: $mikado-yellow;
  }

  &.router-link-active {
    background-color: $mikado-yellow;
    color: $oxford-blue;
  }
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 11;

  &__line {
    width: 100%;
    height: 3px;
    background-color: $mikado-yellow;
    transition: all 0.3s ease;
    border-radius: 2px;
  }

  &--active {
    .menu-toggle__line {
      &:first-child {
        transform: translateY(9px) rotate(45deg);
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:last-child {
        transform: translateY(-9px) rotate(-45deg);
      }
    }
  }
}

@media (max-width: 1024px) {
  .nav-link {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
}

@media (max-width: 767px) {
  .navigation {
    justify-content: flex-end;
  }

  .menu-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $oxford-blue;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 10;
    padding: 2rem;

    &--active {
      transform: translateX(0);
    }
  }

  .nav-link {
    font-size: 1.2rem;
    width: 100%;
    text-align: center;
    padding: 1rem;

    &:hover {
      background-color: rgba($mikado-yellow, 0.1);
    }
  }
}

@media (min-width: 1440px) {
  .nav-links {
    gap: 2rem;
  }

  .nav-link {
    font-size: 1.1rem;
    padding: 0.6rem 1.2rem;
  }
}
</style>
