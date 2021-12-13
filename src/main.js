import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.js'

// use: 현재 프로젝트에 특정한 플러그인을 연결할 때 사용
createApp(App)
.use(router)
.mount('#app')