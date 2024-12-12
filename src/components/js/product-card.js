import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "ProductCard",
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    discount: {
      type: Number,
      default: null,
    },
    rating: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    url: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { image, title, price, originalPrice, discount, rating, sold, url } = toRefs(props)

    const onCardClicked = () => {
      window.open(url.value, '_blank')
    }

    return {
      image,
      title,
      price,
      originalPrice,
      discount,
      rating,
      sold,

      onCardClicked
    }
  }
})