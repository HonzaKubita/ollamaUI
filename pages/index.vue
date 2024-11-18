<script setup lang="ts">
import OllamaApi from '~/services/ollamaApi';
import type { OllamaModel } from '~/types/ollama';

const currentModel = ref<OllamaModel>();

function startChat() {
  if (!currentModel.value) return;
  navigateTo(`/chat?m=${encodeURIComponent(currentModel.value?.name)}`);
}

</script>

<template>
<div class="main">
  <h1 class="title">Ollama UI</h1>
  <h1 class="subtitle">Please pick one of your models to chat with</h1>
  <ModelPicker v-model="currentModel"/>

  <UButton class="start-chat" @click="startChat" :disabled="!currentModel">Start Chat</UButton>

  <ConnectionError />
</div>
</template>

<style scoped>

.main {
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 60px;
  margin: 20px;
}

.subtitle {
  font-size: 18px;
  margin: 5px;
}

.start-chat {
  margin-top: 10px;
}

</style>