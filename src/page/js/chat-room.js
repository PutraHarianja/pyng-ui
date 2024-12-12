import { computed, onBeforeMount, onMounted, ref } from 'vue'
import MainResultView from "@/components/MainResultView.vue";
import EntryView from '@/components/EntryView.vue'
import { useLocationStore } from '@/stores/location';

export default {
  components: {
    MainResultView,
    EntryView
  },
  setup() {
    const isFirstLook = ref(true)

    const firstLookExpired = () => {
      isFirstLook.value = false
    }
    return {
      isFirstLook,
      firstLookExpired
    }
  },
}