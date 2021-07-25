import type { Subscriber, Hook } from './@types/hook'

export const hooks: Subscriber[] = []

export const hook: Hook = (subscriber) => {
  if (typeof subscriber !== 'function') {
    throw new Error('Invalid hook, must be a function!')
  }

  hooks.push(subscriber)

  return () => {
    hooks.splice(hooks.indexOf(subscriber), 1)
  }
}
