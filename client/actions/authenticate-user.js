import api from '../middleware/api'
import appLoading from './loading'
import userAuthenticated from './user-authenticated'
import destroySessionUser from './destroy-session-user'

export const AUTHENTICATE_USER = 'AUTHENTICATE_USER'

const authenticateUser = (user) => {
  return {
    type: AUTHENTICATE_USER,
    payload: user
  }
}

export default () => {
  return dispatch => {
    // We're loading (communicating with the API asynchronously)
    dispatch(appLoading(true))
    // Here's the new user data, create a User with it
    api.authenticate()
    .then((response) => {
      // response.data has the currentUser..
      dispatch(authenticateUser(Object.assign({}, response.data, {token: response.token})))
      dispatch(appLoading(false))
    })
    .catch((error) => {
      console.error('Wrong data format: ', error);
      dispatch(appLoading(false))
    })
  }
}
