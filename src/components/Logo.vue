<template>
  <RouterLink
    to="/"
    class="logo">
    <span>OMDbAPI</span>.COM
  </RouterLink>
</template>

<style lang="scss" scoped>

.logo {
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  // bootstrap에서 제공하는 black 색상 사용
  color: $black;
  text-decoration: none;
  &:hover {
    color: $black;
  }
  span {
    color: $primary;
  }
}
</style>