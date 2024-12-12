<script src="./js/entry-view.js"></script>

<template>
  <div>
    <div
      class="flex flex-col p-8 h-screen w-full justify-center items-center bg-indigo-lightest"
    >
      <p class="text-gray-600 mb-4">{{ transcript }}</p>
      <div
        class="input-button bg-indigo-500 rounded-full text-sm py-8x min-h-10 flex justify-center items-center text-white aspect-square w-3/4"
        @click="startVoiceRecognition"
      >
        <div>
          <img
            v-if="buttonState.state === 'default'"
            src="@/assets/microphone-colored.gif"
            alt=""
            srcset=""
            class="h-60"
          />
          <img
            v-else-if="buttonState.state === 'listening'"
            src="@/assets/ear-listening-colored.gif"
            alt=""
            srcset=""
            class="h-60"
          />
          <img
            v-else-if="buttonState.state === 'generating'"
            src="@/assets/gear-generating-colored.gif"
            alt=""
            srcset=""
            class="h-60"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-button {
  aspect-ratio: 0.95 / 1;
}
</style>
