const { combineReducers, createStore, applyMiddleware  } = require('../index')

const info = require('./reducer-info')
const app = require('./reducer-app')
const reducer = combineReducers({ info, app })

const { loggerMiddleware, timeMiddleware } = require('./middlewares')

const store = createStore(reducer, applyMiddleware(timeMiddleware, loggerMiddleware))

store.subscribe(() => {
  const state = store.getState()
  console.log(state)
})

store.dispatch({ type: 'PREV' })

store.dispatch({ type: 'IDOL' })