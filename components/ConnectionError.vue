<script setup lang="ts">
import OllamaApi from '~/services/ollamaApi';

const connecting = ref(false);
const ollamaNotRunning = ref(false);

async function checkServerStatus() {
  connecting.value = true;
  const isRunning = await OllamaApi.isServeRunning();
  ollamaNotRunning.value = !isRunning;
  console.log(isRunning);
  connecting.value = false;
}

function buttonCheckServerStatus() {
  connecting.value = true;
  setTimeout(checkServerStatus, 300);
}


onMounted(() => {
  checkServerStatus();
});
</script>

<template>
<UModal :model-value="ollamaNotRunning" prevent-close>
  <div class="modal-content">
    <div class="modal-text">
      <h1 class="text-2xl">Couldn't connect to Ollama</h1>
      <p>Make sure the ollama app is running</p>
      <UButton @click="buttonCheckServerStatus" :loading="connecting" class="modal-button">Retry</UButton>
    </div>
    <img src="/ollamaError.svg" class="modal-image">
  </div>
</UModal>
</template>

<style scoped>

.modal-content {
  padding: 30px;

  display: flex;
  flex-direction: row;

  gap: 20px;

  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.modal-button {
  margin-top: 20px;
}

.modal-image {
  width: 30%;
}

</style>