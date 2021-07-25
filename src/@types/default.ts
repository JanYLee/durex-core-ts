import type { ReducersMapObject, Middleware } from 'redux'

interface AddEffect {
  (effects: ReducersMapObject): any
  (name: string, handler: Function): any
}

export interface DefaultOptions {
  initialState?: {} | undefined
  historyMode?: string | undefined
  middlewares: Middleware[]
  reducers: ReducersMapObject
  addEffect: AddEffect
}

export interface Options {
  middlewares: Middleware[]
  reducers: ReducersMapObject
  addEffect: (name: string, handler) => void
  initialState?: any
}
