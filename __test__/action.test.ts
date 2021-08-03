import { actions, addActions } from '../src/actions'
import createStore from '../src/store'
import defaults from '../src/defaults'
import durex, { model } from '../src/index'

beforeEach(() => {
  jest.resetModules()
})

// use jest fake timers
jest.useFakeTimers()

describe('global actions', () => {
  it('actions should be an empty object', () => {
    expect(actions).toEqual({})
  })

  it('addActions should add action', () => {
    addActions('app', {
      add(state, data) {
        return { ...state, count: state.count + data }
      }
    })

    expect(actions.app).toBeInstanceOf(Object)
    expect(actions.app.add).toBeInstanceOf(Function)
    expect(actions.app.add.length).toBe(1)
  })

  it('mirror.model should add action', () => {
    model({
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

    expect(actions.app1).toBeInstanceOf(Object)
    expect(actions.app1.add).toBeInstanceOf(Function)
    expect(actions.app1.add.length).toBe(1)
  })

  it('throws if call actions without creating store', () => {
    // eslint-disable-next-line global-require
    model({
      name: 'app2',
      state: 0,
      reducers: {
        add(state, data) {
          return state + data
        }
      }
    })

    expect(() => {
      actions.app2.add(1)
    }).toThrow(/You are calling "dispatch" or "getState" without applying middleware! Please create your store with middleware first/)
  })

  it('call actions should dispatch action', () => {
    model({
      name: 'app3',
      state: 0
    })

    defaults({
      reducers: {
        app3: {
          add(state, data) {
            return state + data
          },
          minus(state, data: any) {
            return state - (data as number)
          }
        }
      }
    })

    const store = createStore()
    console.dir('-------')
    console.dir(store, actions)
    actions.app3.add(1)
    expect(store.getState().app3).toEqual(1)

    actions.app3.minus(1)
    expect(store.getState().app3).toEqual(0)
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
