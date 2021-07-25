import { addEffect, effects } from '../src/effects'

const getNumber = () => new Promise((resolve) => {
  resolve(2021)
})

test('测试 addEffect 方法', () => {
  const handler = async () => {
    const number = await getNumber()
    console.log(number)
  }
  addEffect(effects)('GET', handler)
  expect(effects.GET).toEqual(handler)
})
