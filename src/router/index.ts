import { createRouter, createWebHistory, RouteRecordRaw, Router } from 'vue-router'
import routes from 'virtual:generated-pages'
import { useClientStore, useUserStore } from '@/store'
console.log('路由=>', routes)

routes.push({
  path: '/',
  redirect: '/login',
})
//导入生成的路由数据
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const clientStore = await useClientStore()
  const userStore = await useUserStore()
  if (to && to.query && to.query.location) {
    const location = JSON.parse(to.query.location + '')
    userStore.setLocation(location)
  }
  if (to && to.query && to.query.uid) {
    userStore.setUid(parseInt(to.query.uid + ''))
  }
  if (to.query.isNgw && from.fullPath === '/') {
    clientStore.setIsNgw(true)
  }
  if (to.query.token && from.fullPath === '/') {
    clientStore.setToken(to.query.token + '')
    // window.sessionStorage.setItem('token', to.query.token + '')
  }

  return true
})

export default router
