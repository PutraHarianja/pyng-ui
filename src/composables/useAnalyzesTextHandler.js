// src/composables/useVoiceTextHandler.js
import { useProductStore } from "@/stores/product";
import { useLocationStore } from "@/stores/location";
import { useMainMessageStore } from "@/stores/mainMessage";

export function useAnalyzesTextHandler() {
    const productStore = useProductStore();
    const locationStore = useLocationStore();
    const mainMessageStore = useMainMessageStore();

    const doneExecute = (resp) => {
        mainMessageStore.updateGotAnswer(Boolean(resp));
        mainMessageStore.updateButtonState('default')

        if (Boolean(resp)) {
            const responSpeech = `Here is your result!, ${resp.message}`
            console.log('responSpeech', responSpeech)
            let utterance = new SpeechSynthesisUtterance(responSpeech);
            speechSynthesis.speak(utterance);
        }
    }

    const handleText = async (text) => {
        mainMessageStore.updateButtonState('generating')
        productStore.resetProducts()
        locationStore.resetLocations()
        mainMessageStore.resetMainMessage()

        const lowercasedText = text.toLowerCase();

        if (
            lowercasedText.includes("phone")
        ) {
            console.log("text decided called productAPI")
            await productStore.fetchProducts(text, doneExecute);
            return;
        }

        if (
            lowercasedText.includes("store") &&
            lowercasedText.includes("near")
        ) {
            console.log("text decided called locationAPI")
            await locationStore.fetchLocations(doneExecute);
            return;
        }

        console.log("text decided can't mapped any API")
        setTimeout(() => {
            mainMessageStore.updateIntroMessage(
                "Sorry, this request still can't be mapped by our model yet."
            )
            doneExecute(false)
            return;
        }, 3000);
    };

    return { handleText };
}
