<template>
  <div class="home">
    <h1>Home - {{ env }}</h1>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class HomeView extends Vue {
  get env() {
    return process.env.NODE_ENV === "production" ? "Production" : "Development";
  }
}
</script>
