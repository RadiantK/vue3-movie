// 스토어 구성 진행

// vuex의 패키지에서 내용을 가져옴
import { createStore } from 'vuex'
import movie from './movie.js'
import about from './about.js'

export default createStore({
  // movie, about 등의 여러가지 데이터 타입들의 모듈이 연결
  modules: {
    movie,
    about
  }
})