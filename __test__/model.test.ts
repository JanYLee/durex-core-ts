beforeEach(() => {
  jest.resetModules()
})

describe('durexModel.model', () => {
  it('throws if model and model name is invalid', () => {
    const durexModel = require('../src/index')
    const errorReg = /Model name must be a valid string/

    expect(() => {
      durexModel.model()
    }).toThrow(errorReg)

    expect(() => {
      durexModel.model({
        name: 1
      })
    }).toThrow(errorReg)

    expect(() => {
      durexModel.model({
        name: 'app'
      })
    }).not.toThrow()
  })

  it('throws if model name is duplicated', () => {
    const durexModel = require('../src/index')

    durexModel.model({
      name: 'app'
    })

    expect(() => {
      durexModel.model({
        name: 'app'
      })
    }).toThrow(/please select another name/)
  })

  it('models should be an array', () => {
    const durexModel = require('../src/index')
    const { models } = require('../src/model')

    expect(models).toBeInstanceOf(Array)

    const model1 = durexModel.model({
      name: 'model1'
    })

    expect(models).toEqual([model1])

    const model2 = durexModel.model({
      name: 'model2'
    })

    expect(models).toEqual([model1, model2])
  })

  it('throws if reducers is invalid', () => {
    const durexModel = require('../src/index')
    const errorReg = /Model reducers must be a valid object/

    expect(() => {
      durexModel.model({
        name: 'app',
        reducers: false
      })
    }).toThrow(errorReg)

    expect(() => {
      durexModel.model({
        name: 'app',
        reducers: []
      })
    }).toThrow(errorReg)

    expect(() => {
      durexModel.model({
        name: 'app',
        reducers: () => {}
      })
    }).toThrow(errorReg)

    expect(() => {
      durexModel.model({
        name: 'app',
        reducers: {}
      }).not.toThrow()
    })
  })

  it('throws if effects is invalid', () => {
    const durexModel = require('../src/index')
    const errorReg = /Model effects must be a valid object/

    expect(() => {
      durexModel.model({
        name: 'app',
        effects: false
      })
    }).toThrow(errorReg)

    expect(() => {
      durexModel.model({
        name: 'app',
        effects: []
      })
    }).toThrow(errorReg)

    expect(() => {
      durexModel.model({
        name: 'app',
        effects: () => {}
      })
    }).toThrow(errorReg)

    expect(() => {
      durexModel.model({
        name: 'app',
        reducers: {}
      }).not.toThrow()
    })
  })

  it('throws if effect name is duplicated with action name', () => {
    const durexModel = require('../src/index')

    expect(() => {
      durexModel.model({
        name: 'app',
        reducers: {
          add(state, data) {
            return state + data
          }
        },
        effects: {
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          async add() {}
        }
      })
    }).toThrow(/Please select another name as effect name/)
  })
})
