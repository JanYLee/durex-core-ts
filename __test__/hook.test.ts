beforeEach(() => {
  jest.resetModules()
})

describe('the hook method', () => {
  it('hooks should be an array', () => {
    const { hooks } = require('../src/hook')

    expect(hooks).toEqual([])
  })

  it('throws if hook is not function', () => {
    const durexModel = require('../src/index')

    expect(() => {
      durexModel.hook(1)
    }).toThrow(/must be a function/)

    expect(() => {
      durexModel.hook((noop) => noop)
    }).not.toThrow()
  })

  it('durexModel.hook should add hook', () => {
    const durexModel = require('../src/index')
    const { hooks } = require('../src/hook')

    const fn = jest.fn()

    durexModel.hook(fn)

    expect(hooks).toEqual([fn])
  })

  it('dispatch action should call hook', () => {
    const durexModel = require('../src/index')
    const { actions } = durexModel

    const fn = jest.fn()

    durexModel.model({
      name: 'app',
      state: {
        count: 0
      },
      reducers: {
        add(state, data) {
          return state + data
        }
      },
      effects: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        async myEffect() {}
      }
    })

    durexModel.createStore()

    durexModel.hook(fn)

    expect(fn).not.toBeCalled()

    actions.app.add(1)

    expect(fn).toBeCalled()
  })
})
