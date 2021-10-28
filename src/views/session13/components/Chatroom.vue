<template>
  <div class="chat-room">
    <section class="lcr-container">
      <div class="chat-container">
        <NavLiveChat />
        <ChatWindow />
        <NewChatForm />
      </div>
    </section>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import NavLiveChat from './NavLiveChat.vue'
import { getUser } from '../composable/useAuth'
import { watch } from 'vue'
import NewChatForm from './NewChatForm.vue'
import ChatWindow from './ChatWindow.vue'

export default {
  components: { NavLiveChat, NewChatForm, ChatWindow },
  setup() {
    const { user } = getUser()
    const router = useRouter()

    watch(user, () => {
      if (!user.value) {
        router.push({name: 'LiveChatRoom'})
      }
    })
    return {}
  }
}
</script>

<style>
  .chat-container {
    width: 100%;
  }
</style>

