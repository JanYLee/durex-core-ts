// Test for global exported store object
import createStore, { store as _store } from '../src/store'

beforeEach(() => {
  jest.resetModules()
})

describe('create store', () => {
  it('should create a redux store', () => {
    const mirror = require('../src/index')

    const model = mirror.model({
      name: 'app',
      state: {
        count: 0
      },
      reducers: {
        add(state, data) {
          return { ...state, count: state.count + data }
        }
      }
    })

    const store = createStore()

    expect(store).toBeDefined()
    expect(store.getState).toBeInstanceOf(Function)
    expect(store.getState().app).toEqual({ count: 0 })
  })

  it('exported store should be the created store', () => {
    const mirror = require('../src/index')

    const model = mirror.model({
      name: 'app',
      reducers: {
        id(state) {
          return state
        }
      }
    })

    const store = createStore()

    expect(_store).toBe(store)
  })

  it('initialState should be null if not specified', () => {
    const mirror = require('../src/index')

    const model = mirror.model({
      name: 'app',
      reducers: {
        id(state) {
          return state
        }
      }
    })

    const store = createStore()

    expect(store.getState().app).toEqual(null)
  })

  it('should update redux store by raw dispatch', () => {
    const mirror = require('../src/index')

    const model = mirror.model({
      name: 'app',
      initialState: {
        count: 0
      },
      reducers: {
        add(state, data) {
          return { ...state, count: state.count + data }
        }
      }
    })

    const store = createStore()

    store.dispatch({
      type: 'app/add',
      data: 1
    })

    expect(store.getState().app).toEqual({ count: 1 })
  })
})
