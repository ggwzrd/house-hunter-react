import model from '../models/FavouritesModel'
import { history } from '../store'

import appLoading from './loading'

export const FAVOURITE_CREATED = 'FAVOURITE_CREATED'

export default (properties) => {
  return dispatch => {
    model.dispatch = dispatch
    model.create(properties)
    dispatch(favouriteCreated(properties))
  }
}


export function favouriteCreated(favourite) {
  return {
    type: FAVOURITE_CREATED,
    payload: favourite
  }
}
