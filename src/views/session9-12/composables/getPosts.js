import { ref } from 'vue'
import { firestoreService } from '../../../firebase/config'

const getPosts = () => {

  const posts = ref([])
  const error = ref(null)

  const load = async () => {
    try {
      await firestoreService.collection('posts')
      .orderBy('createdAt', 'desc')
        .get()
          .then( data => {
            posts.value = data.docs.map( doc => {
              return {...doc.data(), id: doc.id};
            })
          })
    }
    catch(err) {
      error.value = err.message
    }
  }

  return { posts, error, load }
}

export default getPosts