import CHANGE_PAGE from '../actions/change-page'

export default (state = JSON.parse(localStorage.getItem('hh.currentPage')) || { name: 'home', selected: true }, { type, payload } = {}) => {

  switch (type) {
    case 'CHANGE_PAGE':
      localStorage.setItem('hh.currentPage', JSON.stringify(payload))
      return payload

    default: return state

  }
}
