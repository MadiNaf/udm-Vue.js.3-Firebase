import { createRouter, createWebHistory } from 'vue-router'
import ReactionTimer from '../views/session1-4/ReactionTimer.vue'
import ProjectPlanner from '../views/session5-8/ProjectPlanner.vue'
import EditProject from '../views/session5-8/components/EditProject.vue'
import DojoBlog from '../views/session9-12/DojoBlog.vue'
import Details from '../views/session9-12/components/Details.vue'
import Tag from '../views/session9-12/components/Tag.vue'
import Create from '../views/session9-12/components/Create.vue'
import LiveChatRoom from '../views/session13-15/LiveChatRoom.vue'
import Chatroom from '../views/session13-15/components/Chatroom'
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
  /** ************** Chapter 1 to 4 ************** */
  {
    path: '/',
    name: 'Home',
    component: ReactionTimer
  },
  {
    path: '/reaction-timer',
    name: 'ReactionTimer',
    component: ReactionTimer
  },
    /** ************** Chapter 5 to 8 ************** */
  {
    path: '/project-planner',
    name: 'ProjectPlanner',
    component: ProjectPlanner
  },
  {
    path: '/project-planner/edit-project/:id',
    name: 'EditProject',
    component: EditProject,
    props: true,
    beforeEnter: requiredAuth
  },
  /** ************** Chapter 9 to 12 ************** */
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
    component: Create,
    beforeEnter: requiredAuth
  },
  {
    path: '/dojo-blog/tags/:tag',
    name: 'Tag',
    component: Tag
  },
  /** ************** Chapter 13 to 15 ************** */
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
  },
  // redirect
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  },
    /** ************** Chapter 16 to ... ************** */
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