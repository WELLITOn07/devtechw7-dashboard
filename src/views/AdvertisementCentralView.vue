<template>
  <div class="central-view w7-padding">
    <header class="central-view__header w7-space-between">
      <h1 class="central-view__title w7-title montserrat-bold">
        Advertisement Management
      </h1>
    </header>

    <!-- Form Section -->
    <section class="central-view__form">
      <AdvertisementForm
        @save="handleSave"
        @preview="handlePreview"
        :form-data="currentAd" />
    </section>

    <!-- List Section -->
    <section class="central-view__list w7-margin-top">
      <AdvertisementList
        :advertisements="advertisements"
        @edit="handleEdit"
        @delete="handleDelete" />
    </section>

    <SendAdvertisement :advertisementId="selectedAdvertisementId" />

    <!-- Preview Section -->
    <section v-if="previewAd" class="central-view__preview w7-margin-top">
      <AdvertisementPreview :ad="previewAd" />
    </section>
  </div>
</template>

<script lang="ts">
import AdvertisementForm from "@/components/devTechW7/avertisements/AdvertisementForm.vue";
import AdvertisementList from "@/components/devTechW7/avertisements/AdvertisementList.vue";
import AdvertisementPreview from "@/components/devTechW7/avertisements/AdvertisementPreview.vue";
import SendAdvertisement from "@/components/devTechW7/avertisements/SendAdvertisement.vue";
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
  components: {
    AdvertisementForm,
    AdvertisementList,
    AdvertisementPreview,
    SendAdvertisement,
  },
  setup() {
    const advertisements = ref<Advertisement[]>([]);
    const currentAd = ref<Advertisement | null>(null);
    const previewAd = ref<Advertisement | null>(null);
    const selectedAdvertisementId = ref<number>(0);

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
      selectedAdvertisementId.value = Number(ad.id);
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
      selectedAdvertisementId,
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
@import "@/styles/_mixins.scss";

.central-view {
  background-color: $oxford-blue;
  color: $white;
  height: 100vh;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;

    .central-view__title {
      color: $mikado-yellow;
    }
  }

  &__form,
  &__list,
  &__preview {
    background-color: darken($oxford-blue, 5%);
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }

  &__form {
    border: 1px solid $yale-blue;
  }

  &__list {
    margin-top: 16px;
    border: 1px solid $mikado-yellow;
  }

  &__preview {
    border: 1px solid $gold;
  }
}
</style>
