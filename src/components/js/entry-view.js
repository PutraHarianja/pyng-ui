import { computed, ref, defineComponent } from 'vue';
import { useAnalyzesTextHandler } from "@/composables/useAnalyzesTextHandler";

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
  setup(props, { emit }) {
    const { handleText } = useAnalyzesTextHandler();
    const transcript = ref('Your voice input will appear here...');
    const buttonState = ref(buttonStateWordingMapping.default)

    const startVoiceRecognition = () => {
      if (buttonState.value.state !== buttonStateWordingMapping.default.state) return

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

          buttonState.value = buttonStateWordingMapping.generating

          handleText(transcript.value)
          setTimeout(() => {
            emit('firstLookExpired')
            buttonState.value = buttonStateWordingMapping.default
          }, 3000)
        }

        recognition.onerror = (event) => {
          transcript.value = `Error: ${event.error}. Please try again.`
        }

        recognition.onend = () => {
          console.log('done hearing, we close the mic already')
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