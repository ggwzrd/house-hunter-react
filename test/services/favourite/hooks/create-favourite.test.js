'use strict';

const assert = require('assert');
const createFavourite = require('../../../../src/services/favourite/hooks/create-favourite.js');

describe('favourite createFavourite hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    createFavourite()(mockHook);

    assert.ok(mockHook.createFavourite);
  });
});
