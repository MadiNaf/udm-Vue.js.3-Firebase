<template>
  <div class="live-chat-room"  id="live-chat-room">
    <section class="lcr-container signup">
      <div>
        <p class="text-center">Welcome</p>

        <div v-if="showLogin" class="form-container">
          <h2 class="text-center">Login</h2>
          <LoginForm @login="enterChat" />
          <p>No account yet? <span @click="showLogin = false">signup</span> instead</p>
        </div>

        <div v-else class="form-container">
          <h2 class="text-center">Signup</h2>
          <SignupForm @signup="enterChat" />
          <p>Already registered? <span @click="showLogin = true">Login</span> instead</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import SignupForm from './components/SignupForm.vue'
import LoginForm from './components/LoginForm.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'LiveChatRoom',
  components: { SignupForm, LoginForm },
  setup() {
    const showLogin = ref(true)
    const router = useRouter()
  
    const enterChat = () => {
      router.push({ name: 'Chatroom'})
    }


    return { showLogin, enterChat }
  }
}
</script>

<style>
  #lvie-caht-room {
    text-align: center;
    padding: 20px;
  }

  .text-center {
    text-align: center;
  }

  .form-container {
    margin-top: 15px; 
  }
  #live-chat-room form {
    width: 300px;
    margin: 20px 0 10px;
  }

  #live-chat-room input {
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #EEE;
    outline: none;
    color: #999;
    margin: 10px auto;
  }

  #live-chat-room span {
    cursor: pointer;
    text-decoration: underline;
    font-weight: bold;
  }

  #live-chat-room button { 
    margin: 20px auto;
  }
</style>
