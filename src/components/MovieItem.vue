<template>
  <div>{{ movie.imdbID }}</div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      // 참조형 데이터는 가변할 수 있기때문에 기본값을 함수로 지정
      default: () => ({})
    }
  }
}
</script>