import {
  createStore as _createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux'
import type { StoreEnhancer } from 'redux'
import { options } from './defaults'
import { models } from './model'
import createMiddleware from './middleware'

let store

export default function createStore() {
  const { initialState, middlewares, reducers } = options

  const middleware = applyMiddleware(...middlewares, createMiddleware())
  const enhancers = [middleware]
  let composeEnhancers = compose

  if (process.env.NODE_ENV !== 'production') {
    // Redux devtools extension support.
    if (global?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  const reducer = createReducer(models, reducers)
  const enhancer = composeEnhancers(...enhancers)

  store = _createStore(reducer, initialState, enhancer as StoreEnhancer<any, {}>)
  return store
}

function createReducer(ms, reducers) {
  const modelReducers = ms.reduce((acc, cur) => {
    acc[cur.name] = cur.reducer
    return acc
  }, {})

  return combineReducers({
    ...reducers,
    ...modelReducers,
  })
}
