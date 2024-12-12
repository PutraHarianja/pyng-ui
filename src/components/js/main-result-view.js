import { onMounted, ref } from 'vue'
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
    const locations = useLocationStore().locations
    const introMessage = useLocationStore().introMessage || productStore.introMessage || ''

    const userText = ref('')

    const fetchProducts = () => {
      productStore.fetchProducts(userText.value);
    };

    onMounted(() => {
      fetchProducts()
    })
    return {
      productStore,
      locations,
      introMessage
    }
  },
}