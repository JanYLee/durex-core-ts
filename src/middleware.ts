import {
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

export const store: Store = {
  dispatch: warning,
  getState: warning
}

// 只在 store.js 中被使用
export default function createMiddleware(): Middleware {
  return (middlewareAPI: MiddlewareAPI) => {
    store.dispatch = middlewareAPI.dispatch
    store.getState = middlewareAPI.getState

    return (next: Dispatch) => (action) => {
      let effectResult
      // 异步的话这里其实只是为了最终能到 reducer，日志中能看到 dispatch，并无实际作用
      const result = next(action)

      // 处理 effects
      if (typeof effects[action.type] === 'function') {
        effectResult = effects[action.type](action.data, store.getState)
      }

      hooks.forEach((hook) => hook(action, store.getState))

      return effectResult || result
    }
  }
}
