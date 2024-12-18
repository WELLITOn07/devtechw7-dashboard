<template>
  <div class="preview-container">
    <div class="preview">
      <h1 class="preview-title">{{ ad.title }}</h1>
      <p class="preview-description">{{ ad.description }}</p>
      <p>Confira mais detalhes acessando o link abaixo:</p>
      <a class="cta-button" :href="ad.link" target="_blank">Ver Oferta</a>

      <img
        v-if="ad.image"
        :src="ad.image"
        alt="Propaganda"
        class="preview-image" />

      <hr />
      <p class="highlight">Obrigado(a) por estar conosco!</p>
      <p class="footer-message">
        Você está recebendo esta mensagem porque se inscreveu para receber
        novidades da nossa plataforma. Caso não queira mais receber, entre em
        contato conosco.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Advertisement } from "@/models/advertisement.model";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "AdvertisementPreview",
  props: {
    ad: {
      type: Object as PropType<Advertisement>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: #f9f9f9;
}

.preview {
  max-width: 600px;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;

  .preview-title {
    font-size: 24px;
    color: #305b8f;
    margin-bottom: 16px;
  }

  .preview-description {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .cta-button {
    display: inline-block;
    margin-top: 16px;
    padding: 10px 20px;
    background: #305b8f;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: darken(#305b8f, 10%);
    }
  }

  .preview-image {
    max-width: 100%;
    margin-top: 20px;
    border-radius: 4px;
  }

  .highlight {
    font-weight: bold;
    color: #305b8f;
    margin-top: 20px;
  }

  .footer-message {
    font-size: 14px;
    color: #555;
    margin-top: 8px;
    line-height: 1.4;
  }
}
</style>
