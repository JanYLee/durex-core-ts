beforeEach(() => {
  jest.resetModules()
})

describe('durexModel.model', () => {
  it('throws if model name is invalid', () => {
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
        name: 'routing'
      })
    }).toThrow(/it is used by react-router-redux/)

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

  it('do not add actions if reducers and effects are empty', () => {
    const durexModel = require('../src/index')
    const { actions } = durexModel

    durexModel.model({
      name: 'model1'
    })

    expect(actions).toEqual({})

    durexModel.model({
      name: 'model2',
      reducers: {}
    })

    expect(actions).toEqual({})

    durexModel.model({
      name: 'model3',
      effects: {}
    })

    expect(actions).toEqual({})

    durexModel.model({
      name: 'model4',
      effects: {},
      reducers: {}
    })

    expect(actions).toEqual({})
  })

  it('throws if effect name is duplicated with action name', () => {
    const mirror = require('../src/index')

    expect(() => {
      mirror.model({
        name: 'app',
        reducers: {
          add(state, data) {
            return state + data
          }
        },
        effects: {
          async add() {}
        }
      })
    }).toThrow(/Please select another name as effect name/)
  })

  it('should ignore non-function entries in reducers and effects', () => {
    const mirror = require('../src/index')
    const { actions } = mirror

    const fn = () => {}

    mirror.model({
      name: 'model1',
      reducers: {
        a: 1
      }
    })

    expect(actions).toEqual({})

    mirror.model({
      name: 'model2',
      effects: {
        b: 'b'
      }
    })

    expect(actions).toEqual({})

    mirror.model({
      name: 'model3',
      reducers: {
        a: 1,
        add: fn
      },
      effects: {
        b: 'b',
        plus: fn
      }
    })

    expect(actions.model3).toBeInstanceOf(Object)
    expect(Object.keys(actions.model3)).toEqual(['add', 'plus'])
  })
})
