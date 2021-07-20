import { setIn } from '@gem-mine/immutable'
import { Reducer, ReducersMapObject } from 'redux'

import { store } from './middleware'
import { options } from './defaults'
import { each } from './utils'
import { Actions, ActionCreator } from './@types/actions'

const SEP = '/'

// 存放所有的 action，此 action 非 redux action 存放结构如下： {namespace: {actionName:
// actionCreator}}
export const actions: Actions = {}

/**
 * action 生成器
 * 返回一个 function(data) {}，执行该函数将 dispatch action
 * @param {String} modelName 命名空间，是 model 的 name 字段
 * @param {String} actionName action name，是 model 中 reduces 或者 effects 的 key
 */
const actionCreator = (modelName: string, actionName: string) => (data: any) => store.dispatch({ type: `${modelName}${SEP}${actionName}`, data })

export function addActions(modelName: string, reducers = {}, effects = {}) {
  // 在 actions 中挂载命名空间
  if (Object.keys(reducers).length || Object.keys(effects).length) {
    actions[modelName] = actions[modelName] || {}
  }

  // 把 reducers 挂到 actions 中对应的命名空间里
  each(reducers, (actionName) => {
    // A single-argument function, whose argument is the payload data of a normal
    // redux action, and also the `data` param of corresponding method defined in
    // model.reducers.
    actions[modelName][actionName] = actionCreator(modelName, actionName)
  })

  // 把 effects 也挂载到 actions 中对应的命名空间里
  const scope = {
    actions: actions[modelName],
    setField: (data) => scope.actions.setField(data),
    getState: () => store.getState()[modelName]
  }

  each(effects, (effectName) => {
    if (actions[modelName][effectName]) {
      throw new Error(`Action name "${effectName}" has been used! Please select another name as effect name!`)
    }

    // 放入 全局的 effects 缓存 dispatch(action) 时过中间件，会检查 全局 effects 中是否存在，如果存在，则执行
    options.addEffect(`${modelName}${SEP}${effectName}`, effects[effectName].bind(scope))

    // Effect is like normal action, except it is handled by durex middleware
    actions[modelName][effectName] = actionCreator(modelName, effectName)
  })
}

/**
 * 把某个 model 的 reducers 汇集成一个 object 输出
 * object 格式为：
 *    key: ${modelName}${SEP}${reducer的key}
 *    value: 对应的 reducer 的 value，是个 function(){}
 * @param {String} modelName
 * @param {Object<String, function>} reducers
 */
export function resolveReducers(modelName, reducers = {}) {
  return Object.keys(reducers).reduce((acc, cur) => {
    acc[`${modelName}${SEP}${cur}`] = function reducer(state, data) {
      return reducers[cur].bind({
        setField: (d) => setIn(state, d),
        getState: () => state
      })(data, store.getState)
    }

    return acc
  }, {})
}
