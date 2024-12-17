<template>
  <div class="central-view">
    <h1 class="title">Advertisement Management</h1>

    <!-- Form -->
    <AdvertisementForm
      @save="handleSave"
      @preview="handlePreview"
      :form-data="currentAd" />

    <!-- List -->
    <AdvertisementList
      :advertisements="advertisements"
      @edit="handleEdit"
      @delete="handleDelete" />

    <!-- Preview -->
    <AdvertisementPreview v-if="previewAd" :ad="previewAd" />
  </div>
</template>

<script lang="ts">
import AdvertisementForm from "@/components/devTechW7/avertisements/AdvertisementForm.vue";
import AdvertisementList from "@/components/devTechW7/avertisements/AdvertisementList.vue";
import AdvertisementPreview from "@/components/devTechW7/avertisements/AdvertisementPreview.vue";
import { Advertisement } from "@/models/advertisement.model";
import {
  createAdvertisement,
  deleteAdvertisement,
  fetchAdvertisements,
  updateAdvertisement,
} from "@/services/AdvertisementService";
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "AdvertisementCentralView",
  components: { AdvertisementForm, AdvertisementList, AdvertisementPreview },
  setup() {
    const advertisements = ref<Advertisement[]>([]);
    const currentAd = ref<Advertisement | null>(null);
    const previewAd = ref<Advertisement | null>(null);

    const loadAdvertisements = async () => {
      advertisements.value = await fetchAdvertisements();
    };

    const handleSave = async (ad: Advertisement) => {
      if (ad.id) {
        await updateAdvertisement(ad.id, ad);
      } else {
        await createAdvertisement(ad);
      }
      currentAd.value = null;
      await loadAdvertisements();
    };

    const handleEdit = (ad: Advertisement) => {
      currentAd.value = { ...ad };
    };

    const handleDelete = async (id: number) => {
      await deleteAdvertisement(id);
      await loadAdvertisements();
    };

    const handlePreview = (ad: Advertisement) => {
      previewAd.value = ad;
    };

    onMounted(loadAdvertisements);

    return {
      advertisements,
      currentAd,
      previewAd,
      handleSave,
      handleEdit,
      handleDelete,
      handlePreview,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.central-view {
  padding: 16px;

  .title {
    color: $gold;
    margin-bottom: 24px;
  }
}
</style>
