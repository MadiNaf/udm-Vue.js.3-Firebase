import { ref } from 'vue'
import { firestoreService } from '../../../firebase/config'

const getPost = (id) => {

  const post = ref(null)
  const error = ref(null)

  const load = async () => {
    try {
      await firestoreService.collection('posts')
        .doc(id)
        .get()
          .then( res => {
            if (!res.exists) {
              throw Error('That post does not exists')
            }
            post.value = {...res.data(), id: res.id}
            console.log('data ', post)
          })
      console.log(id)
    }
    catch(err) {
      error.value = err.message
    }
  }

  return { post, error, load } 
}

export default getPost