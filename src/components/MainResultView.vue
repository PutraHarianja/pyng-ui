<script src="./js/main-result-view.js"></script>

<template>
  <div class="flex flex-col min-h-screen bg-indigo-lightest">
    <!-- Header -->
    <div
      class="w-full items-center bg-indigo-lightest max-w-md py-3 sticky top-0 z-10"
    >
      <img src="/pyng_logo.svg" alt="PYNG Logo" class="mx-auto h-14" />
    </div>

    <!-- Room Window -->
    <div v-if="introMessage" class="w-full max-w-md flex-1 overflow-y-auto p-4">
      <!-- Result list -->
      <div class="result-intro my-4">
        {{ introMessage }}
      </div>
      <ProductCard
        image="https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium/catalog-image/106/MTA-155967442/br-m036969-11793_ringke-silicone-magnetic-case-samsung-s24-ultra-plus-casing-magsafe_full11-78d7e797.jpg"
        title="Ringke Silicone Magnetic Case Samsung S24 Ultra Plus - Casing Magsafe"
        :price="349000"
        :originalPrice="null"
        :discount="null"
        :rating="5"
        :sold="17"
      />
      <ProductCard
        image="https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//115/MTA-95646949/hydra-_hydra-_full01.jpg"
        title="Samsung S23 PLUS - HYDRA + Privacy Anti Spy Tempered Glass-Anti Gores-TG-Frame"
        :price="79000"
        :originalPrice="150000"
        :discount="47"
        :rating="5"
        :sold="5"
      />
      <LocationCard
        v-for="(location, index) in locations"
        :key="index"
        :image="location.image"
        :locationName="location.name"
        :address="location.address"
        :url="location.url"
      />
    </div>
    <Footer
      class="w-full max-w-md bg-indigo-lightest text-center py-3 shadow-md sticky bottom-0 z-10"
    />
  </div>
</template>

<style scoped></style>
