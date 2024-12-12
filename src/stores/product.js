// stores/product.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', {
  state: () => ({
    introMessage: '',
    products: [], // Holds the fetched products
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProducts(userText) {
      this.loading = true;
      this.error = null;
      try {
        // const response = await axios.post('http://localhost:5000/products', {
        //   userText,
        // });
        console.log('userText', userText)
        const response = {
          message: "balala",
          data: ["balala"]
        }

        this.introMessage = response.message
        this.products = response.data
      } catch (err) {
        this.error = err.message || 'Failed to fetch products.';
      } finally {
        this.loading = false;
      }
    },
  },
});
