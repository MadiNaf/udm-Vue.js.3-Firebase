<template>
  <div id="dojo-blog">
    <h3 class="title">Dojo blog (The composition API)</h3>
    <section>
      <BlogNavbar />
    </section>
    <section>
      <div v-if="error">{{ error }}</div>
      <div v-if="posts.length">
        <PostList :posts="posts" />
        <TagCloud :posts="posts" />
      </div>
      <div v-else>
        <Spinner />
      </div>
    </section>
  </div>
</template>
<script>
import getPosts from './composables/getPosts.js'

// component imports
import PostList from './components/PostList.vue'
import Spinner from './components/Spinner.vue'
import TagCloud from './components/TagCloud.vue'
import BlogNavbar from './components/BlogNavbar.vue'

export default {
  name: 'DojoBlog',
    components: { PostList, Spinner, TagCloud, BlogNavbar },
  setup() { 
    const { posts, error, load } = getPosts()

    load()
    
    return { posts, error }
  },
};
</script>
<style>
  #dojo-blog {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
  .layout {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 20px;
  }</style>
