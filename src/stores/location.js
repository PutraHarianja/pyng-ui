// stores/location.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useLocationStore = defineStore('location', {
  state: () => ({
    introMessage: "",
    locations: [],
    userLocation: {
      latitude: 0,
      longitude: 0,
    },
    loading: false,
    error: null,
  }),
  actions: {
    getUserLocation() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.userLocation.latitude = position.coords.latitude || 0
              this.userLocation.longitude = position.coords.longitude || 0
              resolve(this.userLocation)
            },
            (error) => {
              console.error('Error getting location:', error.message);
              reject(error)
            }
          );
        } else {
          reject(new Error('Geolocation not supported')) // Reject if geolocation isn't supported
        }
      });
    },
    async fetchLocations(success = () => { }, failed = () => { }) {
      console.log(`called API http://localhost:5000/stores with ${this.userLocation.latitude}, ${this.userLocation.longitude}`)
      this.loading = true
      this.error = null
      try {
        // await this.getUserLocation()
        const response = await axios.post('http://localhost:5000/stores', {
          latitute: this.userLocation.latitude,
          longitute: this.userLocation.longitude,
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log(response)

        console.log(`called API http://localhost:5000/stores with ${this.userLocation.latitude}, ${this.userLocation.longitude}`)

        // setTimeout(() => {

        //   const response = {
        //     message: "Certainly, here is the list of locations you requested, starting with the nearest to your location, feel free to reach out if you need more details.",
        //     data: [{
        //       name: "Blibli Store - Grand Indonesia",
        //       url: "https://www.google.com/maps/place/Blibli+Store+-+Grand+Indonesia",
        //       image: "https://lh5.googleusercontent.com/p/AF1QipMFaiD0NQczE4NF4rfk3TUxYxBf7Ekva61aeTai=w408-h306-k-no",
        //       address: "East Mall - Lantai 3A No. 3A-25. Jl. M.H. Thamrin. 1, Jakarta Pusat, Jakarta, Daerah Khusus Ibukota Jakarta 10310"
        //     },
        //     {
        //       name: "Blibli Store - Central Park",
        //       url: "https://www.google.com/maps/place/Blibli+Store+-+Central+Park",
        //       image: "https://lh5.googleusercontent.com/p/AF1QipPJn-jALI6iFOmZnxMswcfiXG62Q8Twhbf2vXpD=w426-h240-k-no",
        //       address: "MALL CENTRAL PARK, Lantai, Jl. Letjen S. Parman No.kav.28 201A - 201B, Tj. Duren Sel., Kec. Grogol petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11470"
        //     },
        //     {
        //       name: "Blibli Store - Kota Kasablanka",
        //       url: "https://www.google.com/maps/place/Blibli+Store+-+Kota+Kasablanka",
        //       image: "https://lh5.googleusercontent.com/p/AF1QipPX9vMWtzxGUot-XQPe9_CVE19swGJhJ5ODSYoh=w408-h544-k-no",
        //       address: "MALL KOTA KASABLANKA, Lantai LG. 45, Jl. Raya Casablanca No.Raya Kav. 88, Menteng Dalam, Kec. Tebet, Daerah Khusus Ibukota Jakarta 12870"
        //     }]
        //   };

          this.locations = response.data.data
          this.introMessage = response.data.message
          success(response.data)

        // }, 3000)

      } catch (err) {
        this.error = err.message || 'Failed to fetch locations.';
        failed(err)
      } finally {
        this.loading = false;
      }
    },

    resetLocations() {
      this.introMessage = ''
      this.locations = []
    }

  },
});
