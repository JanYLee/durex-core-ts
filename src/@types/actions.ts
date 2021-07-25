import type { AnyAction } from 'redux'

export interface Actions {
  [propName: string]: any
}

export type ActionCreator = (modelName: string, actionName: string) =>
(data: any) => AnyAction
