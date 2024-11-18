<script setup lang="ts">
import type { ChatMessage } from '~/types/chat';
import OllamaApi from '~/services/ollamaApi';

const route = useRoute();

const selectedModel = route.query.m as string;
const userMessage = ref('');
const generating = ref(true);

const messages = ref<ChatMessage[]>([]);
const currentContext = ref<number[]>([]);

const chatRef = useTemplateRef<HTMLDivElement>('chat');

function scrollToBottom() {
  chatRef.value?.scrollTo({
    top: chatRef.value.scrollHeight,
    behavior: 'smooth',
  });
}

async function sendModelMessage(prompt: string) {
  generating.value = true;

  const {response, context} = await OllamaApi.generateText(selectedModel, prompt, currentContext.value);

  currentContext.value = context;

  messages.value.push({
    sender: 'MODEL',
    text: response,
    context,
  });

  generating.value = false;
}

async function sendUserMessage() {
  messages.value.push({
    sender: 'USER',
    text: userMessage.value,
  });
}

async function sendMessage() {
  if (!userMessage.value) return;

  await sendUserMessage();
  scrollToBottom();
  await sendModelMessage(userMessage.value);
  scrollToBottom();

  userMessage.value = '';
}

onMounted(async () => {
  await sendModelMessage('Hello');
});

</script>

<template>
<div class="main">

  <div class="chat-header">
    <UButton icon="i-material-symbols:arrow-back" @click="navigateTo('/')"/>
    <UBadge>
      <p class="title">{{ selectedModel }}</p>
    </UBadge>
  </div>

  <div class="chat" ref="chat">
    <div class="chat-background-container">
      <img src="/logo.svg" class="chat-background">
    </div>

    <ChatMessage v-for="message in messages" :data="message"/>
  </div>

  <div class="user-input">
    <div class="user-input-text">
      <UInput 
        v-model="userMessage" 
        placeholder="Type a message"
        :disabled="generating"
        padded
        size="lg"
        @keyup.enter="sendMessage"
      />
    </div>
    <UButton icon="i-material-symbols:arrow-upward-rounded" @click="sendMessage" :loading="generating" />
  </div>

</div>
</template>

<style scoped>

.main {
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;

  align-items: center;
}

.chat-header {
  width: 100vw;
  height: 50px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 10px;
}

.chat {
  width: 100vw;
  height: calc(100vh - 60px - 50px);

  overflow-y: scroll;
}

.user-input {
  width: calc(100vw - 20px);
  height: 50px;

  max-width: 80vw;

  margin-left: 10px;
  margin-right: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.user-input-text {
  width: calc(100% - 40px);
}

.chat-background-container {
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: -1;
  
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat-background {
  width: 80%;
  height: 80%;
  object-fit: fit;
  object-position: center;
  filter: opacity(0.04);

  pointer-events: none;
}

</style>