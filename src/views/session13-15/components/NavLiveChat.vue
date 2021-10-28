<template>
  <div class="nav-live-chat">
    <nav v-if="user">
      <div>
        <p>Hey there {{ user.displayName }}</p>
        <p class="email"> {{ user.email }} </p>
      </div>

      <button class="lcr-button" @click="handleClick">Logout</button>
    </nav>
  </div>
</template>

<script>
import { useLogout, getUser } from '@/composables/useAuth'

export default {
  name: 'NavLiveChat',
  setup() {
    const { logout, error } = useLogout()
    const { user } = getUser()

    const handleClick = async () => {
      await logout()
      if(!error.value) {
        console.log('user logout')
      }
    }

    return { handleClick, user }
  }
}
</script>

<style scoped>
  .nav-live-chat {
    width: 900px;
  }
  nav {
    widows: 100%;
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav p {
    margin: 2px auto;
    font-size: 16px;
    color: #444
  }

  nav p.email {
    font-size: 14px;
    color: #999
  }
</style>