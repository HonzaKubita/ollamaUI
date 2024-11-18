<script setup lang="ts">
import type { ChatMessage } from '~/types/chat';

const props = defineProps<{
  data: ChatMessage;
}>();

// const streamText = ref<string | null>(null);

// if (props.data.stream) {
//   const textDecoder = new TextDecoder();
//   const reader = props.data.stream.getReader();

//   let buffer = '';

//   while (true) {
//     const { done, value } = await reader.read();

//     if (done) {
//       reader.releaseLock();
//       break;
//     };

//     buffer += textDecoder.decode(value, {stream: true});

//     for (let i = 0; i < buffer.length; i++) {
//       if (buffer[i] == '}') {
//         streamText.value += JSON.parse(buffer.slice(0, i)).response;
//         buffer = buffer.slice(i + 1);
//       }
//     }

//     console.log(buffer);
//   }
// }

</script>

<template>
<div 
  class="chat-message"
  :style="{
    flexDirection: props.data.sender == 'USER'? 'row-reverse': 'row'
  }"
>

  <UAvatar 
    :icon="props.data.sender == 'USER'? 
      'i-material-symbols:person': 
      'i-simple-icons:ollama' " 
  />
  
  <div class="chat-message-text-container">
    <UCard>
      <p class="chat-message-text">
        {{ props.data.text }}
        <!-- {{ streamText }} -->
      </p>
    </UCard>
  </div>

</div>
</template>

<style scoped>

.chat-message {

  display: flex;
  align-items: end;

  padding: 10px;

  gap: 10px;
}

.chat-message-text-container {
  max-width: 70%;
}

</style>