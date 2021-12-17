<template>
  <Headline />
  <Search />
  <MovieList />
</template>

<script>
import Headline from '~/components/Headline'
import Search from '~/components/Search'
import MovieList from '~/components/MovieList'

export default {
  components: {
    Headline,
    Search,
    MovieList
  },
  // Home페이지가 열릴때마다 라이프사이클이 동작되고 스토어의 데이터가 초기화됨
  created() {
    this.$store.commit('movie/resetMovies')
  }
}
</script>