<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <!-- navigations라는 아이템을 반복적으로 출력하고 각각아이템을 nav로 활용 -->
      <!-- :key 각각의 아이템이 고유하다는 의미 -->
      <div 
        v-for="nav in navigations" 
        :key="nav.name"
        class="nav-item">
        <!-- to는 링크의 대상 경로를 나타냄 -->
        <!-- active-class는 router-active-class가 기본값으로 되어있는데
        값을 active로 변경해서 부트스트랩과 같을 수 있게 사용 -->
        <RouterLink
          :to="nav.href"
          active-class="active"
          :class="{ active: isMatch(nav.path) }"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
        <!-- RouterLink => a태그 대신 사용 -->
        <!-- RouterLink라는 컴포넌트로 현재페이지가 어떤 네비게이션 부분에서
        활성화가 될 수 있는지에 대한 내용을 클래스를 부여하는 것으로 확인 가능 -->
      </div>
    </div>
    <!-- 화면 우측상단에 로고 띄우기 -->
    <!-- RouterLink를 써도 되지만 다른방법 @click로 해보기 -->
    <div 
      class="user" 
      @click="toAbout">
      <img 
        :src="image" 
        :alt="name" />
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          // 메인페이지에 해당하는 경로 '/'
          href: '/' 
        },
        {
          name: 'Movie',
          href: '/movie/tt4520988',
          // /movie로 시작하는 경로인 경우 일치하겠다.
          path: /^\/movie/
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  computed: {
    ...mapState('about', [
      'image',
      'name'
    ]),
    // ...mapState('movie', [ // 응용
    //   'movies',
    //   'loading',
    //   'message',
    //   'theMovie'
    // ])
    // image() {
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.name
    // }
  },
  methods: {
    // /movie와 일치하면 내비게이션 버튼을 활성화해줌
    isMatch(path) {
      // this.image mapState로 배열데이터로 상태를 정의하면 이런식으로 접근가능
      // this.name
      if (!path) {
        return false
      }
      console.log(this.$route)
      return path.test(this.$route.fullPath)
    },
    toAbout() {
      console.log('!!!')
      // 특정한 로직을 처리하고 나서 다른페이지로 이동
      this.$router.push('/about')
    }
  }
}
</script>

<style lang="scss" scoped>

header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo {
    margin-right: 40px;
  }
  .user {
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover {
      background-color: darken($gray-200, 10%);
    }
    img {
      width: 100%;
    }
  }
  // 뷰포트의 크기가 sm사이즈보다 작을때 nav 사라지게 만들기
  @include media-breakpoint-down(sm) {
    .nav {
      display: none;
    }
  }
}

</style>