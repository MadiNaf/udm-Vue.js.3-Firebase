<template>
  <div id="navbar">
    <nav>
      <ul>
        <li v-for="chapter in chapters"
            :key="chapter.id"
            class="nav-item"
            :class="{'active': chapter.id === selected}"
            @click="moveTo(chapter.id)">
          <router-link :to="{ name: chapter.route }">{{ chapter.item }}</router-link>
        </li>
      </ul>

      <ul>
        <li class="nav-item" @click="logout()">
          <span class="material-icons logout">logout</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useLogout, getUser } from '@/composables/useAuth'

export default {
  name: 'Navbar',
  data() {
    return {
      selected: 0,
      chapters: [
        {id: 'a', item: 'Chapter 1...4', route: 'ReactionTimer'},
        {id: 'c', item: 'Chapter 5...8', route: 'ProjectPlanner'},
        {id: 'd', item: 'Chapter 9...12', route: 'DojoBlog'},
        {id: 'e', item: 'Chapter 13..15', route: 'LiveChatRoom'},
        {id: 'f', item: 'Chapter 16', route: 'MusoNinja'}
      ],
      isConnected: false
    }
  },
  mounted() {
    const { user } = getUser()
    this.isConnected = user.value ? true : false 
  },
  updated() {
    const { user } = getUser()
    this.isConnected = user.value ? true : false  
  },
  methods: {
    moveTo(id) {
      this.selected = id
    }, 
    logout() {
      const { logout } = useLogout()
      const handleClick = async () => {
        await logout()
        this.isConnected =  false
      }
      handleClick()
    }
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
    color: #da0f41;
  }
</style>