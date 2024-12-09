<script src="./js/footer.js"></script>

<template>
  <div class="flex flex-col p-8">
    <p class="mt-5 text-gray-600">{{ transcript }}</p>
    <button
      type="button"
      class="input-button bg-indigo-500 text-sm py-8x min-h-10 w-full flex justify-center items-center text-white"
      @click="startVoiceRecognition"
    >
      Click to ask
    </button>
  </div>
</template>

<style scoped>
.input-button {
  border-radius: 0.5rem;
}
</style>
