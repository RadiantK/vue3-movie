// 영화의 검색요청을 처리해줄 수 있는 서버리스 함수

// axios라는 패키지를 가져옴, node.js 에서만 동작 (require 사용)
const axios = require('axios')
// const OMDB_API_KEY = process.env.OMDB_API_KEY // 객체구조분해
const { OMDB_API_KEY }= process.env

exports.handler = async function (event) {
  console.log(event)
  const payload = JSON.parse(event.body)
  const { title, type, year, page, id } = payload;
  // 삼항연산자로 id라는 속성에 데이터가 있으면 단일영화정보의 상세내용을
  // 없으면 다수의 영화정보를 가져옴
  const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  // 영화 에러발생 확인해본 코드 내용
  // const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`
  
  try {
    const { data } = await axios.get(url)
    if (data.Error) {
      return {
        // 잘못된 요청처리에 대한 에러코드
        statusCode: 400,
        // body에는 문자데이터를 반환해줘야함(객체, 배열 x)
        body: data.Error
      }
    }
    // 정상적인 응답에 대한 처리
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch(error) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }
}