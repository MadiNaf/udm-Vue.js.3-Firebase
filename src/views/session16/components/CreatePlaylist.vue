<template>
  <div class="create-playlist">
    <form @submit.prevent="handleSubmit" class="mn-form">
      <h3>Create a new playlist</h3>

      <input type="text" required placeholder="playlist title" v-model='title' class="mn-input">
      <textarea required
                placeholder="playlist description..."
                v-model="description" class="mn-textarea"></textarea>

      <label>Upload playlist cover image</label>
      <input type="file" class="mn-input" @change="handleChange">
      <div class="mn-error" v-if="fileError">{{ fileError }}</div>
      <button class="lcr-button" :disabled="isPending">Create</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import { getUser } from '@/composables/useAuth'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const { filePath, url, uploadImage } = useStorage()
    const { error, addDoc } = useCollection('playlists')
    const { user } = getUser()
    const router = useRouter()
  
    const title =  ref('')
    const description = ref('')
    const file = ref(null)
    const fileError = ref(null)
    const isPending = ref(false)

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true

        await uploadImage(file.value)
        const res = await addDoc({
          title: title.value,
          description: description. value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp()
        })

        isPending.value = false
        if (!error.value) {
          router.push({name: 'PlaylistDetails', params: {id: res.id} })
        }

      }
    }

    // allowed file types
    const types = ['image/png', 'image/jpeg']

    const handleChange = (e) => {
      const seleted = e.target.files[0]
      if (seleted && types.includes(seleted.type)) {
        file.value = seleted
        fileError.value = ""
      } else {
        file.value = null
        fileError.value = "Please select an image file (png or jpeg)"
      }
    }

    return {title, description, handleSubmit, handleChange, fileError, isPending}
  }
}
</script>

<style scoped>
  .create-playlist {
    margin-top: 20px;
  }

  input[type="file"] {
    border: 0;
    padding: 0;
  }

  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
    color: var(--primary);
  }
  button {
    margin-top: 20px;
  }
</style>