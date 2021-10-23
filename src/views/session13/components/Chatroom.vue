<template>
  <div class="chat-room">
    <section class="lcr-container">
      <NavLiveChat />
    </section>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import NavLiveChat from './NavLiveChat.vue'
import { getUser } from '../composable/useAuth'
import { watch } from 'vue'

export default {
  components: { NavLiveChat },
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
