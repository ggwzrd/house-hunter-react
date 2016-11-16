export const UPDATE_AUTH_STATUS = 'UPDATE_AUTH_STATUS'

export default (status = {}) => {
  return {
    type: UPDATE_AUTH_STATUS,
    payload: status
  }
}
