import axios from 'axios'

import {
  FETCH_TODOS,
  ADD_TODO,
  DELETE_TODO,
  GET_ERRORS,
  UPDATE_TODO
} from '../actions/types'

export const fetchTodos = () => dispatch => {
  axios
    .get('/api/todos', {
      headers: {
        Authorization: localStorage.getItem('jwtToken')
      }
    })
    .then(res => {
      dispatch({
        type: FETCH_TODOS,
        payload: res.data
      })
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

export const deleteTodo = id => dispatch => {
  axios
    .delete('/api/todos/' + id, {
      headers: {
        Authorization: localStorage.getItem('jwtToken')
      }
    })
    .then(res => {
      dispatch({
        type: DELETE_TODO,
        payload: id
      })
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

export const addTodo = todo => dispatch => {
  axios
    .post('/api/todos', todo, {
      headers: {
        Authorization: localStorage.getItem('jwtToken'),
        ContentType: 'application/json'
      }
    })
    .then(res => {
      dispatch({
        type: ADD_TODO,
        payload: todo
      })
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }))
}

export const updatePriority = (priority, id) => dispatch => {
  axios
    .put(
      '/api/todos/' + id,
      { priority: priority },
      {
        headers: {
          Authorization: localStorage.getItem('jwtToken'),
          ContentType: 'application/json'
        }
      }
    )
    .then(res => {
      dispatch({
        type: UPDATE_TODO
      })
    })
}
