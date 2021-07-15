const isObject = (target: any): boolean => Object.prototype.toString.call(target) === '[object Object]'

export default isObject
