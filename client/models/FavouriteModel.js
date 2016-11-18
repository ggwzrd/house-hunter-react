import BaseModel from 'feathersjs-redux-model/build/models/base-model'

class FavouriteModel extends BaseModel {
  defaults() {
    return {
      createdAt: Date.now,
      updatedAt: Date.now
    };
  }

  findParams() {
    return {
      query: {
        $sort: { createdAt: -1 },
        $limit: 10
      }
    };
  }

  constructor(dispatch, onError) {
    super('favourite', dispatch, onError);
  }
}

const favouriteModel = new FavouriteModel()

export default favouriteModel
