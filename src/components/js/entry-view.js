import { computed, ref, defineComponent } from 'vue';

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

export default defineComponent({
  emits: ['firstLookExpired'],
  setup(props, {emit}) {
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
          buttonState.value = buttonStateWordingMapping.generating

          // get state to default
          buttonState.value = buttonStateWordingMapping.default
          console.log('emit firstlookexpired')
          setTimeout(() => {
            emit('firstLookExpired')
          }, 1500)
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
})