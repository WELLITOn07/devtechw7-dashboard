<template>
  <div class="crud-form">
    <h3 class="crud-form__title montserrat-medium">{{ name }}</h3>
    <DevTechW7View :data="data" :name="name" @save="handleSave" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import DevTechW7View from "@/views/DevTechW7View.vue";

export default defineComponent({
  name: "CrudForm",
  components: { DevTechW7View },
  props: {
    data: {
      type: Object as PropType<Record<string, any>>,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleSave(updatedData: Record<string, any>) {
      this.$emit("save", updatedData);
    },
  },
});
</script>

<style scoped lang="scss">
.crud-form {
  background-color: #001d3d;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}
</style>
