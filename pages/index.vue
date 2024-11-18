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
  <div class="title-container">
    <img src="/logo.svg" alt="Ollama Logo" class="logo"/>
    <h1 class="title">Ollama UI</h1>
  </div>
  <h1 class="subtitle">Please pick one of downloaded models to chat with</h1>
  <ModelPicker v-model="currentModel"/>

  <UButton class="start-chat" @click="startChat" :disabled="!currentModel">Start Chat</UButton>
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

.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  width: 80px;
  height: 80px;
}

.title {
  font-size: 60px;
}

.subtitle {
  font-size: 18px;
  margin: 5px;
}

.start-chat {
  margin-top: 10px;
}

</style>