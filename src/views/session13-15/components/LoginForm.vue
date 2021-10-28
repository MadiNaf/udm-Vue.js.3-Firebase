<template>
  <form @submit.prevent="handleSubmit" v-if="!isPending">
    <input type="email" required placeholder="email" v-model="email">
    <input type="password" required placeholder="password" v-model="password">
    <div class="error">{{ error }}</div>
    <button class="lcr-button">Log in</button>
  </form>
  <div class="loading-container" v-if="isPending">
    <Spinner />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useLogin } from '@/composables/useAuth'
import Spinner from '../../session9-12/components/Spinner.vue'

export default {
  components: { Spinner },
  setup(props, context) {
    const email = ref('')
    const password = ref('')

    const { error, login, isPending } = useLogin()

    const handleSubmit = async () => {
      await login(email.value, password.value)
      if(!error.value) {
        context.emit('login')
      }
    }

    return { email, password, handleSubmit, error, isPending}
  }
}
</script>