import type { ReducersMapObject } from 'redux'
import type { AddEffect } from './@types/effects'

// Registry of namespaced effects
export const effects: ReducersMapObject = {}

export const addEffect: AddEffect = (_effects: ReducersMapObject) => (name, handler) => {
  _effects[name] = handler
}
