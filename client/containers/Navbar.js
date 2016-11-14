// dependencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// actions
import changePage from '../actions/change-page'
import './Navbar.sass'

// COSTANTS

const PAGES = [{name: 'home', selected: true}, {name: 'offers', selected: false}, {name: 'requests', selected: false}]

class Navbar extends Component {

  renderPageTabs(page, index){
    const { changePage, currentPage } = this.props
    return (
      <div key={ index }>
        <a href="#" onClick={ changePage.bind(this, { name: page.name, selected: true }) }>
          <li className={ currentPage.name === page.name ? 'selected' : null } >{ page.name.toUpperCase() }</li>
        </a>
      </div>
    )
  }

  render() {
    return(
      <div className="navbar" >
        <ul>
          { PAGES.map( this.renderPageTabs.bind(this) )}
        </ul>
      </div>

    )
  }
}

Navbar.propTypes = {
  currentPage: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapStateToProps, { changePage })(Navbar)