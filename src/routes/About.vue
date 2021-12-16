<template>
  <div class="about">
    <div class="photo">
      <Loader 
        v-if="imageLoading"
        absolute />
      <img
        :src="image"
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ github }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '~/components/Loader'

export default {
  componentS: {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    // 첫번째 인수 : 모듈의 이름을 명시(스토어),
    // 두번째 인수 : 배열데이터로 상태데이터들의 이름을 명시
    ...mapState('about', [
      'image',
      'name',
      'github',
      'blog',
      'phone'
    ])
    // 위의코드로 단순화시킴
    // image() {
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.name
    // },
    // email() {
    //    return this.$store.state.about.email
    // },
    // github() {
    //    return this.$store.state.about.github
    // },
    // phone() {
    //    return this.$store.state.about.phone
    // }
  },
  // 라이프사이클에선 비동기를 사용할 수 없음
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>

.about {
  text-align: center;
  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img {
      width: 100%;
    }
    .name {
      font-size: 40px;
      font-family: "Oswald", sans-serif;
      margin-bottom: 20px;
    }
  }
}
</style>