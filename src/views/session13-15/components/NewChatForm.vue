<template>
  <div class="new-chat-form">
    <div class="chat-form">
      <textarea placeholder="Type a message and hit entrer to send..."
                v-model="message"
                @keypress.enter.prevent="handleSubmit">
      </textarea>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getUser } from '@/composables/useAuth'
import { timestamp } from '@/firebase/config'
import useCollection from '@/composables/useCollection'

export default {
  setup() {
    const { user } = getUser()
    const { addDoc, error } = useCollection('message')
    const message = ref('')

    const handleSubmit = async () => {
      const chat = {
        name: user.value.displayName,
        message: message.value,
        createdAt: timestamp()
      }

      await addDoc(chat)
      if(!error) {
        console.log(error)
      }

      message.value = ''
    }

    return { message, handleSubmit, addDoc, error}
  }
}
</script>


<style scoped>
.chat-form {
  width: 100% ;
}

textarea {
  display: block;
  width: 100%;
  height: 85px;
  max-width: 100%;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  font-family: inherit;
  outline: none;
  margin-bottom: -15px;
}

</style>b