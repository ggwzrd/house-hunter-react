'use strict';

const service = require('feathers-mongoose');
const favourite = require('./favourite-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: favourite,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/favourites', service(options));

  // Get our initialize service to that we can bind hooks
  const favouriteService = app.service('/favourites');

  // Set up our before hooks
  favouriteService.before(hooks.before);

  // Set up our after hooks
  favouriteService.after(hooks.after);
};
