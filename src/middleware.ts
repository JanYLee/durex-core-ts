import type {
  Store,
  Dispatch,
  Middleware,
  MiddlewareAPI,
  Warning
} from './@types/middleware'

import { effects } from './effects'
import { hooks } from './hook'

const warning: Warning = () => {
  throw new Error(
    'You are calling "dispatch" or "getState" without applying middleware! '
      + 'Please create your store with middleware first!'
  )
}
// eslint-disable-next-line import/no-mutable-exports
let dispatch: any = warning

// eslint-disable-next-line import/no-mutable-exports
let getState: any = warning

export {
  dispatch,
  getState
}

export const store: Store = {
  dispatch,
  getState
}

// 只在 store.js 中被使用
export default function createMiddleware(): Middleware {
  return (middlewareAPI: MiddlewareAPI) => {
    // eslint-disable-next-line no-multi-assign
    store.dispatch = dispatch = middlewareAPI.dispatch
    // eslint-disable-next-line no-multi-assign
    store.getState = getState = middlewareAPI.getState

    return (next: Dispatch) => (action) => {
      let effectResult
      // 异步的话这里其实只是为了最终能到 reducer，日志中能看到 dispatch，并无实际作用
      const result = next(action)

      // 处理 effects
      if (typeof effects[action.type] === 'function') {
        effectResult = effects[action.type](action.data, getState)
      }

      hooks.forEach((hook) => hook(action, getState))

      return effectResult || result
    }
  }
}
