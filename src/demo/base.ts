import { model, createStore } from '../index'

model({
  name: 'demo',
  state: {
    count: 0
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
console.log(store)
