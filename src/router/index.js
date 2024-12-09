import { createMemoryHistory, createRouter } from 'vue-router'

import ChatRoom from '../page/ChatRoom.vue'

const routes = [
  { path: '/', component: ChatRoom }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router