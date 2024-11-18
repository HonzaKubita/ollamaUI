<script setup lang="ts">
import OllamaApi from '~/services/ollamaApi';
import type { OllamaModel } from '~/types/ollama';

const model = defineModel<OllamaModel>();

const modelsLoading = ref(true);
const availableModels = ref<OllamaModel[]>([]);

async function fetchModels() {
  const models = await OllamaApi.getLocalModels();
  availableModels.value = models;
  model.value = models[0];
  modelsLoading.value = false;

  console.log(models);
}

onMounted(() => {
  fetchModels();
});
</script>

<template>
  <div class="model-select">
    <UInputMenu 
      v-model="model" 
      :options="availableModels" 
      :loading="modelsLoading" 
      option-attribute="name"
      />
  </div>
</template>

<style scoped>

.main-container {
  width: 100vw;
  height: 100vh;

  display: flex;
  
  justify-content: center;
  align-items: center;
}

.model-select {
  width: 200px;
}

</style>