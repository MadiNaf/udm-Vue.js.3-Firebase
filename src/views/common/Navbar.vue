<template>
  <div id="navbar">
    <nav>
      <ul>
        <li class="nav-logo">
          <img src="@/assets/vue-firebase.jpg" alt="vue-firebse-logos" srcset="">
        </li>
        <li v-for="chapter in chapters"
            :key="chapter.id"
            class="nav-item"
            :class="{'active': chapter.id === selected}"
            @click="moveTo(chapter.id)">
          <router-link :to="{ name: chapter.route }">{{ chapter.item }}</router-link>
        </li>
      </ul>

      <ul v-if="user">
        <li class="nav-item" @click="handleLogout">
          <span class="material-icons logout">logout</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useLogout, getUser } from '@/composables/useAuth'
import { ref } from 'vue'

export default {
  name: 'Navbar',
  setup() {
    const { logout } = useLogout()
    const { user } = getUser()

    const selected = ref(0)
    const chapters = ref([
            {id: 'a', item: 'Chapter 1...4', route: 'ReactionTimer'},
            {id: 'c', item: 'Chapter 5...8', route: 'ProjectPlanner'},
            {id: 'd', item: 'Chapter 9...12', route: 'DojoBlog'},
            {id: 'e', item: 'Chapter 13..15', route: 'LiveChatRoom'},
            {id: 'f', item: 'Chapter 16', route: 'MusoNinja'}
          ])

    const moveTo = (id) => {
      selected.value = id
    }

    const handleLogout = async () => {
      await logout()
    }
    return { selected, chapters, moveTo, handleLogout, user }
  }
}
</script>

<style scoped>
  #navbar {
    margin-top: 0;
  }
  nav {
    background-color: #212F3C;
    height: 50px;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
  }

  ul {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-logo img{
    margin-left: 10px;
    width: 80px;
  }
  .nav-item {
    display: flex;
    align-items: center;
    list-style: none;
    font-size: 14px;
    font-weight: 700;
    height: 50px;
    padding-right: 10px;
    padding-left: 10px;
    margin-left: 1px;
    margin-right: 1px;
    cursor: pointer;
    color: #F7F9F9;
  }

  .nav-item:hover, .nav-item.active{
    background-color: #F7F9F9;
  }

  .nav-item:hover a,
  .nav-item.active a{
    color: #212F3C;
  }

  .logout {
    list-style: none;
    color: #ff3f80;
  }
</style>