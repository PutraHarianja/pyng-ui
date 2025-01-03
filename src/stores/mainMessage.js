import { defineStore } from 'pinia';
import { ref } from 'vue';


const buttonStateWordingMapping = {
  default: {
    state: 'default',
    wording: 'Click to ask'
  },
  listening: {
    state: 'listening',
    wording: 'Listening...'
  },
  generating: {
    state: 'generating',
    wording: 'Generating'
  }
}

export const useMainMessageStore = defineStore('mainMessage', () => {
  // State
  const introMessage = ref('')
  const gotAnswer = ref(false)
  const firstViewExpired = ref(false)
  const buttonState = ref(buttonStateWordingMapping.default)

  // Actions
  const updateIntroMessage = (userText) => {
    introMessage.value = userText
  }

  const updateGotAnswer = (boolStatus) => {
    gotAnswer.value = boolStatus
    if (boolStatus && !firstViewExpired.value) firstViewExpired.value = true
  }

  const updateButtonState = (state) => {
    buttonState.value = buttonStateWordingMapping[state]
  }

  const resetMainMessage = () => {
    introMessage.value = ""
  }

  return {
    introMessage,
    gotAnswer,
    updateIntroMessage,
    updateGotAnswer,
    buttonState,
    buttonStateWordingMapping,
    firstViewExpired,
    updateButtonState,
    resetMainMessage
  };
});