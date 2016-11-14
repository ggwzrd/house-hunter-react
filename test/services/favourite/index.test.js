'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('favourite service', function() {
  it('registered the favourites service', () => {
    assert.ok(app.service('favourites'));
  });
});
