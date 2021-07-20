export const isObject = (target: any): boolean => Object.prototype.toString.call(target) === '[object Object]'

export const each = (
  obj: Object,
  callback: (...arg) => void
) => {
  Object.keys(obj).forEach(callback)
}
