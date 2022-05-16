import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/homeView.vue')
  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/searchView.vue')
  },
  {
    path: '/collect',
    name: 'Collect',
    component: () => import(/* webpackChunkName: "todo" */ '@/views/collectView.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import(/* webpackChunkName: "luckdraw" */ '@/views/mineView.vue')
  },
  {
    path: '/address/list',
    name: 'Address',
    component: () => import(/* webpackChunkName: "address" */ '@/views/address/AddressList')
  },
  {
    path: '/address/edit',
    name: 'AddressEdit',
    component: () => import(/* webpackChunkName: "address" */ '@/views/address/AddressEdit')
  },
  {
    path: '/chat/list',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "chatpage" */ '@/views/chat')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
