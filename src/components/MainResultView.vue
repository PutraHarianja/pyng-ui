<script src="./js/main-result-view.js"></script>

<template>
  <div class="flex flex-col min-h-screen bg-indigo-lightest">
    <!-- Header -->
    <div
      class="w-full items-center bg-indigo-lightest max-w-md py-6 pb-0 sticky top-0 z-10"
    >
      <img src="/pyng_logo.svg" alt="PYNG Logo" class="mx-auto h-16" />
    </div>

    <!-- Room Window -->
    <div class="w-full max-w-md flex-1 overflow-y-auto p-4">
      <!-- Result list -->
      <transition name="fade" mode="out-in">
        <div
          v-if="buttonState.state === 'generating'"
          class="flex justify-center my-10"
        >
          <img
            src="@/assets/gear-generating-colored.gif"
            alt=""
            srcset=""
            class="h-72"
          />
        </div>
        <div v-else-if="additionalMessage">
          <p class="text-red-700 my-5 text-center">
            {{ additionalMessage }}
          </p>
        </div>
        <div v-else>
          <div class="result-intro my-4">
            <span class="text-red-600 font-semibold">PYNG!!! </span> {{ introMessage }}
          </div>

          <ProductCard
            v-for="(product, index) in products"
            :key="index"
            :image="product.image_url"
            :title="product.name"
            :price="product.discounted_price"
            :originalPrice="product.original_price"
            :discount="product.discount"
            :rating="product.rating"
            :sold="product.sold_unit"
            :url="product.product_url"
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
      </transition>
    </div>
    <Footer
      class="w-full max-w-md bg-indigo-lightest text-center py-3 shadow-md sticky bottom-0 z-10"
    />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
