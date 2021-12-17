import { asyncFn } from './example'

// done매개변수 : 비동기 테스트가 언제 종료되는지 명시해주는 용도
describe('비동기 테스트', () => {
  test('async/await', async () => {
    const res = await asyncFn()
    expect(res).toBe('Done!')
  }, 7000)
})