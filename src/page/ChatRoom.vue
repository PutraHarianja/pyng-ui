<script src="./js/chat-room.js"></script>

<template>
  <div>
    <EntryView v-if="!firstLookExpired" />
    <MainResultView v-else />
  </div>
</template>

<style scoped></style>
