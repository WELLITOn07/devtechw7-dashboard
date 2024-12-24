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
import { defineComponent, markRaw, ref, watch } from "vue";
import {
  ControllerDevTechW7,
  ControllerBiomedsandraApi,
} from "@/enums/controller-type.enum";
import BiomedSandraView from "@/views/BiomedSandraView.vue";
import DevTechW7View from "@/views/DevTechW7View.vue";

export default defineComponent({
  name: "CrudForm",
  components: {
    BiomedSandraView: markRaw(BiomedSandraView),
    DevTechW7View: markRaw(DevTechW7View),
  },
  props: {
    data: {
      type: Object as () => any,
      required: true,
      default: () => ({}),
    },
    name: {
      type: String,
      required: true,
    },
  },
  emits: ["save"],
  setup(props, { emit }) {
    const crudFormComponent = ref<
      null | typeof DevTechW7View | typeof BiomedSandraView
    >(null);

    watch(
      () => props.name,
      (newValue) => {
        if (!newValue) {
          crudFormComponent.value = null;
          return;
        }

        switch (newValue) {
          case ControllerDevTechW7.APPLICATION:
          case ControllerDevTechW7.USER:
          case ControllerDevTechW7.ACCESS_RULES:
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
      emit("save", updatedData);
    };

    return {
      crudFormComponent,
      handleSave,
    };
  },
});
</script>
