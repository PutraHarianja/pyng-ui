import { ref } from 'vue';

export default {
  setup() {
    const transcript = ref('Your voice input will appear here...'); 

    const startVoiceRecognition = () => {
        transcript.value = 'Your voice input will appear here...'
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition
            const recognition = new SpeechRecognition()

            recognition.lang = 'en-US'
            recognition.interimResults = false // Set to true for live updates
            recognition.maxAlternatives = 1

            transcript.value = 'Listening... 🎧';]

            recognition.start()

            recognition.onresult = (event) => {
            transcript.value = `You said: "${event.results[0][0].transcript}"`
            }

            recognition.onerror = (event) => {
            transcript.value = `Error: ${event.error}`
            }

            recognition.onend = () => {
            transcript.value += ' (Speech recognition ended)'
            }
        } else {
            transcript.value = 'Sorry, your browser does not support voice recognition.'
        }
    }

    return {
      transcript,
      startVoiceRecognition,
    }
  },
};