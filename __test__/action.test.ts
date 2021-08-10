import { createStore } from 'redux';
beforeEach(() => {
  jest.resetModules()
})

// use jest fake timers
jest.useFakeTimers()

describe('global actions', () => {
  it('actions should be an empty object', () => {
    const durexModel = require('../src/index')

    expect(durexModel.actions).toEqual({})
  })

  it('mirror.model should add action', () => {
    const durexModel = require('../src/index')
    durexModel.model({
      name: 'app1',
      state: {
        count: 0
      },
      reducers: {
        add(state, data) {
          return { ...state, count: state.count + data }
        }
      }
    })

    expect(durexModel.actions.app1).toBeInstanceOf(Object)
    expect(durexModel.actions.app1.add).toBeInstanceOf(Function)
    expect(durexModel.actions.app1.add.length).toBe(1)
  })

  it('throws if call actions without creating store', () => {
    const durexModel = require('../src/index')
    durexModel.model({
      name: 'app2',
      state: 0,
      reducers: {
        add(state, data) {
          return state + data
        }
      }
    })

    expect(() => {
      durexModel.actions.app2.add(1)
    }).toThrow(/You are calling "dispatch" or "getState" without applying middleware! Please create your store with middleware first/)
  })

  it('call actions should dispatch action', () => {
    const durexModel = require('../src/index')
    durexModel.model({
      name: 'app3',
      state: {
        count: 0
      },
      reducers: {
        add(state, data) {
          return state.count + data
        },
        minus(state, data) {
          return state.count - data
        }
      }
    })

    durexModel.createStore()
    durexModel.actions.app3.add(1)
    const store = durexModel.getState()
    console.log('-------------', store, store.app3)
    expect(store.app3.count).toEqual(1)

    durexModel.actions.app3.minus(1)
    expect(store.app3.count).toEqual(0)
  })

  // it('should register to global effects object', () => {
  //   // eslint-disable-next-line global-require
  //   const mirror = require('../src/index')
  //   // eslint-disable-next-line global-require
  //   const { effects } = require('../src/effects')

  //   mirror.model({
  //     name: 'app',
  //     effects: {
  //       // eslint-disable-next-line @typescript-eslint/no-empty-function
  //       async myEffect() {
  //       }
  //     }
  //   })

  //   expect(effects).toBeInstanceOf(Object)
  //   expect(Object.keys(effects)).toEqual(['app/myEffect'])
  //   expect(effects['app/myEffect']).toBeInstanceOf(Function)
  // })

  // it('should add action by specifying effects', () => {
  //   // eslint-disable-next-line global-require
  //   const mirror = require('../src/index')
  //   const { actions } = mirror

  //   mirror.model({
  //     name: 'app',
  //     reducers: {
  //       add(state, data) {
  //         return state + data
  //       }
  //     },
  //     effects: {
  //       async myEffect(data) {
  //         const res = await Promise.resolve(data)
  //         actions.app.add(res)
  //       }
  //     }
  //   })

  //   expect(actions.app.myEffect).toBeInstanceOf(Function)
  //   expect(actions.app.myEffect.length).toBe(1)
  // })

  // it('async/await style effect actions', async () => {
  //   // eslint-disable-next-line global-require
  //   const mirror = require('../src/index')
  //   const { actions } = mirror
  //   // eslint-disable-next-line global-require
  //   const { createStore } = require('../src/store')

  //   const model = mirror.model({
  //     name: 'app',
  //     initialState: 1,
  //     reducers: {
  //       add(state, data) {
  //         return state + data
  //       }
  //     },
  //     effects: {
  //       async myEffect(data, getState) {
  //         const { app } = getState()
  //         const res = await Promise.resolve(app + data)
  //         // calls the pure reducer
  //         actions.app.add(res)
  //         // could return something too
  //         // return res
  //       }
  //     }
  //   })

  //   const store = createStore([model])

  //   const res = await actions.app.myEffect(2)
  //   // myEffect returns nothing
  //   expect(res).toBe(undefined)

  //   expect(store.getState().app).toEqual(4)
  // })

  // it('callback style effect actions', () => {
  //   // eslint-disable-next-line global-require
  //   const mirror = require('../src/index')
  //   const { actions } = mirror
  //   // eslint-disable-next-line global-require
  //   const { createStore } = require('../src/store')

  //   const fn = jest.fn()

  //   const model = mirror.model({
  //     name: 'app',
  //     initialState: 0,
  //     reducers: {
  //       add(state, data) {
  //         return state + data
  //       }
  //     },
  //     effects: {
  //       myEffect() {
  //         setTimeout(() => {
  //           actions.app.add(2)
  //           fn()
  //         }, 1000)
  //       }
  //     }
  //   })

  //   const store = createStore([model])

  //   actions.app.myEffect()

  //   expect(fn).not.toBeCalled()

  //   // run the timer
  //   jest.runAllTimers()

  //   expect(fn).toBeCalled()

  //   expect(store.getState().app).toEqual(2)
  // })
})
