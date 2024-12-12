import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMainMessageStore = defineStore('mainMessage', () => {
  // State
  const introMessage = ref('');
  const gotAnswer = ref(false)

  // Actions
  const updateIntroMessage = (userText) => {
    introMessage.value = userText;
  };

  const updateGotAnswer = (boolStatus) => {
    gotAnswer.value = boolStatus
  }

  return {
    introMessage,
    gotAnswer,
    updateIntroMessage,
    updateGotAnswer
  };
});