import { firestoreService } from '../firebase/config'
import { ref, watchEffect } from 'vue'

const getDocument = (collection, id) => {
  const document = ref(null)
  const error = ref(null)
  const isPending = ref(false)

  // register the firestore collection reference
  let documentRef = firestoreService.collection(collection).doc(id)

  const unsub = documentRef.onSnapshot( (doc) => {
    if (doc) {
      document.value = {...doc.data(), id: doc.id}
      error.value = null
    }

    isPending.value = false
  }, (e) => {
    console.log(e.message)
    document.value = null
    error.value = 'That document does not exist'
    isPending.value = false
  })

  watchEffect((onInvalidate) => {
    // Unsub from prev collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub())
  })

  return { document, error, isPending }
}

export default getDocument