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
    }

    const handleText = async (text) => {
        mainMessageStore.updateButtonState('generating')
        const lowercasedText = text.toLowerCase();

        if (
            lowercasedText.includes("product") &&
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
        mainMessageStore.updateIntroMessage(
            "Sorry, this request is not mapped to our model."
        )
        doneExecute(false)
        return;
    };

    return { handleText };
}
