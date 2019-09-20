const initialState = {
  count: 0
}

function app(state = initialState, action) {
  switch (action.type) {
    case 'PREV':
      return {
        ...state,
        count: state.count - 1,
      }
    case 'NEXT':
      return {
        ...state,
        count: state.count + 1,
      }
    default:
      return state
  }
}

module.exports = app