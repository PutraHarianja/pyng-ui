import { computed, ref } from 'vue';

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

export default {
  setup() {
    const transcript = ref('Your voice input will appear here...');
    const buttonState = ref(buttonStateWordingMapping.default)

    const startVoiceRecognition = () => {
      if (buttonState.value.state !== buttonStateWordingMapping.default.state) return
      
      console.log('get input')
      transcript.value = 'Your voice input will appear here...'
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()

        recognition.lang = 'en-US'
        recognition.interimResults = false // Set to true for live updates
        recognition.maxAlternatives = 1

        buttonState.value = buttonStateWordingMapping.listening

        transcript.value = 'Listening... 🎧';

        recognition.start()

        recognition.onresult = (event) => {
          transcript.value = `You said: "${event.results[0][0].transcript}"`
        }

        recognition.onerror = (event) => {
          transcript.value = `Error: ${event.error}`
        }

        recognition.onend = () => {
          transcript.value += ' (Speech recognition ended)'
          buttonState.value = buttonStateWordingMapping.generating

          // get state to default
          buttonState.value = buttonStateWordingMapping.default
        }
      } else {
        transcript.value = 'Sorry, your browser does not support voice recognition.'
      }

    }

    return {
      transcript,
      startVoiceRecognition,
      buttonState
    }
  },
}