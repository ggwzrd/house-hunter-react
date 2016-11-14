export const CHANGE_PAGE = 'CHANGE_PAGE'

export default (page = {}) => {
  return {
    type: CHANGE_PAGE,
    payload: page
  }
}
