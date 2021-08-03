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
      initialState: 0,
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

    durexModel.hook(fn)

    expect(fn).not.toBeCalled()

    actions.app.add(1)

    expect(fn).toBeCalled()
  })

  it('call function returned by hook should remove hook', () => {
    const durexModel = require('../src/index')
    const { actions } = durexModel

    const log: string[] = []
    let state

    durexModel.model({
      name: 'app',
      initialState: 0,
      reducers: {
        add(_state, data) {
          return _state + data
        }
      },
      effects: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        async myEffect() {}
      }
    })

    const unhook = durexModel.hook((action, getState) => {
      if (action.type === 'app/add') {
        log.push('add')
      }
      if (action.type === 'app/myEffect') {
        log.push('myEffect')
      }
      state = getState().app
    })

    actions.app.add(2)
    actions.app.myEffect()

    expect(log).toEqual(['add', 'myEffect'])
    expect(state).toEqual(2)

    // remove hook
    unhook()

    actions.app.add(10)
    actions.app.myEffect()

    expect(log).toEqual(['add', 'myEffect'])
    expect(state).toEqual(2)
  })
})
