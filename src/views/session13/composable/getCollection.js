import { ref, watchEffect } from 'vue'
import { firestoreService } from '../../../firebase/config'

const getCollection = (collection) => {
  const documents = ref(null)
  const error = ref(null)

  let collectionRef = firestoreService.collection(collection)
        .orderBy('createdAt')

  const unsub = collectionRef.onSnapshot( (snap) => {
    let result = []
    snap.docs.forEach(doc => {
      /**
       * Si on utilise que result.push({ ...doc.data(), id: doc.id})
       * notre snapShot va correspondre à la version local crée par firebase et on aura pas de timestamp.
       * Pour éviter ça on utilise doc.data().createdAt, qui permet d'utiliser seulement la veriosn server.
       */
      doc.data().createdAt && result.push({ ...doc.data(), id: doc.id})
    })
    documents.value = result
    error.value = null
  }, (e) => {
    console.log(e.message)
    documents.value = null
    error.value = 'Could not fetch data'
  })

  watchEffect((onInvalidate) => {
    // Unsub from prev collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub())
  })

  return { documents, error }
}

export default getCollection