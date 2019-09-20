function createStore(reducer, initState, rewriteCreateStoreFunc) {
  if (typeof reducer !== 'function') { throw new TypeError('reducer muse be a function') }
  if (typeof initState === 'function' && typeof rewriteCreateStoreFunc === 'undefined' ) {
    rewriteCreateStoreFunc = initState
    initState = undefined
  }

  if (rewriteCreateStoreFunc) {
    const newCreateStore = rewriteCreateStoreFunc(createStore)
    return newCreateStore(reducer, initState)
  }

  let state = initState
  let listeners = []

  function subscribe(listener) {
    listeners.push(listener)
    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  function dispatch(action) {
    state = reducer(state, action)
    for(let i = 0, len = listeners.length; i < len; i++) {
      const listener = listeners[i]
      listener()
    }
  }

  function getState() {
    return state
  }

  function replaceReducer(nextReducer) {
    reducer = nextReducer
    // 替换reducer之后刷新state值
    dispatch({ type: Symbol() })
  }
  // 用一个不匹配任何reducer action的type，来获取state初始值
  dispatch({ type: Symbol() })

  return {
    subscribe,
    dispatch,
    getState,
    replaceReducer,
  }
}

module.exports = createStore