import axios from "axios"
// 첫글자만 대문자로 바꿔주는 기능
import _upperFirst from 'lodash/upperFirst'
// 글자들을 전부 소문자로 만들어주는 기능
import _toLower from 'lodash/toLower'

// 모의 데이터
export async function fetchMovieTitle() {
  const res = await axios.get('https://omdbapi.com?apikey=7035c60c&i=tt4520988')
  // Frozen II => Forzen ii
  return _upperFirst(_toLower(res.data.Title))
}