import {
  FETCH_TODOS,
  DELETE_TODO,
  ADD_TODO,
  UPDATE_TODO
} from '../actions/types'

const initialState = {
  todos: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        todos: action.payload
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload)
      }
    case ADD_TODO:
      return {
        ...state,
        todos: [...state, action.payload]
      }
    case UPDATE_TODO:
      return {
        ...state
      }
    default:
      return {
        ...state
      }
  }
}
