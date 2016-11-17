import api from '../middleware/api'
import appLoading from './loading'
import destroySessionUser from './destroy-session-user'

export const UPDATE_FACEBOOK_USER = 'UPDATE_USER'

const updateFacebookUser = (user) => {
  return {
    type: UPDATE_FACEBOOK_USER,
    payload: user
  }
}

export default (user, properties = {}) => {
  return dispatch => {
    // We're loading (communicating with the API asynchronously)
    // Here's the new user data, create a User with it
    api.service('users').update(user, properties)
    .then((response) => {

      // response.data has the currentUser..
      dispatch(updateFacebookUser(response))
    })
    .catch((error) => {
      console.error('Wrong data format: ', error);
    })
  }
}
