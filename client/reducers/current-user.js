import AUTHENTICATE_USER from '../actions/authenticate-user'
import DESTROY_SESSION_USER from '../actions/destroy-session-user'
import USER_AUTHENTICATED from '../actions/user-authenticated'
import UPDATE_FACEBOOK_USER from '../actions/update-facebook-user'

export default (state = JSON.parse(localStorage.getItem('hh.currentUser')) || {}, { type, payload } = {}) => {

  switch (type) {
    case 'AUTHENTICATE_USER':
      localStorage.setItem('hh.currentUser', JSON.stringify(payload))
      return payload

    case 'DESTROY_SESSION_USER':
      localStorage.removeItem('hh.currentUser')
      return {}

    case 'UPDATE_FACEBOOK_USER':
      return payload

    case 'UPDATE_AUTH_STATUS':
      
      localStorage.setItem('hh.currentUser', JSON.stringify(payload))
      return Object.assign({}, state, payload)

    case 'USER_AUTHENTICATED':
      return payload

    default: return state

  }
}
