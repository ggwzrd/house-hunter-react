import model from '../models/FavouriteModel'

export const FAVOURITE_REMOVED = 'FAVOURITE_REMOVED'

export default (favourite) => {
  return dispatch => {
    model.dispatch = dispatch
    model.app.authenticate()
      .then((response) => {
        model.destroy(favourite)
    }).catch((error) => {
      console.log(error)
    })
  }
}


export function favouriteRemoved(favourite) {
  return {
    type: FAVOURITE_REMOVED,
    payload: favourite
  }
}
