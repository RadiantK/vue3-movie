<template>
  <div class="container">
    <input
      v-model="title"
      class="form-control"
      type="text"
      placeholder="Search for Movies, Series & more"
      @keyup.enter="apply" />
    <!-- enter키를 누르면 apply라는 메서드 실행 -->
    <div class="selects">
      <!-- filters라는 3개의 아이템을 가지는 배열데이터로 반복출력.
        v-model이라는 양방향 데이터 바인딩을 제공하느 디렉티브를 통해서
        $data를 통해 지정한 data()안에 접근해서 %data.type같은 식을 접근하고
        .type라는 동적데이터를 관리하기위해서 $data[]로 표기하면 
        .type처럼 점표기법으로 이해해서 데이터의 속성들을 표기함 -->
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select">
        <!-- data의 years는 초기값이 ''이기 때문에
        자동으로 All Years라는 글자가 들어감 
        filter.name이 year일 때만 All Years가 들어감 -->
        <option 
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20 ,30]
        },
        {
          name: 'year',
          items: (() => {
            const years = [];
            const thisYear = new Date().getFullYear(); // 올해 년도 반환
            for(let i = thisYear; i >=1985; i -= 1) {
              years.push(i);
            }
            return years;
          })()
        }
      ]
    }
  },
  methods: {
    async apply() {
      // store의 Mutations를 실행할 때 .commit() 메소드 사용
      // store의 Actions를 실행할 때 .dispatch() 메소드 사용
      // movie라는 스토어에 접근해서 searchMovies 실행.

      // index.js 에서 사용한 모듈에 연결한 movie
      this.$store.dispatch('movie/searchMovies', {
        // payload의 데이터 전달
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  display: flex;
  > * { // 컨테이너의 모든 자식 요소들
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    // flex-item이 감소되지않게 해줌(Apply버튼)
    flex-shrink: 0;
  }
  // 뷰포트의 크기가 라지사이즈보다 작으면 플렉스아이템들을 다시 수직으로 바꿈
  @include media-breakpoint-down(lg) {
    display: block;
    input {
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects {
      margin-right: 0;
      margin-bottom: 10px;
      select {
        width: 100%;
      }
    }
    .btn {
    width: 100%;
    } 
  }
}
</style>