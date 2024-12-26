<template>
  <div class="home">
    <div class="content w7-margin">
      <h1 class="title">
        <span class="animate-text montserrat-bold">DevTechW7</span>
        <span class="animate-text delay-1 montserrat-bold">Dashboard</span>
      </h1>

      <div class="features w7-space-between">
        <router-link to="/courses" class="feature animate-up delay-2">
          <h2 class="roboto-medium">Cursos</h2>
          <p class="roboto-light">
            Gerencie seus cursos e conteúdos educacionais com facilidade.
          </p>
        </router-link>

        <router-link
          to="/analytics-dashboard"
          class="feature animate-up delay-3">
          <h2 class="roboto-medium">Analytics</h2>
          <p class="roboto-light">
            Acompanhe métricas e insights importantes do seu negócio.
          </p>
        </router-link>

        <router-link
          to="/advertisement-central"
          class="feature animate-up delay-4">
          <h2 class="roboto-medium">Propagandas</h2>
          <p class="roboto-light">
            Gerencie suas campanhas publicitárias de forma eficiente.
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.home {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  text-align: center;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.title {
  margin-bottom: 6rem;
  font-size: 4.5rem;
  color: $mikado-yellow;

  .animate-text {
    display: inline-block;
    animation: slideIn 0.8s ease forwards;
    opacity: 0;

    &.delay-1 {
      animation-delay: 0.3s;
      margin-left: 1.5rem;
    }
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-top: 4rem;
}

.feature {
  background-color: $yale-blue;
  padding: 2rem;
  border-radius: 1rem;
  min-width: 280px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  h2 {
    color: $mikado-yellow;
    margin-bottom: 1rem;
  }

  p {
    color: $white;
    line-height: 1.5;
  }
}

.animate-up {
  animation: fadeUp 0.8s ease forwards;

  &.delay-2 {
    animation-delay: 0.6s;
  }

  &.delay-3 {
    animation-delay: 0.9s;
  }

  &.delay-4 {
    animation-delay: 1.2s;
  }
}

@media (min-width: 1440px) {
  .content {
    padding: 6rem 2rem;
  }

  .title {
    font-size: 5.5rem;
  }

  .feature {
    padding: 4rem;

    h2 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1.4rem;
    }
  }
}

@media (max-width: 1024px) {
  .title {
    font-size: 3.5rem;
  }

  .features {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .feature {
    padding: 2rem;

    h2 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1.1rem;
    }
  }
}

@media (max-width: 767px) {
  .content {
    padding: 3rem 2rem;
  }

  .title {
    font-size: 2.5rem;
    margin-bottom: 3rem;

    .animate-text.delay-1 {
      margin-left: 0.8rem;
    }
  }

  .features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature {
    padding: 1.5rem;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.6;
    }
  }
}
</style>
