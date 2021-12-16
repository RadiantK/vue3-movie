export default {
  install(app) {
    app.config.globalProperties.$loadImage = (src) => {
      return new Promise((resolve) => {
        const img = document.createElement('img')
        img.src = src
        img.addEventListener('load', () => {
          // 로드 완료!
          resolve()
        })
      })
    }
  }
}

// 이 내용을 공용으로 쓸수 있게 위처럼 만듬
// init() {
// const img = document.createElement('img')
// // 영화의 포스터 정보가 삽입
// img.src = this.movie.Poster
// // function키워드로 작성하게되면 this가 imageLoading으로 접근불가
// // 화살표 함수로 해야 view파일 내에서 사용할 수 있는 여러가지 
// // 데이터, 메소드에 접근가능
// img.addEventListener('load', () => {
//   this.imageLoading = false
// })
// }