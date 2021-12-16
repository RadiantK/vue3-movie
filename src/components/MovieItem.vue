<template>
  <!-- 영화 아이디 중복부분 확인 -->
  <!-- <div>{{ movie.imdbID }}</div> -->

  <div 
    :style="{ backgroundImage: `url(${movie.Poster})` }"
    class="movie">
    <Loader 
      v-if="imageLoading" 
      :size="1.5" 
      absolute />
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
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
  props: {
    movie: {
      type: Object,
      // 참조형 데이터는 가변할 수 있기때문에 기본값을 함수로 지정
      default: () => ({})
    }
  },
  data() {
    return {
      imageLoading: true
    }
  },
  // HTML 요소를 다룰때는 mounted를 사용
  // 컴포넌트가 HTML이 연결된 직후
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$loadImage(this.movie.Poster)
      this.imageLoading = false
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.movie {
  $width: 200px;
  width: $width;
  height: $width * 3 / 2;
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size: cover;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  // 부모요소를 기준으로 가상요소를 만들어서 태두리 선을 만들어냄
  &:hover::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 6px solid $primary;
  }
  .info {
    background-color: rgba($black, .3);
    width: 100%;
    padding: 14px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
    backdrop-filter: blur(10px);
    .year {
      color: $primary;
    }
    .title {
      color: $white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>