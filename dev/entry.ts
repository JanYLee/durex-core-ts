import {
  model,
  actions,
  hook,
  defaults,
  options,
  addMiddleware,
  addReducer,
  getState,
  createStore
} from '../src'

model({
  name: 'demo',
  state: {
    count: 1
  },
  reducers: {
    increase() {
      return this.setField({
        count: (prev) => prev + 1
      })
    }
  }
})

const store = createStore()

actions.demo.increase()

console.log(store.getState())
