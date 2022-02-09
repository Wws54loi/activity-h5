import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import routes from 'virtual:generated-pages'

import { getToken } from '../utils/auth';




console.log('路由=>',routes);

routes.push({
  path: '/',
  redirect: '/login',
});
//导入生成的路由数据
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
