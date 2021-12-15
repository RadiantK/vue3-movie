// movie.js 영화 검색과 관련되어 있는 데이터를 취급하는 용도

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
  getters: {
    movieIds(state) {
      return state.movies.map((m) => m.imdbID)
    }
  },
  // (methods!) 각각의 함수를 만들어서 movie.js에 있는 데이터 활용
  // (변이라는뜻) 관리하는 데이터들(state)을 변경시켜줄 수 있음
  // mutations를 제외한 다른vue.js의 컴포넌트에서 변경은 불가능
  // store는 어디에서든 사용할 수 있기때문에 모든 컴포넌트에서 수정할 수
  // 있게되면 관리가 어려워지기 때문에 데이터관리의 복잡성을 줄여주기 위해서
  // mutations에서만 데이터 변경 가능
  // 기본적으로는 스토어의 데이터를 변경시켜주는 용도의 메서드만 정의
  mutations: {
    resetMovies(state) {
      state.movies = []
    }
  },
  // (methods!). 각각의 함수를 만들어서 movie.js에 있는 데이터 활용
  // 비동기. async await를 안붙여도 비동기로 동작함
  actions: {
    // searchMovies({ state, getters, commit}) {
      // context.state
      // context.getters
      // context.commit
      searchMovies() {

    }
  }
}