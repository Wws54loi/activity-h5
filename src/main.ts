import { createApp } from 'vue'
import App from './App.vue'
import 'dsbridge'
import router from './router'
import piniaStore from './store'
import './index.css'
import './common/jssdk';

// 支持SVG
// import 'virtual:svg-icons-register'
createApp(App).use(router).use(piniaStore).mount('#app')
