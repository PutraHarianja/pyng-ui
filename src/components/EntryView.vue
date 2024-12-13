<script src="./js/entry-view.js"></script>

<template>
  <div
    class="flex flex-col p-8 h-screen w-full justify-center items-center bg-indigo-lightest"
  >
    <h1 class="font-bold text-3xl text-center antialiased mb-8">
      <transition name="roll" mode="out-in">
        <span v-if="showFirst" key="first">
          Hello! Let's Shooping with <span class="text-red-500">PYNG!!!</span>
        </span>
        <span v-else key="second">
          Let’s shop smarter with <span class="text-red-500">PYNG!!!</span>
        </span>
      </transition>
    </h1>
    <p v-if="transcript" class="text-gray-600 mb-5 text-center">
      {{ transcript }}
    </p>
    <div
      class="input-button bg-indigo-500 rounded-full text-sm py-8x min-h-10 flex justify-center items-center text-white aspect-square w-3/4 cursor-pointer"
      @click="startVoiceRecognition"
    >
      <div>
        <transition name="fade-anim" mode="out-in">
          <img
            v-if="buttonState.state === 'default'"
            src="@/assets/microphone-colored.gif"
            alt="Microphone-icon"
            class="h-60"
          />
          <img
            v-else-if="buttonState.state === 'listening'"
            src="@/assets/ear-listening-colored.gif"
            alt="Ear icon"
            class="h-60"
          />
          <img
            v-else-if="buttonState.state === 'generating'"
            src="@/assets/gear-generating-colored.gif"
            alt="Gear Icon"
            srcset=""
            class="h-60"
          />
        </transition>
      </div>
    </div>
    <p v-if="additionalMessage" class="text-red-700 my-5 text-center">
      {{ additionalMessage }}
    </p>
  </div>
</template>

<style scoped>
.input-button {
  aspect-ratio: 0.95 / 1;
}
.roll-enter-active,
.roll-leave-active {
  transition: transform 2s ease, opacity 2s ease;
}

.roll-enter {
  transform: translateY(100%);
  opacity: 0;
}

.roll-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* animation transition */
.fade-anim-enter-active,
.fade-anim-leave-active {
  transition: opacity 0.5s ease;
}

.fade-anim-enter,
.fade-anim-leave-to {
  opacity: 0;
}
</style>
