import { firestoreService } from '../firebase/config'
import { ref, watchEffect } from 'vue'

const getCollection = (collection) => {
  const documents = ref(null)
  const error = ref(null)
  const isPending = ref(false)

  let collectionRef = firestoreService.collection(collection)
        .orderBy('createdAt')

  const unsub = collectionRef.onSnapshot( (snap) => {
    let result = []
    snap.docs.forEach(doc => {
      isPending.value = true
      /**
       * Si on utilise que result.push({ ...doc.data(), id: doc.id})
       * notre snapShot va correspondre à la version local crée par firebase et on aura pas de timestamp.
       * Pour éviter ça on utilise doc.data().createdAt, qui permet d'utiliser seulement la veriosn server.
       */
      doc.data().createdAt && result.push({ ...doc.data(), id: doc.id})
    })
    documents.value = result
    error.value = null
    isPending.value = false
  }, (e) => {
    console.log(e.message)
    documents.value = null
    error.value = 'Could not fetch data'
    isPending.value = false
  })

  watchEffect((onInvalidate) => {
    // Unsub from prev collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub())
  })

  return { documents, error, isPending }
}

export default getCollection