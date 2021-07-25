import type { Dispatch } from 'redux'

export type Subscriber = (
  action?: Dispatch extends Dispatch<infer A> ? A : never,
  getState?: Function
) => void

export type Hook = (subscriber: Subscriber) => () => void
