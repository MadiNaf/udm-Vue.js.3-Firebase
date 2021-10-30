<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-container">

    <!-- Playlist information -->
    <section class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl">
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
    </section>

    <!-- song list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">No song yet</div>
      <section v-for="song in playlist.songs" :key="song.id">
        <div class="single-song">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
          <button v-if="ownership" @click="handleDeleteSong(song.id)">Delete</button>
        </div>
      </section>
      <AddSong v-if="ownership" :playlist="playlist" />
    </div>
    
  </div>
</template>

<script>
import getDocument from '@/composables/getDocument'
import useDocument from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'
import { getUser } from '@/composables/useAuth'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AddSong from './AddSong.vue'

export default {
  props: ['id'],
  components: { AddSong },
  setup(props) {
    const { error, document: playlist } = getDocument('playlists', props.id)
    const { deleteDoc, updateDoc } = useDocument('playlists', props.id)
    const { deleteImage } = useStorage()
    const { user } = getUser()
    const router = useRouter()

    const ownership = computed(() => {
      return playlist.value 
        && user.value 
        && user.value.uid == playlist.value.userId
    })

    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath)
      await deleteDoc()
      router.push({name: 'MusoNinja'})
    }

    const handleDeleteSong = async (id) => {
      const songs = playlist.value.songs.filter((song) => song.id != id)
      await updateDoc({ songs })
    }

    return { error, playlist, ownership, handleDelete, handleDeleteSong }
  }
}
</script>

<style scoped>
  .playlist-container {
    display: flex;
    justify-content: space-around;
    margin-top: 35px;
  }

  .playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    padding: 1px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

  }
  .cover img {
    width: 300px;
    height: 90%;
  }
  .playlist-info {
    text-align: center;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: center;
  }

  button {
    background: var(--warning);
    border-radius: 20px;
  }

  .song-list {
    text-align: center;
    width: 45%;
  }

  .single-song {
    text-align: left;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px dashed var(--primary);
    margin-bottom: 20px;
  }
</style>
