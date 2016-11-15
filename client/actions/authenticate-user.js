import api from '../middleware/api'
import appLoading from './loading'
import userAuthenticated from './user-authenticated'
import registerUser from './register-user'
import destroySessionUser from './destroy-session-user'

export const AUTHENTICATE_USER = 'AUTHENTICATE_USER'

const authenticateUser = (user) => {
  return {
    type: AUTHENTICATE_USER,
    payload: user
  }
}

export default (user) => {
  return dispatch => {
    // We're loading (communicating with the API asynchronously)
    dispatch(appLoading(true))
    // Here's the new user data, create a User with it
    api.service('users').find(user)
    .then((response) => {
      // response.data has the currentUser...
      if(response.total <= 0){ dispatch(registerUser(user)) }
      dispatch(authenticateUser(response.data[0]))
      dispatch(userAuthenticated(response.data[0]))
      dispatch(appLoading(false))
    })
    .catch((error) => {
      console.error('Wrong data format: ', error);
      dispatch(appLoading(false))
    })
  }
}
