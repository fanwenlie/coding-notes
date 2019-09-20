const initialState = {
  hi: 'How are you?'
}

function info(state = initialState, action) {
  switch (action.type) {
    case 'PROGRAMMER':
      return {
        ...state,
        hi: 'Hello world',
      }
    case 'IDOL':
      return {
        ...state,
        hi: 'Im fine',
      }
    default:
      return state
  }
}

module.exports = info