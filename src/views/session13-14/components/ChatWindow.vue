<template>
  <div class="chat-window">
    <section v-if="error">
      <p class="error">{{ error }}</p>
    </section>
    <section v-if="documents" class="messages" ref="messages">
      <div v-for="(doc, index) in formattedDocuments"
          :key="doc.id"
          :class="getClass(index)">
        <div :class="doc.name === user.displayName ? rightMsg : leftMsg">
          <p>
            <span class="created-at"> {{ doc.createdAt }} </span>
            <span class="name"> {{ doc.name}} </span>
            <span class="message"> {{ doc.message }} </span>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import getCollection from '../composable/getCollection'
import { getUser } from '../composable/useAuth'
import { formatDistanceToNow } from 'date-fns'
import { computed, onUpdated, ref } from 'vue'

export default {
  setup() {
    const { error, documents} = getCollection('message')
    const { user } = getUser()
  
    const leftMsg = ref('left-message')
    const rightMsg = ref('right-message')

    const formattedDocuments = computed(() => {
      if(documents.value) {
        return documents.value.map(doc => {
          let time = formatDistanceToNow(doc.createdAt.toDate())
          return { ...doc, createdAt: time}
        })
      }
      return []
    })

    // auto-scroll to bottom of messages
    const messages = ref(null)
    onUpdated(() => {
      messages.value.scrollTop = messages.value.scrollHeight
    })

    const getClass = (i) => {
      return i%2 === 0? 'single-chat' : 'odd-message single-chat'
    }

    return {error, documents, formattedDocuments, messages, leftMsg, rightMsg, user, getClass}
  }  
}
</script>

<style scoped>
  .chat-window {
    background: #fafafa;
    padding: 30px 20px;
  }
  .single-chat {
    margin: 2px 0;
    padding: 10px 20px;
  }
  .created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .name {
    font-weight: bold;
    margin-right: 6px;
  }
  .messages {
    max-height: 400px;
    overflow: auto;
  }

  .right-message {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .left-message {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .odd-message {
    background: #eeeeee;
  }
</style>