import { ref } from 'vue'
import { firestoreService } from '../firebase/config'

const useCollection = (collection) => {
  const error = ref(null)
  const isPending = ref(false)

  const addDoc = async (doc) => {
    error.value = null
    isPending.value = true
    try {
      await firestoreService.collection(collection).add(doc)
      isPending.value = false
    } catch(e) {
      console.log(e.message)
      error.value = 'Could not send the message'
      isPending.value = false
    }
  }

  return {error, addDoc, isPending}
}

export default useCollection