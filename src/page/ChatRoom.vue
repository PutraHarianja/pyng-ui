<script src="./js/chat-room.js"></script>

<template>
  <div>
    <EntryView v-if="isFirstLook" @firstLookExpired="firstLookExpired" />
    <MainResultView v-else />
  </div>
</template>

<style scoped></style>
