<template>
  <!-- bootstrap의 기능으로 페이지 레이아웃 기능 제공 (container 클래스)
  뷰포트의 영역이 변할수록 컨테이너의 크기가 가변할수있게 만들어짐 -->
  <div class="container">
    <h1>
      <span>OMDb API</span><br />
      THE OPEN<br />
      MOVIE DATABASE
    </h1>

    <p>
      The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.<br />
      If you find this service useful, please consider making a one-time donation or become a patron.
    </p>
  </div>
</template>

<style lang="scss" scoped>

.container {
  padding-top: 40px;
}
h1 {
  line-height: 1;
  font-family: "Oswald", sans-serif;
  color: $black;
  font-size: 80px;
  span {
    color: $primary;
  }
}
p {
  margin: 30px 0;
  color: $gray-600;
}
</style>