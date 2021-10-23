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
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      selected: 0,
      chapters: [
        {id: 'a', item: 'Chapter 1...3', route: 'TheVueCLI'},
        {id: 'b', item: 'Chapter 4', route: 'ReactionTimer'},
        {id: 'c', item: 'Chapter 5', route: 'WebForms'},
        {id: 'd', item: 'Chapter 6...8', route: 'ProjectPlanner'},
        {id: 'e', item: 'Chapter 9...12', route: 'DojoBlog'},
        {id: 'f', item: 'Chapter 13', route: 'LiveChatRoom'}
      ]
    }
  },
  methods: {
    moveTo(id) {
      this.selected = id
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


</style>