import type { ReducersMapObject } from 'redux'

type AddEffect = (_effects: ReducersMapObject) => (name: string, handler: any) => void

export { ReducersMapObject, AddEffect }
