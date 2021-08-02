import {
  createStore as _createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux'
import type {
  StoreEnhancer,
  Reducer,
  ReducersMapObject,
  Store
} from 'redux'
import { options } from './defaults'
import { models } from './model'
import createMiddleware from './middleware'

import { DurexModel } from './@types/model'

// eslint-disable-next-line import/no-mutable-exports
let store: Store

export default function createStore(): Store {
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
  const enhancer = composeEnhancers(...enhancers) as StoreEnhancer<any, {}>

  store = _createStore(reducer, initialState, enhancer)
  return store
}

export { store }

function createReducer(ms: DurexModel[], reducers: ReducersMapObject): Reducer {
  const modelReducers: ReducersMapObject = ms.reduce((acc, cur) => {
    acc[cur.name] = cur.reducer
    return acc
  }, {})

  return combineReducers({
    ...reducers,
    ...modelReducers,
  })
}
