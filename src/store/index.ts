import { createPinia } from 'pinia'
import { useAppStore } from './modules/app'
import { useUserStore } from './modules/user'
import { useClientStore } from './modules/client'

const pinia = createPinia()

export { useAppStore, useUserStore,useClientStore }
export default pinia
