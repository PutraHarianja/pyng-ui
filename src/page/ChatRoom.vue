<script src="./js/chat-room.js"></script>

<template>
  <div>
    <transition name="swipe-up" mode="in-out">
      <EntryView v-if="!firstLookExpired" />
      <MainResultView v-else />
    </transition>
  </div>
</template>

<style scoped>
.swipe-up-enter-active,
.swipe-up-leave-active {
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease;
}

.swipe-up-enter {
  transform: translateY(100%);
  opacity: 0;
}

.swipe-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
