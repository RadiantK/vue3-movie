// 개발자 정보, 사용자 정보를 취급하는 용도

export default {
  // 하나의 모듈이 될 수 있도록 함
  namespaced: true,
  // 하나의 상태(데이터)
  // 객체데이터는 배열데이터와 동일하게 하나의 참조형데이터
  // 데이터의 불변성을 유지하기 위해서 함수로 정의
  state: () => {
    return {
      name: "RadiantK",
      github: 'https://github.com/RadiantK',
      phone: '+82-10-1234-5678',
      image: 'https://i1.daumcdn.net/thumb/C100x100/?scode=mtistory2&fname=https%3A%2F%2Ftistory1.daumcdn.net%2Ftistory%2Fuser%2F5149277%2Fprofile%2FprofileImg%3Fv%3D1639660625719'
    }
  }
}