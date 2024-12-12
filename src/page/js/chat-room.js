import { computed, onBeforeMount, onMounted, ref } from 'vue'
import MainResultView from "@/components/MainResultView.vue";
import EntryView from '@/components/EntryView.vue'
import { useMainMessageStore } from '@/stores/mainMessage';

export default {
  components: {
    MainResultView,
    EntryView
  },
  setup() {
    const mainMessageStore = useMainMessageStore()

    const firstLookExpired = computed(() => {
      return mainMessageStore.firstViewExpired
    })

    return {
      firstLookExpired
    }
  },
}