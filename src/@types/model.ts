import type { Reducer, ReducersMapObject } from 'redux'

export interface ModelReducers {
  [k: string]: (data?: any, getState?: any) => any;
}
export interface Model {
  name: string
  state?: any
  reducers?: ModelReducers
  effects?: ReducersMapObject
}

export interface DurexModel {
  name: string;
  reducer: Reducer;
}
