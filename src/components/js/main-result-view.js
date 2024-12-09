import { onBeforeMount, ref, computed } from 'vue'
import Footer from "@/components/Footer.vue";
import ProductCard from "@/components/ProductCard.vue";
import LocationCard from "@/components/LocationCard.vue";
import { useProductStore } from '@/stores/product';
import { useLocationStore } from "@/stores/location";

export default {
  components: {
    Footer,
    ProductCard,
    LocationCard
  },
  setup() {
    const productStore = useProductStore()
    const locationStore = useLocationStore()

    // Make products reactive using computed
    const products = computed(() => productStore.products)
    const locations = computed(() => locationStore.locations)
    const introMessage = computed(() =>
      locationStore.introMessage || productStore.introMessage || ''
    )

    const userText = ref('')

    const fetchProducts = () => {
      productStore.fetchProducts(userText.value)
    };

    onBeforeMount(() => {
      fetchProducts()
    })
    return {
      productStore,
      products,
      locations,
      introMessage
    }
  },
}