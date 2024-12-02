<template>
  <div class="devtechw7-view">
    <div v-if="name === 'applications'" class="application-form">
      <ApplicationForm :data="data" @save="handleSave" />
    </div>
    <div v-else-if="name === 'access-rules'" class="access-rules-form">
      <AccessRulesForm :data="data" @save="handleSave" />
    </div>
    <div v-else-if="name === 'user'" class="user-form">
      <UserForm :data="data" @save="handleSave" />
    </div>
    <div v-else>
      <p class="unsupported-controller">Unsupported controller: {{ name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ApplicationForm from "@/components/devTechW7/ApplicationForm.vue";
import AccessRulesForm from "@/components/devTechW7/AccessRulesForm.vue";
import UserForm from "@/components/devTechW7/UserForm.vue";

export default defineComponent({
  name: "DevTechW7View",
  components: { ApplicationForm, AccessRulesForm, UserForm },
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

<style scoped>
.devtechw7-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.unsupported-controller {
  color: red;
  font-weight: bold;
}
</style>
