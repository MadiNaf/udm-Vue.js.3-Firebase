<template>
  <div class="add-song">
    <button v-if="!showForm" class="lcr-button" @click="showForm = true">Add songs</button>
    <form v-if="showForm" class="mn-form" @submit.prevent="handleSubmit">
      <input type="text" class="mn-input" placeholder="Song title" v-model="title">
      <input type="text" class="mn-input" placeholder="Artist" v-model="artist">
      <button class="lcr-button">Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '@/composables/useDocument'

export default {
  props: ['playlist'],
  setup(props) {
    const title = ref('')
    const artist = ref('')
    const showForm = ref('')
    const { updateDoc } = useDocument('playlists', props.playlist.id)

    const handleSubmit = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 1000000)
      }
      await updateDoc({
        songs: [...props.playlist.songs, newSong]
      })

      showForm.value = false
      title.value = ''
      artist.value = ''
      console.log(newSong)
    }
    return {title, artist, showForm, handleSubmit}
  }
}
</script>

<style scoped>
  .add-song {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .add-song form {
    width: 100%;
  }
</style>