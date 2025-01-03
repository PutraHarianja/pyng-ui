import { defineComponent, toRefs, computed } from "vue";

export default defineComponent({
  name: "LocationCard",
  props: {
    image: {
      type: String,
      required: true,
    },
    locationName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { image, locationName, address, url } = toRefs(props);

    const cardClicked = () => {
      window.open(url.value, '_blank');
    }

    return {
      image,
      locationName,
      address,

      // method
      cardClicked
    };
  },
});