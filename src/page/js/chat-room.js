import { computed, onMounted, ref } from 'vue'
import MainResultView from "@/components/MainResultView.vue";
import EntryView from '@/components/EntryView.vue'

export default {
  components: {
    MainResultView,
    EntryView
  },
  setup() {
    const isFirstLook = ref(true)
    const userLocation = ref(null);
    const locationError = ref(null)

    const firstLookExpired = () => {
      isFirstLook.value = false
    }

    const getUserLocation = async () => {
      if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              resolve({ latitude, longitude });
            },
            (error) => {
              console.error('Error getting location:', error.message);
              reject(error);
            }
          );
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
        throw new Error('Geolocation not supported');
      }
    };
    
    onMounted(async () => {
      setTimeout(() => {
        firstLookExpired()
      }, 5000);  

      try {
        const location = await getUserLocation();
        userLocation.value = location;
        console.log('User location:', location);
      } catch (error) {
        locationError.value = error.message;
        console.error('Failed to get user location:', error.message);
      }
    })
    return {
      isFirstLook,
      firstLookExpired
    }
  },
}