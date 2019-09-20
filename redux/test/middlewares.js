const loggerMiddleware = store => next => action => {
  console.log('this state', store.getState())
  console.log('action', action)
  next(action)
  console.log('next state', store.getState())
}

const timeMiddleware = store => next => action => { 
  console.log('now time', new Date().toLocaleString())
  next(action)
}

module.exports = {
  loggerMiddleware,
  timeMiddleware,
}