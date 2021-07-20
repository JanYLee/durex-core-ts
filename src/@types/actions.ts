import type { Dispatch } from 'redux'

export interface Actions {
  [modelName: string]: {
    [name: string]: (data?: any) => void
  }
}

export type ActionCreator = (modelName: string, actionName: string) =>
(data: any) => Dispatch
