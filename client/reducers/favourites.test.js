import chai, { expect } from 'chai'
import deepFreeze from 'deep-freeze-node'
import favourites from './favourites'

describe('favourites', () => {
  describe('initial state', () => {
    const initialState = favourites()
    it('is an empty array', () => {
      expect(initialState).to.eql([])
    })
  })
})
