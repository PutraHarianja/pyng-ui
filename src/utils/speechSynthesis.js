export function createSpeechSynthesis() {
    const synth = window.speechSynthesis;

    function getAvailableVoices() {
        console.log('synth.getVoices()', synth.getVoices())
        return synth.getVoices();
    }

    function speak(text, options = {}) {
        if (synth.speaking) {
            console.error("Speech synthesis is already in progress.");
            return;
        }

        if (text === "") {
            console.error("Text cannot be empty.");
            return;
        }

        console.log('text', text)
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.voice = options.voice || null;
        utterance.pitch = options.pitch ?? 1;
        utterance.rate = options.rate ?? 1;
        utterance.volume = options.volume ?? 1;

        synth.speak(utterance);
    }

    function cancel() {
        if (synth.speaking || synth.pending) {
            synth.cancel();
        }
    }

    return {
        getAvailableVoices,
        speak,
        cancel,
    }
}
