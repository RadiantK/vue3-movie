<template>
  <div class="container">
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <!-- props를 Html에서 작성할땐 데쉬케이스 사용 -->
      <Loader 
        :size="3"
        :z-index="9"
        fixed />
    </template>
    <div 
      v-else 
      class="movie-details">
      <div 
        :style="{ backgroundImage: `url(${theMovie.Poster})` }"
        class="poster"></div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <!-- 영화의 출시년도 -->
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          <!-- 영화의 간단한 줄거리 -->
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3>
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3>
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  computed: {
    theMovie() {
      return this.$store.state.movie.theMovie
    },
    loading() {
      return this.$store.state.movie.loading
    }
  },
  // 라이프사이클 추가, 컴포넌트가 생성된 직후
  created() {
    console.log(this.$route)
    this.$store.dispatch('movie/searchMovieWithId', {
      // movie/tt4520988에서 tt4520988값을 id로 지정, 주소의 파라마터의 id
      id: this.$route.params.id
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.container {
  padding-top: 40px;
}
.skeletons {
  display: flex;
  .poster {
    // 감소너비 사용x, 화면이 줄어도 포스터는 감소하지 않음
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3 / 2;
    margin-right: 70px;
  }
  .specs {
    // 증가너비를 최대한 많이 사용할 수 있게 해줌
    flex-grow: 1;
  }
  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;
    &.title {
      width: 80%;
      height: 70px;
    }
    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }
    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }
  }
}
.movie-details {
  display: flex;
  color: $gray-600;
  .poster {
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3 / 2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover;
    background-position: center;
  }
  .specs {
    flex-grow: 1;
    .title {
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }
    .labels {
      color: $primary;
      span {
        &::after {
          // 점표기법
          content: "\00b7";
          margin: 0 6px;
        }
        &:last-child::after {
          // 마지막점표기는 화면에 안보이게 출력
          display: none;
        }
      }
    }
    .plot {
      margin-top: 20px
    }
    // .ratings {

    // }
    h3 {
      margin: 24px 0 6px;
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 20px;
    }
  }
}
</style>