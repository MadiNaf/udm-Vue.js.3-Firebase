import { ref } from 'vue'
import { firebaseStorage } from '../firebase/config'
import { getUser } from './useAuth'

const { user } = getUser()

const useStorage = () => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`
    const storageRef = firebaseStorage.ref(filePath.value)

    try {
      const res = await storageRef.put(file)
      url.value = await res.ref.getDownloadURL()
    } catch (e) {
      console.log(e.message)
      error.value = e.message
    }
  }

  const deleteImage = async (path) => {
    const storageRef = firebaseStorage.ref(path);

    try {
      await storageRef.delete()
    } catch (err) {
      console.log(err.message)
      error.value = err
    }
  }

  return { url, filePath, error, uploadImage, deleteImage}
}

export default useStorage