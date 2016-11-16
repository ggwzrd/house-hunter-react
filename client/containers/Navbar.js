// dependencies
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// components
import FacebookAuth from '../components/FacebookAuth'
import SignIn from '../components/SignIn'

// actions
import appLoading from '../actions/loading'
import changePage from '../actions/change-page'
import './Navbar.sass'

// COSTANTS

const PAGES = [{name: 'home', selected: true}, {name: 'offers', selected: false}, {name: 'requests', selected: false}]

class Navbar extends Component {
  
  selected(page){
    const { changePage, appLoading } = this.props
    appLoading(true)
    changePage(page)
    setTimeout(() => appLoading(false) , 1000);

  }

  renderPageTabs(page, index){
    const { changePage, currentPage } = this.props
    return (
      <div key={ index }>
        <a href="#" onClick={ this.selected.bind(this, { name: page.name, selected: true }) }>
          <li className={ currentPage.name === page.name ? 'selected' : null } >{ page.name.toUpperCase() }</li>
        </a>
      </div>
    )
  }

  render() {
    const { currentUser } = this.props

    return(
      <div className="navbar" >
        <ul>
          { PAGES.map( this.renderPageTabs.bind(this) )}
        </ul>
        <SignIn className={ currentUser.authStatus === 'connected' ? 'hidden' : null } authStatus={ currentUser.authStatus } />
      </div>

    )
  }
}

Navbar.propTypes = {
  currentPage: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage,
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, { changePage, appLoading })(Navbar)
