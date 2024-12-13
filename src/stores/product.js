// stores/product.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', {
  state: () => ({
    introMessage: '',
    products: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProducts(userText, success = () => { }, failed = () => { }) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post('http://localhost:5000/products', {
          userText,
        }, {
            headers: {
              'Content-Type': 'application/json'
            }
        })

        // setTimeout(() => {

        //   const response = {
        //     data: {
        //       message: "As requested, here is a list of our products tailored to your needs",
        //       data: [
        //         {
        //           category: "ANDROID",
        //           discounted_price: 4679000,
        //           image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-170050885/xiaomi_official_xiaomi_poco_f6_8-256gb_12-512gb_-_snapdragon_8s_gen_3_-_liquidcool_technology_4-0_dengan_iceloop_-_layar_amoled_crystalres_120hz_flow_full01_ehbgo093.jpg?w=392",
        //           name: "Official Xiaomi POCO F6 8/256GB 12/512GB | Snapdragon 8s Gen 3 | LiquidCool Technology 4.0 dengan IceLoop | Layar AMOLED CrystalRes 120Hz Flow",
        //           original_price: 4999000,
        //           productId: 1,
        //           product_url: "https://www.blibli.com/p/official-xiaomi-poco-f6-8-256gb-12-512gb-snapdragon-8s-gen-3-liquidcool-technology-4-0-dengan-iceloop-layar-amoled-crystalres-120hz-flow/ps--XIO-60022-01059?ds=XIO-60022-01059-00003",
        //          rating: 4.9,
        //          sold_unit: 4700,
        //          discount_percentage: 10
        //         },
        //         {
        //           category: "ANDROID",
        //           discounted_price: 7933630,
        //           image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-178577315/xiaomi_xiaomi_14t_pro_-12-256-_-12-512-_-_leica_summilux_optical_lens_-_light_fusion_900_image_sensor_-mediatek_dimensity_9300-_-_144hz_ai_display_-_5000mah_full01_f138qt6c.jpg?w=355",
        //           name: "Xiaomi 14T Pro (12/256) (12/512) | Leica Summilux optical lens | Light Fusion 900 image sensor |MediaTek Dimensity 9300+ | 144Hz AI display | 5000mAh",
        //           original_price: 8499000,
        //           productId: 3,
        //           product_url: "https://www.blibli.com/p/xiaomi-14t-pro-12-256-12-512-leica-summilux-optical-lens-light-fusion-900-image-sensor-mediatek-dimensity-9300-144hz-ai-display-5000mah/ps--XIO-60022-01099?ds=XIO-60022-01099-00001",
        //           rating: 4.7,
        //           sold_unit: 931,
        //          discount_percentage: 10
        //         },
        //         {
        //           category: "ANDROID",
        //           discounted_price: 1128000,
        //           image_url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-155779754/xiaomi_xiaomi_redmi_a3_-4gb-128gb-_-_layar_muluz_90_hz_-_sensor_sidik_jari_-_face_unlock_-_desain_inovatif_-official_store-_full01_ilrz1ofx.jpg?w=355",
        //           name: "Xiaomi Redmi A3 (4GB/128GB) | Layar Muluz 90 Hz | Sensor Sidik Jari & Face Unlock | Desain Inovatif [Official Store]",
        //           original_price: 1199000,
        //           productId: 5,
        //           product_url: "https://www.blibli.com/p/xiaomi-redmi-a3-4gb-128gb-layar-muluz-90-hz-sensor-sidik-jari-face-unlock-desain-inovatif-official-store/ps--XIO-60022-01000?ds=XIO-60022-01000-00002",
        //           rating: 4.9,
        //           sold_unit: 984,
        //          discount_percentage: 10
        //         }
        //       ]
        //     }
        //   }

          this.introMessage = response.data.message
          this.products = response.data.data

          success(response.data)

        // }, 3000)
      } catch (err) {
        this.error = err.message || 'Failed to fetch products.';
        failed(err)
      } finally {
        this.loading = false;
      }
    },
    resetProducts() {
      this.introMessage = ''
      this.products = []
    }
  },
});
