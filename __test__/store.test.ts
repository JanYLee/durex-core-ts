// Test for global exported store object
import { store as _store } from '../src/store'

beforeEach(() => {
  jest.resetModules()
})

describe('create store', () => {
  it('should create a redux store', () => {
    const durexModel = require('../src/index')

    durexModel.model({
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

    durexModel.createStore()

    const store = durexModel.getState()

    expect(store.app).toEqual({ count: 0 })
  })

  it('initialState should be null if not specified', () => {
    const durexModel = require('../src/index')

    durexModel.model({
      name: 'app',
      reducers: {
        id(state) {
          return state
        }
      }
    })

    durexModel.createStore()

    const store = durexModel.getState()

    expect(store.app).toEqual(null)
  })
})
