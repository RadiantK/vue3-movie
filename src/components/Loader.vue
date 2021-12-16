<template>
  <!-- 개발자도구로 spinner를 분석해보면 2rem의 크기를 갖음 
  size의 기본값이 2이므로 rem값을 보간으로 지정-->
  <div 
    :style="{
      width: `${size}rem`,
      height: `${size}rem`,
      zIndex // vue.js는 카멜케이스를 데시케이스로 자동변환 'z-index': zIndex
    }"
    :class="{
      absolute, fixed// absolute: absolute, fixed: fixed
    }"
    class="spinner-border text-primary">
  </div>
</template>

<script>
export default {
  props: {
    // 크기 : 숫자가 클수록 커짐
    size: {
      type: Number,
      default: 2
    },
    // 부모요소 기준의 가운데 배치
    absolute: {
      type: Boolean,
      default: false
    },
    // 뷰포트 기준의 가운데 배치
    fixed: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.spinner-border {
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &.absolute {
    position: absolute;
  }
  &.fixed {
    position: fixed;
  }
}
</style>