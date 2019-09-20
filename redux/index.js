const createStore = require('./createStore')
const applyMiddleware = require('./applyMiddleware')
const combineReducers = require('./combineReducers')
const bindActionCreators = require('./bindActionCreators')
const compose = require('./compose')

module.exports = {
  createStore,
  applyMiddleware,
  combineReducers,
  bindActionCreators,
  compose,
}