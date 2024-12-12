import { defineComponent, toRefs } from "vue";

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
  },
  setup(props) {
    // Use `toRefs` to make props reactive
    const { image, locationName, address } = toRefs(props);

    return {
      image,
      locationName,
      address,
    };
  },
});