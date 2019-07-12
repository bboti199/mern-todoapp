import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'

export class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault()
    this.props.logoutUser()
  }

  render() {
    let logoutButton = (
      <ul className='right'>
        <li>
          <Link
            onClick={this.onLogoutClick}
            className='black-text'
            to='/logout'
          >
            Logout <i className='material-icons left'>exit_to_app</i>
          </Link>
        </li>
      </ul>
    )
    return (
      <div className='navbar-fixed'>
        <nav className='z-depth-0'>
          <div className='nav-wrapper white'>
            <Link
              to='/'
              style={{ fontFamily: 'monospace' }}
              className='brand-logo center black-text'
            >
              <i className='material-icons'>code</i> MERN
            </Link>
            {this.props.auth.isAuthenticated ? logoutButton : null}
          </div>
        </nav>
      </div>
    )
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar)
