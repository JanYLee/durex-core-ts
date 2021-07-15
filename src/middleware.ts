import type { Dispatch } from 'redux'

import { effects } from './effects'
import { hooks } from './hook'

function warning(): never {
  throw new Error(
    'You are calling "dispatch" or "getState" without applying middleware! '
      + 'Please create your store with middleware first!'
  )
}

interface Store {
  dispatch: Dispatch | typeof warning
  getState: any
}

export const store: Store = {
  dispatch: warning,
  getState: warning
}

// 只在 store.js 中被使用
export default function createMiddleware() {
  return (middlewareAPI) => {
    store.dispatch = middlewareAPI.dispatch
    store.getState = middlewareAPI.getState

    return (next) => (action) => {
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
