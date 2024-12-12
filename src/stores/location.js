// stores/location.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useLocationStore = defineStore('location', {
  state: () => ({
    introMessage: "",
    locations: [],
    userLocation: {
      latitude: null,
      longitude: null,
    },
    loading: false,
    error: null,
  }),
  actions: {
    setUserLocation(userLocation) {
      console.log('location set to', userLocation.longitute)
      this.userLocation = userLocation
    },
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userLocation.latitude = position.coords.latitude;
            this.userLocation.longitude = position.coords.longitude;
          },
          (error) => {
            console.error('Error getting location:', error.message);
          }
        )
      } else {
        throw new Error('Geolocation not supported');
      }
    },
    async fetchLocations(success = () => { }, failed = () => { }) {
      this.getUserLocation()
      console.log('get called')
      this.loading = true;
      this.error = null;
      try {
        // const response = await axios.post('http://localhost:5000/stores', {
        //   latitute: userLocation.latitute,
        //   longitute: userLocation.longitute,
        // });
        console.log(`called API http://localhost:5000/stores with ${this.userLocation.latitude}, ${this.userLocation.longitute}`)

        setTimeout(() => {

          const response = {
            message: "Certainly, here is the list of locations you requested, starting with the nearest to your location, feel free to reach out if you need more details.",
            data: [{
              name: "Blibli Store - Grand Indonesia",
              url: "https://www.google.com/maps/place/Blibli+Store+-+Grand+Indonesia/@-6.1863686,106.7987485,13z/data=!4m10!1m2!2m1!1sblibli+store+near+me!3m6!1s0x2e69f56a360b92a5:0xeed1e569f56aebff!8m2!3d-6.195556!4d106.821944!15sChRibGlibGkgc3RvcmUgbmVhciBtZSIDkAEBWhYiFGJsaWJsaSBzdG9yZSBuZWFyIG1lkgERZWxlY3Ryb25pY3Nfc3RvcmXgAQA!16s%2Fg%2F11y2mk2jps?entry=ttu&g_ep=EgoyMDI0MTIxMC4wIKXMDSoASAFQAw%3D%3D",
              image: "https://lh5.googleusercontent.com/p/AF1QipMFaiD0NQczE4NF4rfk3TUxYxBf7Ekva61aeTai=w408-h306-k-no",
              address: "East Mall - Lantai 3A No. 3A-25. Jl. M.H. Thamrin. 1, Jakarta Pusat, Jakarta, Daerah Khusus Ibukota Jakarta 10310"
            },
            {
              name: "Blibli Store - Central Park",
              url: "https://www.google.com/maps/place/Blibli+Store+-+Central+Park/@-6.195556,106.7498462,13z/data=!4m10!1m2!2m1!1sblibli+store+near+me!3m6!1s0x2e69f70de3a0a08f:0x4b0de3754efdb730!8m2!3d-6.1774285!4d106.7908648!15sChRibGlibGkgc3RvcmUgbmVhciBtZSIDkAEBWhYiFGJsaWJsaSBzdG9yZSBuZWFyIG1lkgERZWxlY3Ryb25pY3Nfc3RvcmXgAQA!16s%2Fg%2F11k9p3mkwq?entry=ttu&g_ep=EgoyMDI0MTIxMC4wIKXMDSoASAFQAw%3D%3D",
              image: "https://lh5.googleusercontent.com/p/AF1QipPJn-jALI6iFOmZnxMswcfiXG62Q8Twhbf2vXpD=w426-h240-k-no",
              address: "MALL CENTRAL PARK, Lantai, Jl. Letjen S. Parman No.kav.28 201A - 201B, Tj. Duren Sel., Kec. Grogol petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11470"
            },
            {
              name: "Blibli Store - Kota Kasablanka",
              url: "https://www.google.com/maps/place/Blibli+Store+-+Kota+Kasablanka/@-6.1806269,106.7485687,13z/data=!4m10!1m2!2m1!1sblibli+store+near+me!3m6!1s0x2e69f3d35dc93841:0xbbce33ec100d182!8m2!3d-6.2238575!4d106.8432332!15sChRibGlibGkgc3RvcmUgbmVhciBtZSIDkAEBWhYiFGJsaWJsaSBzdG9yZSBuZWFyIG1lkgEQY2VsbF9waG9uZV9zdG9yZeABAA!16s%2Fg%2F11ttb6t8nd?entry=ttu&g_ep=EgoyMDI0MTIxMC4wIKXMDSoASAFQAw%3D%3D",
              image: "https://lh5.googleusercontent.com/p/AF1QipPX9vMWtzxGUot-XQPe9_CVE19swGJhJ5ODSYoh=w408-h544-k-no",
              address: "MALL KOTA KASABLANKA, Lantai LG. 45, Jl. Raya Casablanca No.Raya Kav. 88, Menteng Dalam, Kec. Tebet, Daerah Khusus Ibukota Jakarta 12870"
            }]
          }

          this.locations = response.data
          this.introMessage = response.message
          success(response.data)

        }, 3000);
      } catch (err) {
        this.error = err.message || 'Failed to fetch locations.';
        failed(err)
      } finally {
        this.loading = false;
      }
    },
  },
});
