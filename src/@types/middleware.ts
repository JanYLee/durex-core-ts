import type { Dispatch, Middleware, MiddlewareAPI } from 'redux'

type Warning = () => never

interface Store {
  dispatch: Dispatch | Warning
  getState: any
}

export {
  Store,
  Dispatch,
  Middleware,
  MiddlewareAPI,
  Warning
}
