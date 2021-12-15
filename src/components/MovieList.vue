<template>
  <div class="container">
    <div class="inner">
      <!-- imdbID: 콘솔로 axios를 확인했을때 영화데이터마다의 고유속성 -->
      <MovieItem 
        v-for="movie in movies"
        :key="movie.imdbID" 
        :movie="movie" />
        <!-- movies에 들어있는 각각의 아이템을 props로 MovieItem으로
        원하는 item(movie)으로 전달 -->
    </div>
  </div>
</template>

<script>
import MovieItem from '~/components/MovieItem'

export default {
  components: {
    MovieItem
  },
  computed: {
    // moive.js의 state에 있는 movie[] 빈배열 데이터가 searchMovies()가
    // 동작해서 정보를 가지고 있는 새로운 데이터로 갱신되면 반응성이 유지된
    // 상태로 MovieList라는 컴포넌트에서 활용되어야하므로 계산된 데이터를
    // 처리하는 computed옵션에 정의
    movies() {
      // store에 접근해서 state라는 상태중에 movie라는 모듈을 사용하고있고
      // movies라는 실제 데이터를 가져와서 활용하겠다.
      return this.$store.state.movie.movies
    }
  }
}
</script>