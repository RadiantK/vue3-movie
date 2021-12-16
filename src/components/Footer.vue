<template>
  <footer>
    <Logo />
    <a 
      href="https://github.com/RadiantK" 
      target="_blank">
      (c){{ new Date().getFullYear() }} RadiantK</a>
  </footer>
</template>

<script>
import Logo from '~/components/Logo'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
footer {
  padding: 70px 0;
  text-align: center;
  opacity: .4;
  // RouterLink라는 데이터는 a태그이고 인라인요소라서 수평으로 쌓이므로
  // display:block; 으로 수직으로 쌓이도록 바꿔줌
  .logo {
    display: block;
    margin-bottom: 4px;
  }
}
</style>