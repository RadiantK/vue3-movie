// movie.js 영화 검색과 관련되어 있는 데이터를 취급하는 용도

import axios from 'axios'

export default {
  // (module!) movie.js가 하나의 스토어에서 module화되서 사용될 수 있다는 명시
  namespaced: true,
  // (data!) 우리가 실제로 취급해야하는 데이터들(스토어에선 상태라고 함)
  state: function () {
    return {
      movies: []
    }
  },
  // (computed!) state부분의 실제 데이터를 특정하게 계산해서
  // 새로운 데이터 형식으로 만들때 사용 (계산된 상태)
  // 이번 영화예제에선 따로 사용 x
  // getters: {
  //   movieIds(state) {
  //     return state.movies.map((m) => m.imdbID)
  //   }
  // },
  getters: {},
  // (methods!) 각각의 함수를 만들어서 movie.js에 있는 데이터 활용
  // (변이라는뜻) 관리하는 데이터들(state)을 변경시켜줄 수 있음
  // mutations를 제외한 다른vue.js의 컴포넌트에서 변경은 불가능
  // store는 어디에서든 사용할 수 있기때문에 모든 컴포넌트에서 수정할 수
  // 있게되면 관리가 어려워지기 때문에 데이터관리의 복잡성을 줄여주기 위해서
  // mutations에서만 데이터 변경 가능
  // 기본적으로는 스토어의 데이터를 변경시켜주는 용도의 메서드만 정의
  mutations: {
    // 통합적으로 state의 데이터들을 갱신할수 있는 로직
    // (state 데이터에 접근할 수 있는 매개변수,
    //  payload 특정 데이터를 받아서 갱신)
    updateState(state, payload) {
      // Object.keys: 객체데이터의 속성의 이름들을 새로운 배열로 반환
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },
  // (methods!). 각각의 함수를 만들어서 movie.js에 있는 데이터 활용
  // 비동기. async await를 안붙여도 비동기로 동작함
  // state의 데이터를 직접적으로는 가져올 수 없음
  actions: {
      // store의 각멤버 state, getters, mutations를 활용할 수 있게 context제공
      // searchMovies가 실행될 때 인수로 들어온 특정 데이터들을 payload로 받아줄 수 있음
      // context.commit를 객체구조분해 매개변수에 {commit}
      async searchMovies({ state, commit }, payload) {
        const { title, type, number, year } = payload
      const OMDB_API_KEY = '7035c60c';
      // https 확인할것
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      // console.log(res);
      // omdb.api의 데이터 Search, totalResults
      const { Search, totalResults } = res.data
      // updateState()가 실행될때 하나의 객체데이터가 payload라는 
      // updateState()의 매개변수로 들어감
      commit('updateState', {
        movies: Search
      })
      console.log(totalResults); // 297 10개씩 나타나기때문에 30번검색
      console.log(typeof totalResults); // string

      // 10진법의 숫자로 정수로 만들어서 total에 할당
      const total = parseInt(totalResults, 10); 
      const pageLength = Math.ceil(total / 10);

      // 영화의 개수가 10개 이상이 될 때 추가 요청
      if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page += 1) {
          if (page > (number / 10)) {
            break;
          }
          const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
          const { Search } = res.data
          commit('updateState', {
            // 새로운 요청이 들어갈 때마다 새로운 배열데이터를 만들어서 movies에 할당
            movies: [...state.movies, ...Search]
          })
        }
      }
    }
  }
}
// store의 Mutations를 실행할 때 .commit() 메소드 사용
// store의 Actions를 실행할 때 .dispatch() 메소드 사용