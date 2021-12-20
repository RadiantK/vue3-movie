import { createApp } from 'vue'
import App from './App.vue'
// 특정한 폴더에 있는 index파일을 가져올 때는 생략 가능 './routes/index.js'
// 파일 이름이 index.?? 가 아니면 명시해줘야함
import router from './routes/index.js'
import store from './store'
import loadImage from './plugins/loadImage'

// use: 현재 프로젝트(vue.js)에 특정한 플러그인, 라이브러리를 연결할 때 사용
createApp(App)
.use(router) // $route, $router
.use(store) // $store
.use(loadImage)
.mount('#app')