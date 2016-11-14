import CHANGE_PAGE from '../actions/change-page'

export default (state = localStorage.getItem('mg.currentPage') || { name: 'home', selected: true }, { type, payload } = {}) => {

  switch (type) {
    case 'CHANGE_PAGE':
      localStorage.setItem('mg.currentPage', payload)
      return payload

    default: return state

  }
}
