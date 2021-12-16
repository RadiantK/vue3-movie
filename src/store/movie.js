// movie.js 영화 검색과 관련되어 있는 데이터를 취급하는 용도

import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  // (module!) movie.js가 하나의 스토어에서 module화되서 사용될 수 있다는 명시
  namespaced: true,
  // (data!) 우리가 실제로 취급해야하는 데이터들(스토어에선 상태라고 함)
  state: function () {
    return {
      movies: [],
      message: 'Search for the movie title!',
      loading: false, // 기본값으로 로딩이 되고있지 않은 값
      theMovie: {} // 영화의 상세정보
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
      // commit, state가 context 내부에 들어있기때문에 객체구조분해를 통해
      // 매개변수에 할당 {state, commit}
    async searchMovies({ state, commit }, payload) {  
      // 처음 loading 값은 false이고 조건문이 실행되지않고 아래로 내려가서
      // 로직이 동작하게 되고, 목록을 가져오는 행위가 끝나기전에 사용자가 
      // 검색(enter)을 남발해서 searchMovies를 또 동작시키면 로딩값은 true가
      // 되어져 있는 상태에서 return문이 실행되면서 함수를 실행하지않음
      // searchMovies를 동시에 여러번 실행시키는것을 방지
      if (state.loadding) {
        return
      }

      commit('updateState', {
        // 검색이 시작되면 기본값이 지워지고 메세지가 초기화 되도록 함
        message: '',
        // 검색을 시작하면 로딩 애니매이션이 실행
        loading: true
      })

      try {
      // https 확인할것
      // 영화 정보 요청
      const res = await _fetchMovie({
        // 아래에 정의한 _fetchMovie에 객체구조분해를 한것이 page를 제외하고는
        // 정의되어 있기 때문에, 추가적으로 필요한 page의 내용만 정의.
        ...payload,
        page: 1
      })
      // console.log(res);
      // omdb.api의 데이터 Search, totalResults
      const { Search, totalResults } = res.data
      // updateState()가 실행될때 하나의 객체데이터가 payload라는 
      // updateState()의 매개변수로 들어감
      commit('updateState', {
        // Search로 검색한 영화명을 imdbID로 고유화
        movies: _uniqBy(Search, 'imdbID')
        })
        console.log(totalResults); // 297 10개씩 나타나기때문에 30번검색
        console.log(typeof totalResults); // string

        // 10진법의 숫자로 정수로 만들어서 total에 할당
        const total = parseInt(totalResults, 10); 
        const pageLength = Math.ceil(total / 10);

        // 영화의 개수가 10개 이상이 될 때 추가 요청
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            if (page > (payload.number / 10)) {
            break;
            }
            const res = await _fetchMovie({
              ...payload,
              page: page
            })
            const { Search } = res.data
            commit('updateState', {
              // 새로운 요청이 들어갈 때마다 새로운 배열데이터를 만들어서 movies에 할당
              movies: [
               ...state.movies, 
               ..._uniqBy(Search, 'imdbID')
              ]
            })
          }
        }
      } catch (message) {
        commit('updateState', {
          // 검색된 내용이 있는데 에러가 발생하면 movies 초기화
          movies: [],
          message: message
        })
      } finally {
        commit('updateState', {
          // loading데이터를 검색이 완료되면 검색이 되지않는 값으로 바꿔줌
          loading: false
        })
      }
    },
    // 영화 하나의 상세정보
    async searchMovieWithId({ state, commit }, payload) {
      if (state.loading) {
        return
      }
      commit('updateState',{
        // 기존에 검색된 영화의 상세목록이 잠깐이라도 화면에 출력되는걸 방지
        theMovie: {},
        loading: true
      })
      try {
        // payload를 통해 id 영화의 imdbID라는 고유값을 가져옴
        const res = await _fetchMovie(payload)
        console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })              
        // console.log(res) //영화 상세정보 
      } catch (error) {
        commit('updateState', {
          // 영화의 상세정보를 가져오지 못하면 빈객체상태로 만듬
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}
// store의 Mutations를 실행할 때 .commit() 메소드 사용
// store의 Actions를 실행할 때 .dispatch() 메소드 사용

// _fetchMovie 현재파일인 moive.js 내부에서만 처리됨
function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload;
  const OMDB_API_KEY = '7035c60c'
  // 삼항연산자로 id라는 속성에 데이터가 있으면 단일영화정보의 상세내용을
  // 없으면 다수의 영화정보를 가져옴
  const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  // 영화 에러발생 확인해본 코드 내용
  // const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`
  
  return new Promise((resolve, reject) => {
    axios.get(url)
    .then((res)=> {
      // console.log(res) 에러 데이터 확인
      if (res.data.Error) {
        reject(res.data.Error)
      }
      resolve(res)
    })
    .catch((err) => {
      reject(err.message)
    })
  })
}