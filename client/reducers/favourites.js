
export default function updateGames(state = [], { type, payload } = {}) {
  switch (type) {
    case 'FAVOURITE_FETCHED' :
      return [].concat(payload)

    case 'FAVOURITE_CREATED' :
      return [payload].concat(state)

    default :
      return state
  }
}
