import { onBeforeMount, ref, computed } from 'vue'
import Footer from "@/components/Footer.vue";
import ProductCard from "@/components/ProductCard.vue";
import LocationCard from "@/components/LocationCard.vue";
import { useProductStore } from '@/stores/product';
import { useLocationStore } from "@/stores/location";
import { useMainMessageStore } from "@/stores/mainMessage";

export default {
  components: {
    Footer,
    ProductCard,
    LocationCard
  },
  setup() {
    const productStore = useProductStore()
    const locationStore = useLocationStore()
    const mainMessageStore = useMainMessageStore()

    // Make products reactive using computed
    const products = computed(() => productStore.products)
    const locations = computed(() => locationStore.locations)
    const introMessage = computed(() =>
      locationStore.introMessage || productStore.introMessage || mainMessageStore.buttonState.wording
    )

    return {
      productStore,
      products,
      locations,
      introMessage
    }
  },
}