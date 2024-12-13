<template>
  <div class="crud-form">
    <h3 class="crud-form__title montserrat-medium">{{ name }}</h3>
    <component
      :is="crudFormComponent"
      :data="data"
      :name="name"
      @save="handleSave" />
  </div>
</template>

<style scoped lang="scss">
.crud-form {
  background-color: #001d3d;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}
</style>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import {
  ControllerDevTechW7,
  ControllerBiomedsandraApi,
} from "@/enums/controller-type.enum";
import DevTechW7View from "@/views/DevTechW7View.vue";
import BiomedSandraView from "@/views/BiomedSandraView.vue";

export default defineComponent({
  name: "CrudForm",
  components: { DevTechW7View, BiomedSandraView },
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
  setup(props) {
    const crudFormComponent = ref<
      null | typeof DevTechW7View | typeof BiomedSandraView
    >(null);

    watch(
      () => props.name,
      (newValue) => {
        switch (newValue) {
          case ControllerDevTechW7.APPLICATION:
          case ControllerDevTechW7.ACCESS_RULES:
          case ControllerDevTechW7.USER:
            crudFormComponent.value = DevTechW7View;
            break;
          case ControllerBiomedsandraApi.COURSES:
            crudFormComponent.value = BiomedSandraView;
            break;
          default:
            throw new Error(`Unrecognized controller name: ${newValue}`);
        }
      },
      { immediate: true }
    );

    const handleSave = (updatedData: Record<string, any>) => {
      console.log("CrudForm: handleSave", updatedData);
    };

    return {
      crudFormComponent,
      handleSave,
    };
  },
});
</script>
