<template>
  <div class="container">
    <!-- 영화의 목록이 없는경우 truthy가 되고 no-result라는 클래스가 inner에
     붙으면서 메세지부분도 값이 비어저있으면 falsy이기 때문에 출력되지 않고
     v-else부분이 실행-->
    <div
      :class="{ 'no-result': !movies.length }"
      class="inner">
      <!-- 로딩 애니매이션 추가 -->
      <Loader v-if="loading" />
      <!-- 메세지라는 데이터부분의 내용이 있는 경우 메세지가 출력-->
      <div 
        v-if="message"
        class="message">
        {{ message }}
      </div>
      <!-- 메세지가 있으면 movies 가 출력되지 않고
      메세지가 없는 경우에만 movies가 출력됨 -->
      <div 
        v-else
        class="movies">
        <!-- imdbID: 콘솔로 axios를 확인했을때 영화데이터마다의 고유속성 -->
        <MovieItem 
          v-for="movie in movies"
          :key="movie.imdbID" 
          :movie="movie" />
        <!-- movies에 들어있는 각각의 아이템을 props로 MovieItem에서
        원하는 item(movie)으로 전달 -->
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from '~/components/MovieItem'
import Loader from '~/components/Loader'

export default {
  components: {
    MovieItem,
    Loader
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
    },
    message() {
      return this.$store.state.movie.message
    },
    loading() {
      return this.$store.state.movie.loading
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.container {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    &.no-result {
      padding: 70px 0;
    }
  }
  .message {
    color: $gray-400;
    font-size: 20px;
  }
  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>