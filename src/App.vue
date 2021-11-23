<template>
  <div class="home">
    <navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './views/common/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
* {
  margin: 0;
}
body {
  background-color: #f2f2f2;
  color: #34495E;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f2f2f2;
}

a {
    text-decoration: none;
    color: #F7F9F9;
}

.title {
  text-align: center;
  font-size: 16px;
  margin-top: 15px;
  margin-bottom: 12px;
}
.title-info {
  text-align: center;
  font-size: 14px;
  margin-bottom: 15px;
  font-style: italic;
}
</style>
