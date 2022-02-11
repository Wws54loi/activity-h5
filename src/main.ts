import { createApp } from 'vue'
import App from './App.vue'
import 'dsbridge'
import router from './router'
import piniaStore from './store'
import './index.css'
import './common/jssdk'
// 埋点
import { core } from '@/common/point'

// 支持SVG
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(router).use(piniaStore).mount('#app')

app.provide('$point', core)
