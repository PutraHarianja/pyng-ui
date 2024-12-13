<script src="./js/product-card.js"></script>

<template>
  <div
    class="flex border rounded-lg shadow-sm p-3 mb-4 bg-white cursor-pointer"
    @click="onCardClicked"
  >
    <!-- Left: Image -->
    <img :src="image" alt="Product" class="w-32 h-32 object-cover rounded-md" />

    <!-- Right: Content -->
    <div class="ml-4 flex flex-col flex-1">
      <!-- Title -->
      <h2 class="text-xs font-medium text-gray-800 leading-tight">
        {{ title }}
      </h2>
      <!-- Price & Discount -->
      <div class="flex items-center mt-2">
        <span class="text-indigo-600 font-medium text-base">
          Rp{{ price }}
        </span>
        <span
          v-if="originalPrice"
          class="text-gray-400 text-xs font-normal line-through ml-2"
        >
          Rp{{ originalPrice }}
        </span>
        <span
          v-if="discount"
          class="ml-2 text-xs text-red-500 font-semibold bg-red-300 rounded-sm"
        >
          {{ discount }}%
        </span>
      </div>
      <!-- Rating & Sales -->
      <div class="flex items-center mt-2 text-xs text-gray-600">
        <div class="flex items-center">
          <span class="text-yellow-500">&#9733;</span>
          <span class="ml-1 font-light">{{ rating }}</span>
        </div>
        <span class="ml-2 font-light">~Terjual {{ sold }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
