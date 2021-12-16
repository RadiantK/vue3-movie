<template>
  <!-- Header는 페이지가 바뀌더라도 내용이 동일하게 출력 -->
  <Header />
  <!-- 페이지가 바뀔때마다 RouterView 출력, 헤더부분은 바뀌지 않고 동일하게 출력 -->
  <!-- 변경되는 페이지의 내용을 해당하는 RouterView라는 컴포넌트 부분에 출력 -->
  <RouterView />
  <Footer />
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
