<template>
  <div class="container">
    <div class="inner">
      <!-- imdbID: 콘솔로 axios를 확인했을때 영화데이터마다의 고유속성 -->
      <MovieItem 
        v-for="movie in movies"
        :key="movie.imdbID" />
    </div>
  </div>
</template>

<script>
import MovieItem from '~/components/MovieItem'

export default {
  components: {
    MovieItem
  },
  data() {
    return {
      movies: []
    }
  }
}
</script>