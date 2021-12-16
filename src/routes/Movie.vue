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
        :style="{ backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)})` }"
        class="poster">
        <Loader 
          v-if="imageLoading" 
          absolute />
          <!-- 부모요소의 포지션값 꼭 확인 -->
      </div>
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
        <!-- 영화의 평가 -->
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <!-- theMovie에 들어있는 Ratings라는 3개객체데이터를 
            갖는 배열데이터 출력 -->
            <div 
              v-for="{ Source: name, Value: score } in theMovie.Ratings"
              :key="name"
              :title="name"
              class="rating">
              <img 
                :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`"  
                :alt="name" />
              <span>{{ score }}</span>
            </div>
          </div>
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
  data() {
    return {
      imageLoading: true
    }
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
  },
  methods: {
    // 이미지의 사이즈 변경
    requestDiffSizeImage(url, size = 700) {
      if (!url || url === 'N/A') {
        this.imageLoading = false
        // 영화의 포스터가 없거나 해당사항이 없는경우 로딩표시를 종료하고
        // 빈문자열을 반환해서 이미지에 아무것도 표시되지 않도록함
        // 리턴에 아무값을 주지않으면 undefined가 출력되므로 빈문자 출력
        return ''
      }
      // 첫번째 인수의 사이즈를 두번째 인수로 교체
      const src = url.replace('SX300', `SX${size}`)
      this.$loadImage(src)
        .then(()=> {
          this.imageLoading = false
        })
        //이미지의 사이즈를 교체한 뒤 로딩표시가 나와야하기때문에
        // async await 말고 .then 사용(로직의 흐름 방해없이 비동기 처리)
        // 비동기 함수가 실행되고 나서 처리가 완료되면 then이 실행되는데
        // return은 별개이기때문에 이미지가 바뀌면 내용이들어가는 변수src는
        // 그것과 별개로 바로 리턴됨
      return src
    }
  }
}
</script>

<style lang="scss" scoped>

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
    position: relative;
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
    .ratings {
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;
          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      margin: 24px 0 6px;
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 20px;
    }
  }
  // 뷰포트가 xl사이즈보다 작을 때 실행
  @include media-breakpoint-down(xl) {
    .poster {
      width: 300px;
      height: 300px * 3 / 2;
      margin-right: 40px;
    }
  }
  // 뷰포트가 lg사이즈보다 작아지만 수평출력을 수직 출력으로
  @include media-breakpoint-down(lg) {
    display: block;
    .poster {
      margin-bottom: 40px;
    }
  }
  @include media-breakpoint-down(md) {
    .specs {
      .title {
        font-size: 50px;
      }
      .ratings {
        .rating-wrap {
          display: block;
          .rating {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>