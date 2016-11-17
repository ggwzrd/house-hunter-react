

export const FETCH_GROUPS_FEED = 'FETCH_GROUPS_FEED'

export default (feed) => {
  return dispatch => {
    dispatch(fetchGroupsFeed(feed))
  }
}

const fetchGroupsFeed = (feed) => {
  return {
    type: FETCH_GROUPS_FEED,
    payload: feed
  }
}
