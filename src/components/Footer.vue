<script src="./js/footer.js"></script>

<template>
  <div class="flex flex-col p-8">
    <p class="text-gray-600">{{ transcript }}</p>
    <button
      type="button"
      class="input-button bg-indigo-500 rounded-lg text-sm py-8x min-h-14 w-full flex justify-center items-center text-white cursor-pointer"
      @click="startVoiceRecognition"
    >
      <transition name="fade" mode="out-in">
        <span v-if="buttonState.state === 'default'">
          <img
            src="@/assets/microfon-6.svg"
            alt="Microfon"
            class="mx-auto h-8"
          />
        </span>
        <span v-else-if="buttonState.state === 'listening'">
          <img
            src="@/assets/hold-listening-6.svg"
            alt="Microfon"
            class="mx-auto h-8"
          />
        </span>
        <span v-else-if="buttonState.state === 'generating'">
          <img
            src="@/assets/box-generating-6.svg"
            alt="Microfon"
            class="mx-auto h-8"
          />
        </span>
      </transition>
    </button>
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
