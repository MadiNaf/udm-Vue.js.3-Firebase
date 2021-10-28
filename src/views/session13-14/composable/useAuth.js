import { ref } from 'vue'
import { firebaseAuth } from '../../../firebase/config'

const error = ref(null)

const signup = async (email, password, displayName) => {
  error.value = null

  try {
    const res = await firebaseAuth.createUserWithEmailAndPassword(email, password)
    if (!res) {
      throw new Error('Could not complete the signup')
    }
    await res.user.updateProfile({ displayName })
    error.value = null

    return res
  } catch(err) {
    console.log(err)
    error.value = err.message
    // The email address is already in use by another account. (auth/email-already-in-use).
    // Firebase: Password should be at least 6 characters (auth/weak-password).
  }
}

const useSignup = () => {
  return {error, signup}
}
// *********************************************************************************
const login = async (email, password) => {
  error.value = null
  try {
    const res = await firebaseAuth.signInWithEmailAndPassword(email, password)
    error.value = null
    return res
  } catch(err) {
    error.value = 'Incorrect login credentials.'
  }
}

const useLogin = () => {
  return {error, login}
}

// *********************************************************************************
const logout = async () =>  {
  error.value = null
  try {
    const res = await firebaseAuth.signOut()
    error.value = null
    return res
  } catch (err) {
    error.value = err.message
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