<script src="./js/location-card.js"></script>

<template>
  <div class="border rounded-lg shadow-md bg-white overflow-hidden mb-4">
    <!-- Top: Image -->
    <div class="relative w-full h-24">
      <img :src="image" alt="Location" class="w-full h-full object-cover" />
    </div>

    <!-- Bottom: Content -->
    <div class="p-3">
      <!-- Location Name -->
      <h2 class="text-sm font-bold text-gray-800 leading-tight">
        {{ locationName }}
      </h2>
      <!-- Address -->
      <p class="text-sm text-gray-600 mt-1">
        {{ address }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
