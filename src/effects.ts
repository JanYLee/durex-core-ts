import type { ReducersMapObject, AddEffect } from './@types/effects'

// Registry of namespaced effects
export const effects: ReducersMapObject = {}

// function addEffect(eff: ReducersMapObject)
// function addEffect(name: any, handler: Function)
// function addEffect(arg1: ReducersMapObject | any, arg2?: Function) {
// }

export const addEffect: AddEffect = (_effects: ReducersMapObject) => (name, handler) => {
  _effects[name] = handler
}
