import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  fetchTodos,
  deleteTodo,
  addTodo,
  updatePriority
} from '../../actions/todoActions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTodos())
  }

  componentDidUpdate(prevProps, nextProps) {
    this.props.dispatch(fetchTodos())
  }

  handleClick = id => {
    this.props.dispatch(deleteTodo(id))
  }

  resolveClassName(priority) {
    let classNames = ['badge', 'white-text']
    if (priority === 'high') {
      classNames.push('red')
      classNames.push('darken-2')
    } else if (priority === 'medium') {
      classNames.push('orange')
      classNames.push('darken-2')
    } else if (priority === 'low') {
      classNames.push('green')
    } else {
      classNames.push('blue')
    }

    return classNames.join(' ')
  }

  state = {
    name: '',
    priority: '',
    showForm: false
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.dispatch(addTodo(this.state))
    this.setState({ name: '', priority: '' })
    this.toggleForm()
  }

  increasePriority(priority, id) {
    if (priority === 'high') {
      toast.error('Already at highest priority', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    } else {
      let priorities = ['lowest', 'low', 'medium', 'high']
      let index = priorities.indexOf(priority)
      index++
      this.props.dispatch(updatePriority(priorities[index], id))
    }
  }

  decreasePriority(priority, id) {
    if (priority === 'lowest') {
      toast.error('Already at lowest priority', {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    } else {
      let priorities = ['lowest', 'low', 'medium', 'high']
      let index = priorities.indexOf(priority)
      index--
      this.props.dispatch(updatePriority(priorities[index], id))
    }
  }

  toggleForm() {
    const current = this.state.showForm
    this.setState({
      showForm: !current
    })
  }

  render() {
    let addTodo = (
      <div>
        <h4 className='center'>Create a new TODO</h4>
        <form className='row'>
          <div className='input-field col s8 offset-s2'>
            <input
              type='text'
              id='name'
              onChange={this.handleChange}
              value={this.state.name}
            />
            <label htmlFor='name'>TODO</label>
          </div>
          <div className='input-field col s8 offset-s2'>
            <select
              id='priority'
              className='browser-default'
              onChange={this.handleChange}
            >
              <option value=''>Choose a priority</option>
              <option value='high'>High</option>
              <option value='medium'>Medium</option>
              <option value='low'>Low</option>
              <option value='lowest'>Lowest</option>
            </select>
            <label htmlFor='priority' />
          </div>
          <div
            className='col s12 center'
            style={{ marginTop: '2rem', marginBottom: '0px' }}
          >
            <button
              style={{
                width: '150px',
                borderRadius: '3px',
                letterSpacing: '1.5px'
              }}
              onClick={this.handleSubmit}
              className='btn btn-large waves-effect hoverable blue accent-3 modal-close'
            >
              Create
            </button>
          </div>
        </form>
      </div>
    )

    let todoList = this.props.todos.todos.map(todo => {
      return (
        <div className='row' key={todo._id} style={{ padding: '15px 10px' }}>
          <div className='col s6'>
            <strong>{todo.name}</strong>
          </div>
          <div className='col s3'>
            <span className={this.resolveClassName(todo.priority)}>
              <span style={{ textTransform: 'capitalize' }}>
                {todo.priority}
              </span>
            </span>
          </div>
          <div className='col s3'>
            <span
              className='tooltipped'
              data-position='top'
              data-tooltip='Delete TODO'
              onClick={() => this.handleClick(todo._id)}
              style={{ cursor: 'pointer' }}
            >
              <i className='material-icons red-text'>delete</i>
            </span>
            <span
              href='/'
              className='tooltipped'
              data-position='top'
              data-tooltip='Increase Priority'
              onClick={() => this.increasePriority(todo.priority, todo._id)}
              style={{ cursor: 'pointer' }}
            >
              <i className='material-icons orange-text'>arrow_upward</i>
            </span>
            <span
              href='/'
              className='tooltipped'
              data-position='top'
              data-tooltip='Decrease Priority'
              onClick={() => this.decreasePriority(todo.priority, todo._id)}
              style={{ cursor: 'pointer' }}
            >
              <i className='material-icons green-text'>arrow_downward</i>
            </span>
          </div>
        </div>
      )
    })

    return (
      <div className='container main' style={{ marginTop: '4rem' }}>
        <ToastContainer />
        <div className='row'>
          <div className='col s12'>
            <div className='card grey lighten-5'>
              <div className='card-content'>
                <span className='card-title center black-text'>
                  List of TODO'S
                </span>
                <hr />
                {todoList}
                <button
                  className='btn-floating halfway-fab waves-effect waves-light red tooltipped pulse'
                  data-position='top'
                  data-tooltip='Add new todo'
                  onClick={this.toggleForm.bind(this)}
                >
                  <i className='material-icons'>add</i>
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.state.showForm ? addTodo : null}
      </div>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  todos: state.todos
})
export default connect(
  mapStateToProps,
  null
)(Dashboard)
