import { createRouter, createWebHistory } from 'vue-router'
import TheVueCLI from '../views/session3/TheVueCLI.vue'
import ReactionTimer from '../views/session4/ReactionTimer.vue'
import WebForms from '../views/session5/WebForms.vue'
import ProjectPlanner from '../views/session6-7-8/ProjectPlanner.vue'
import EditProject from '../views/session6-7-8/components/EditProject.vue'
import DojoBlog from '../views/session9-10-11-12/DojoBlog.vue'
import Details from '../views/session9-10-11-12/components/Details.vue'
import Tag from '../views/session9-10-11-12/components/Tag.vue'
import Create from '../views/session9-10-11-12/components/Create.vue'
import LiveChatRoom from '../views/session13/LiveChatRoom.vue'
import Chatroom from '../views/session13/components/Chatroom'
import { firebaseAuth } from '../firebase/config'

// auth guard
const requiredAuth = (to, from, next) => {
  let user = firebaseAuth.currentUser
  if (!user) {
    next({name: 'LiveChatRoom'})
  } else {
    next()
  }
}

const requireNoAuth = (to, form, next) => {
  let user = firebaseAuth.currentUser
  console.log('user :: ', user)
  if(user) {
    next({name: 'Chatroom'})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TheVueCLI
  },
  {
    path: '/the-vue-cli',
    name: 'TheVueCLI',
    component: TheVueCLI
  },
  {
    path: '/reaction-timer',
    name: 'ReactionTimer',
    component: ReactionTimer
  },
  {
    path: '/web-forms',
    name: 'WebForms',
    component: WebForms
  },
  {
    path: '/project-planner',
    name: 'ProjectPlanner',
    component: ProjectPlanner
  },
  {
    path: '/project-planner/edit-project/:id',
    name: 'EditProject',
    component: EditProject,
    props: true
  },
  {
    path: '/dojo-blog',
    name: 'DojoBlog',
    component: DojoBlog
  },
  {
    path: '/dojo-blog/posts/:id',
    name: 'Details',
    component: Details,
    props: true
  },
  {
    path: '/dojo-blog/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/dojo-blog/tags/:tag',
    name: 'Tag',
    component: Tag
  },
  {
    path: '/live-chat-room',
    name: 'LiveChatRoom',
    component: LiveChatRoom,
    beforeEnter: requireNoAuth
  },
  {
    path: '/chat-room',
    name: 'Chatroom',
    component: Chatroom,
    beforeEnter: requiredAuth
  }
  // redirect
  // {
  //   path: '/all-jobs',
  //   redirect: '/jobs'
  // },
  // 404 catchall
  // {
  //   path: '/:catchAll(.*)',
  //   name: 'NotFound',
  //   component: NotFound
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router