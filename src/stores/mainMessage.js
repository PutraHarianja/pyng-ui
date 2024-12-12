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
  const buttonState = ref(buttonStateWordingMapping.default)

  // Actions
  const updateIntroMessage = (userText) => {
    introMessage.value = userText
  };

  const updateGotAnswer = (boolStatus) => {
    gotAnswer.value = boolStatus
  }

  const updateButtonState = (state) => {
    buttonState.value = buttonStateWordingMapping[state]
  }

  return {
    introMessage,
    gotAnswer,
    updateIntroMessage,
    updateGotAnswer,
    buttonState,
    buttonStateWordingMapping,
    updateButtonState
  };
});