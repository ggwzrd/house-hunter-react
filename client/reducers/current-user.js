import AUTHENTICATE_USER from '../actions/authenticate-user'
import DESTROY_SESSION_USER from '../actions/destroy-session-user'
import USER_AUTHENTICATED from '../actions/user-authenticated'

export default (state = Object.assign({}, JSON.parse(localStorage.getItem('mg.currentUser')), { authStatus: 'logged_in' }) || { authStatus: 'logged_out' }, { type, payload } = {}) => {

  switch (type) {
    case 'AUTHENTICATE_USER':
      localStorage.setItem('mg.currentUser', JSON.stringify(payload))
      return payload

    case 'DESTROY_SESSION_USER':
      localStorage.removeItem('mg.currentUser')
      return {}

    case 'UPDATE_AUTH_STATUS':
      localStorage.setItem('mg.currentUser', JSON.stringify(Object.assign({}, state, payload)))
      return Object.assign({}, state, payload)

    case 'USER_AUTHENTICATED':
      return payload

    default: return state

  }
}
