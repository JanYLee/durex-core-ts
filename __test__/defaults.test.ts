import defaults, { options } from '../src/defaults'

beforeEach(() => {
  jest.resetModules()
})

describe('durex-core.defaults', () => {
  it('options should be exported', () => {
    expect(options).toBeDefined()
  })

  it('should not throw without argument', () => {
    expect(() => {
      defaults()
    }).not.toThrow()
  })

  it('throws if middlewares is not array', () => {
    expect(() => {
      defaults({
        middlewares: (() => { }) as unknown as []
      })
    }).toThrow(/invalid/)

    expect(() => {
      defaults({
        middlewares: []
      })
    }).not.toThrow()
  })

  it('throws if an addEffect is not a function that returns a function', () => {
    expect(() => {
      defaults({
        addEffect: () => true
      })
    }).toThrow(/invalid/)

    expect(() => {
      defaults({
        addEffect: () => () => true
      })
    }).not.toThrow()
  })
})
