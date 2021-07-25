import type { ReducersMapObject } from 'redux'

export type AddEffect = (_effects: ReducersMapObject) => (name: string, handler: any) => void
