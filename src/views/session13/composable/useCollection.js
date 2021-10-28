import { ref } from 'vue'
import { firestoreService } from '../../../firebase/config'

const useCollection = (collection) => {
  const error = ref(null)

  const addDoc = async (doc) => {
    error.value = null
    try {
      await firestoreService.collection(collection).add(doc)
    } catch(e) {
      console.log(e.message)
      error.value = 'Could not send the message'
    }
  }

  return {error, addDoc}
}

export default useCollection