import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// CSS for the live chat room
import './assets/common.css'

// firebase auth
import { firebaseAuth } from './firebase/config'

let app

// waiting for firebase auth to initialize
firebaseAuth.onAuthStateChanged(() => {
  if(!app) {
    app = createApp(App)
      .use(router)
      .mount('#app')
  }
})


