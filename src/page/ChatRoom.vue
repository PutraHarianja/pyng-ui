<script src="./js/chat-room.js"></script>

<template>
  <div>
    <EntryView v-if="isFirstLook" @click="firstLookExpired"/>
    <MainResultView v-else/>
  </div>
</template>

<style scoped></style>
