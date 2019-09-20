const compose = require('./compose')
/**
 * @param {Array<function>} middlewares 
 * @return {Function}
 */
function applyMiddleware(...middlewares) {
  return function (oldCreateStore) {
    return function newCreateStore(reducer, initState) {
      const store = oldCreateStore(reducer, initState)

      const simpleStore = { getState: store.getState }
      const chain = middlewares.map(middleware => middleware(simpleStore))
      const dispatch = compose(...chain)(store.dispatch)
      return {
        ...store,
        dispatch,
      }
    }
  }
}

module.exports = applyMiddleware