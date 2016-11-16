import FETCH_GROUPS_FEED from '../actions/fetch-groups-feed'
// import FILTER_POSTS from '../actions/filter-posts'

export default (state = { all: [] }, { type, payload } = {}) => {

  switch (type) {
    case 'FETCH_GROUPS_FEED':
      return { all: state.all.concat(payload) }

    case 'FILTER_POSTS':
      return Object.assign({}, state, payload)

    default: return state

  }
}
