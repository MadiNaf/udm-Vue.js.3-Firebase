<template>
  <div class="mn-content">
    <h3 class="title">
      <span>
        <router-link :to="{name: 'CreatePlaylist'}">Create playlist</router-link>
      </span>
       <span>
        <router-link :to="{name: 'UserPlaylist'}">My playlist</router-link>
      </span>
    </h3>
    <div v-if="error" class="mn-error">Can not fetch data</div>
    <section v-if="documents">
      <ListView :playlists="documents" />
    </section>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import ListView from './components/ListView.vue'

export default {
  name: 'MusoNinja',
  components: { ListView },
  setup() {
    const { error, documents } = getCollection('playlists')

    return { error, documents}
  }
}
</script>

<style scoped>
  span {
    background: #ff8800;
    margin-left: 12px;
    padding: 6px;
    border-radius: 20px;
  }
</style>