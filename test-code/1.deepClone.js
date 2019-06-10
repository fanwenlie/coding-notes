
function clone(obj) {
  if (obj == null ||typeof obj !== 'object') return obj;
  // TODO: 这个应该有缺陷，如果是个Date对象呢，是需要传参数的
  const newObj = new obj.constructor();
  for (const key in obj) {
    if (object.getOwnPropertyDescriptors(key)) {
      newObj[key] = clone(obj[key]);
      
    }
  }
  return newObj;
}