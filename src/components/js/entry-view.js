import { computed, ref, defineComponent } from 'vue';
import { useAnalyzesTextHandler } from "@/composables/useAnalyzesTextHandler";
import { useMainMessageStore } from "@/stores/mainMessage";

export default defineComponent({

  setup(props, { emit }) {
    // Variable declaration
    const mainMessageStore = useMainMessageStore()
    const { handleText } = useAnalyzesTextHandler()

    // Computed
    const transcript = ref('')

    const buttonState = computed(() => {
      return mainMessageStore.buttonState
    })

    const additionalMessage = computed(() => {
      return mainMessageStore.introMessage
    })

    // Method
    const startVoiceRecognition = () => {
      // TESTING WALKAROUND
      // transcript.value = "phone"
      // // transcript.value = "nearby store"
      // handleText(transcript.value)
      // return



      if (buttonState.value.state !== mainMessageStore.buttonStateWordingMapping.default.state) return

      transcript.value = ''
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
        }

        recognition.onerror = (event) => {
          transcript.value = `Error: ${event.error}. Please try again.`
        }

        recognition.onend = () => {
          transcript.value += '\n(mic close already)'
          handleText(transcript.value)
        }
      } else {
        transcript.value = 'Sorry, your browser does not support voice recognition.'
      }
    }


    // transition focus
    const showFirst = ref(true)

    setInterval(() => {
      showFirst.value = !showFirst.value
    }, 200);

    return {
      transcript,
      startVoiceRecognition,
      buttonState,
      showFirst,
      additionalMessage
    }
  },
})