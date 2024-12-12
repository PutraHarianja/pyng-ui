import { computed, ref, defineComponent } from 'vue';
import { useAnalyzesTextHandler } from "@/composables/useAnalyzesTextHandler";
import { useMainMessageStore } from "@/stores/mainMessage";

export default defineComponent({
  emits: ['firstLookExpired'],
  setup(props, { emit }) {
    const mainMessageStore = useMainMessageStore()
    const { handleText } = useAnalyzesTextHandler()

    const transcript = ref('Your voice input will appear here...')
    const buttonState = computed(() => {
      return mainMessageStore.buttonState
    })
    const startVoiceRecognition = () => {
      if (buttonState.value.state !== mainMessageStore.buttonStateWordingMapping.default.state) return

      transcript.value = 'Your voice input will appear here...'
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()

        recognition.lang = 'en-US'
        recognition.interimResults = false // Set to true for live updates
        recognition.maxAlternatives = 1

        mainMessageStore.updateButtonState('listening')

        transcript.value = 'Listening... 🎧';

        recognition.start()

        recognition.onresult = (event) => {
          transcript.value = `You said: "${event.results[0][0].transcript}"`
          handleText(transcript.value)
        }

        recognition.onerror = (event) => {
          transcript.value = `Error: ${event.error}. Please try again.`
        }

        recognition.onend = () => {
          console.log('done hearing, we close the mic already')
          transcript.value += '(done hearing, mic close already)'
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