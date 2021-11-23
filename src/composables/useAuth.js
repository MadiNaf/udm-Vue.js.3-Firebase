import { ref } from 'vue'
import { firebaseAuth } from '../firebase/config'

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, displayName) => {
  error.value = null
  isPending.value = true

  try {
    const res = await firebaseAuth.createUserWithEmailAndPassword(email, password)
    if (!res) {
      throw new Error('Could not complete the signup')
    }
    await res.user.updateProfile({ displayName })
    error.value = null
    isPending.value = false
    return res
  } catch(err) {
    console.log(err)
    error.value = err.message
    isPending.value = false
    // The email address is already in use by another account. (auth/email-already-in-use).
    // Firebase: Password should be at least 6 characters (auth/weak-password).
  }
}

const useSignup = () => {
  return {error, signup, isPending}
}
// *********************************************************************************
const login = async (email, password) => {
  error.value = null
  isPending.value = true
  try {
    const res = await firebaseAuth.signInWithEmailAndPassword(email, password)
    error.value = null
    isPending.value = false
    return res
  } catch(err) {
    error.value = 'Incorrect login credentials.'
    isPending.value = false
  }
}

const useLogin = () => {
  return {error, login}
}

// *********************************************************************************
const logout = async () =>  {
  error.value = null
  isPending.value = true
  try {
    const res = await firebaseAuth.signOut()
    error.value = null
    isPending.value = false
    return res
  } catch (err) {
    error.value = err.message
    isPending.value = false
  }
}

const useLogout = () => {
  return {error, logout}
}

// *********************************************************************************
const user = ref()

firebaseAuth.onAuthStateChanged((_user) => {
  user.value = _user
})
const getUser = () => {
  return { user }
}

export { useSignup, useLogin, useLogout, getUser }