import type { ReducersMapObject, Middleware } from 'redux'

interface AddEffect {
  (effects: ReducersMapObject): any
  (name: string, handler: Function): any
}

export interface DefaultOptions {
  initialState?: {} | undefined
  historyMode?: string | undefined
  middlewares?: Middleware[]
  reducers?: any
  addEffect?: any
}

export interface Options {
  middlewares: Middleware[]
  reducers: any
  addEffect: (name: string, handler) => void
  initialState?: any
}
